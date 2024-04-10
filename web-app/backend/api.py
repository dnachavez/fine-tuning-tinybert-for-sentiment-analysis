# Import libraries
from flask import Flask, request, jsonify
import torch
from transformers import BertTokenizerFast, BertForSequenceClassification
import numpy as np
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load the sentiment analysis model and tokenizer
try:
    model_path = 'D:/Personal/Machine Learning/Fine-tuning TinyBERT for Sentiment Analysis'
    model = BertForSequenceClassification.from_pretrained(model_path).to('cuda' if torch.cuda.is_available() else 'cpu')
    tokenizer = BertTokenizerFast.from_pretrained(model_path)
except Exception as e:
    app.logger.error(f"Model loading failed: {str(e)}")
    raise e

def chunk_text(text, tokenizer, max_len=510):
    """
    Splits the input text into chunks of tokens using the provided tokenizer.

    Args:
        text (str): The input text to be chunked.
        tokenizer: The tokenizer object used to encode the text into tokens.
        max_len (int, optional): The maximum length of each chunk in terms of tokens. Defaults to 510.

    Returns:
        list: A list of chunks, where each chunk is a list of tokens.
    """
    tokens = tokenizer.encode(text, add_special_tokens=False)
    chunk_size = max_len
    chunks = [tokens[i:i + chunk_size] for i in range(0, len(tokens), chunk_size)]
    return chunks

def analyze_sentiment(text_chunks, model, tokenizer):
    """
    Analyzes the sentiment of text chunks using a given model and tokenizer.

    Args:
        text_chunks (list): A list of text chunks to analyze.
        model: The sentiment analysis model.
        tokenizer: The tokenizer used to preprocess the text.

    Returns:
        tuple: A tuple containing the predicted sentiment class, confidence score, and average scores.

    """
    sentiment_scores = np.zeros((len(text_chunks), 3))
    for i, chunk in enumerate(text_chunks):
        chunk_text = tokenizer.decode(chunk, skip_special_tokens=True)
        tokens = tokenizer(chunk_text, padding='max_length', truncation=True, max_length=512, return_tensors="pt")
        input_ids, attention_mask = tokens['input_ids'].to(model.device), tokens['attention_mask'].to(model.device)
        with torch.no_grad():
            outputs = model(input_ids, attention_mask=attention_mask)
            probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
            sentiment_scores[i] = probs.cpu().numpy()
    avg_scores = np.mean(sentiment_scores, axis=0)
    predicted_class = np.argmax(avg_scores)
    confidence = avg_scores[predicted_class]
    return predicted_class, confidence, avg_scores.tolist()

@app.route('/predict', methods=['POST'])
def analyze_sentiment_request():
    """
    Analyzes the sentiment of the text provided in the request.

    Returns:
        A JSON response containing the predicted sentiment class, confidence score, and probabilities.

    Raises:
        400 Bad Request: If the request is not in JSON format or does not contain the 'text' field.
        400 Bad Request: If the 'text' field is empty.
        500 Internal Server Error: If sentiment analysis fails.

    Example:
        $ curl -X POST http://localhost:5000/predict -H "Content-Type: application/json" -d '{"text": "I love this product!"}'

    Response:
        {
            "predicted_class": "Positive",
            "confidence": 0.999,
            "probabilities": [0.001, 0.001, 0.998]
        }
    """
    if not request.json or 'text' not in request.json:
        return jsonify({"error": "Request must be JSON and contain 'text' field."}), 400

    text = request.json['text']
    if not text:
        return jsonify({"error": "Text field cannot be empty."}), 400

    try:
        text_chunks = chunk_text(text, tokenizer)
        predicted_class, confidence, probabilities = analyze_sentiment(text_chunks, model, tokenizer)
        sentiment_labels = ['Negative', 'Neutral', 'Positive']
        response = {
            "predicted_class": sentiment_labels[predicted_class],
            "confidence": confidence,
            "probabilities": probabilities
        }
        return jsonify(response)
    except Exception as e:
        app.logger.error(f"Error during analysis: {str(e)}")
        return jsonify({"error": "Sentiment analysis failed.", "details": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
