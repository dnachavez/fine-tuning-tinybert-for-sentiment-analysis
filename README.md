<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="/logo.png" alt="TinyBERT Sentiment Analysis logo"></a>
</p>

<h3 align="center">Fine-tuning TinyBERT for Sentiment Analysis</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/dnachavez/fine-tuning-tinybert-for-sentiment-analysis.svg)](https://github.com/dnachavez/fine-tuning-tinybert-for-sentiment-analysis/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/dnachavez/fine-tuning-tinybert-for-sentiment-analysis.svg)](https://github.com/dnachavez/fine-tuning-tinybert-for-sentiment-analysis/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 🤖 A machine learning project for CS221: Algorithms and Complexity focused on fine-tuning the TinyBERT model for sentiment analysis tasks. It includes scripts for training the model with a custom dataset, analyzing text inputs to determine sentiment, and utilities for preprocessing data and evaluating model performance.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Demo / Working](#demo)
- [How it works](#working)
- [Usage](#usage)
- [Getting Started](#getting_started)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This repository hosts a project focused on fine-tuning the TinyBERT model for sentiment analysis tasks. It includes scripts for training the model with a custom dataset, analyzing text inputs to determine sentiment, and utilities for preprocessing data and evaluating model performance. The goal is to leverage the compact and efficient architecture of TinyBERT to achieve high-accuracy sentiment classification in a wide range of text data, from social media posts to customer reviews. Moreover, a web application component has been added to the project, enhancing its interactivity and user engagement. This web application is designed to provide an intuitive interface for performing sentiment analysis, utilizing a Flask backend for model interaction and a dynamic frontend for displaying results.

## 🎥 Demo / Working <a name = "demo"></a>

```
Enter text for sentiment analysis (or type 'exit' to stop): I love you

Sentiment: Positive
Confidence: 96.54%
Probabilities:
  Negative: 1.33%
  Neutral: 2.13%
  Positive: 96.54%

Enter text for sentiment analysis (or type 'exit' to stop): I hate you

Sentiment: Negative
Confidence: 96.94%
Probabilities:
  Negative: 96.94%
  Neutral: 2.14%
  Positive: 0.92%

Enter text for sentiment analysis (or type 'exit' to stop): I'm fine

Sentiment: Neutral
Confidence: 52.93%
Probabilities:
  Negative: 8.62%
  Neutral: 52.93%
  Positive: 38.45%

Enter text for sentiment analysis (or type 'exit' to stop): Everything's gonna be alright

Sentiment: Positive
Confidence: 72.23%
Probabilities:
  Negative: 10.12%
  Neutral: 17.66%
  Positive: 72.23%

Enter text for sentiment analysis (or type 'exit' to stop): exit
Exiting sentiment analysis.
```

## 💭 How it works <a name = "working"></a>

The sentiment analysis project operates in two main phases: training and analysis.

The training script first loads the dataset, containing text entries and their corresponding sentiment labels, from a CSV file. Each text entry undergoes preprocessing, which includes tokenization, stopword removal, and lemmatization, adapting it for the TinyBERT model. This preprocessing utilizes the BertTokenizerFast for optimal compatibility with TinyBERT's requirements.

Upon preprocessing, the dataset is split into training, validation, and test sets, maintaining a balance across sentiment labels. The TinyBERT model, a compact version of the original BERT model optimized for efficiency, is then fine-tuned on the training set. Fine-tuning involves adjusting TinyBERT's pre-trained weights to better classify sentiment based on the provided dataset, leveraging the transformers library and PyTorch for model training and optimization.

After fine-tuning, the model's performance is evaluated on the validation set to assess its accuracy, precision, recall, and F1 score. These metrics offer insights into the model's ability to accurately predict sentiment across different text entries.

For the analysis phase, the fine-tuned TinyBERT model and its tokenizer are loaded into memory. The user is prompted to enter text for sentiment analysis, which the model processes in a loop until the user exits the script. Each input text is preprocessed in the same manner as the training data, and the model predicts the sentiment, outputting the classification along with confidence levels and probabilities for each sentiment category.

This entire process, from training to analysis, is encapsulated in scripts written in Python 3.12.2, utilizing Google Colab for its GPU capabilities during the fine-tuning phase to enhance computational efficiency.

## Web Application

The web application component of this project offers a user-friendly way to interact with the sentiment analysis model. It's structured into two main parts: the backend, built with Flask, and the frontend, developed with HTML, CSS, and JavaScript.

### Back-end

Located in the `web-app/backend` folder, the backend is responsible for running the Flask server, which interacts with the TinyBERT model to perform sentiment analysis. The main file, `api.py`, handles API requests, performing sentiment analysis on text inputs and returning the results to the frontend.

### Front-end

The frontend files are located in the `web-app/frontend` folder and include HTML, CSS, and JavaScript files. They provide an interactive user interface for submitting text to the backend and displaying the sentiment analysis results. The design emphasizes usability and visual appeal, ensuring a seamless experience for users.

## 🎈 Usage <a name = "usage"></a>

The sentiment analysis is packaged in a Jupyter Notebook, making it easy to run and interact with the TinyBERT sentiment analysis model directly from Google Colab.

To use the notebook:

1. **Open the Notebook**: Navigate to Google Colab and upload the notebook file Fine-tuning `TinyBERT for Sentiment Analysis.ipynb`.

2. **Run the Setup Cells**: Execute the initial cells in the notebook to mount your Google Drive, import necessary libraries, download NLTK resources, and define all the classes and functions needed.

3. **Load the Pre-trained Model**: Run the last cell within the notebook to load the pre-trained TinyBERT model fine-tuned for sentiment analysis.

### Example:

> Enter text for sentiment analysis (or type 'exit' to stop):

**Text Data:**

I love sunny days but hate the rain.

**Results:**

```
Sentiment: Positive
Confidence: 95.67%
Probabilities:
  Positive: 95.67%
  Negative: 2.13%
  Neutral: 2.20%
```

---

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will guide you through accessing and running the "Fine-tuning TinyBERT for Sentiment Analysis" project directly in Google Colab for development, testing, and demonstration purposes.

### Prerequisites

To get started, you'll need:

```
A Google account to access Google Colab
Internet access to run Colab notebooks in the cloud
```

### Accessing the Notebook

A step by step series of instructions that tell you how to get the notebook running.

1. **Open Google Colab:** Navigate to Google Colab and sign in with your Google account.

2. **Upload the Notebook:** In the Colab interface, select `File` > `Upload notebook` to upload the `.ipynb` file from your local machine.

#### Running the Notebook

1. The notebook includes cells at the beginning to install necessary dependencies. Run these cells to ensure your environment is correctly set up.

2. If your dataset or pre-trained model is stored in Google Drive, follow the Colab prompts to mount your Drive to the notebook.

3. Navigate through the notebook, running cells sequentially. The notebook contains detailed comments explaining each step, from loading data to fine-tuning TinyBERT and analyzing sentiments.

4. Look for the section or cell dedicated to sentiment analysis. Here, you can input custom text and use the trained model to predict sentiment. Follow the inline instructions for details on how to run these predictions.

**Saving Your Work**

- **Google Colab Auto-save:** Colab automatically saves your notebook to Google Drive in a folder named Colab Notebooks.

- **Download the Notebook:** You can download the completed notebook to your local machine by selecting `File` > `Download .ipynb`.

### Running the Web Application

1. **Navigate to the `web-app/backend` directory:** Change into the `web-app/backend` folder where the `api.py` Flask application is located.

2. **Start the Flask Server:** Run `python api.py` to start the Flask server. Ensure that Flask is installed in your environment including all the libraries required.

3. **Open the Frontend:** Open the `index.html` file located in the `web-app/frontend` folder in a web browser to interact with the application.

**Note:** If the web application is not working, check if the host provided by Flask is similar with the host inside the `web-app/frontend/js/functions.js`, if not change it to the host provided.

## ⛏️ Built Using <a name = "built_using"></a>

- [Transformers](https://huggingface.co/transformers/) -  State-of-the-art Natural Language Processing for TensorFlow 2.0 and PyTorch
- [PyTorch](https://pytorch.org/) - An open-source machine learning library based on the Torch library, used for applications such as computer vision and natural language processing
- [Google Colab](https://colab.research.google.com/) - A free Jupyter notebook environment that runs entirely in the cloud
- [NLTK](https://www.nltk.org/) - A leading platform for building Python programs to work with human language data
- [Pandas](https://pandas.pydata.org/) - A fast, powerful, flexible and easy to use open-source data analysis and manipulation tool, built on top of the Python programming language
- [NumPy](https://numpy.org/) - The fundamental package for scientific computing with Python

### Datasets

For training and evaluating the sentiment analysis model, this project utilizes multiple datasets from various sources, combining them to create a rich and diverse corpus. The datasets include:

- Multiclass Sentiment Analysis Dataset from [Hugging Face Datasets](https://huggingface.co/datasets/Sp1786/multiclass-sentiment-analysis-dataset)
- Various sentiment analysis datasets from Kaggle, providing a wide range of texts from social media posts to product reviews:
    1. [Sentiment Analysis Dataset](https://www.kaggle.com/datasets/abhi8923shriv/sentiment-analysis-dataset)
    2. [Sentiment Analysis](https://www.kaggle.com/datasets/mdismielhossenabir/sentiment-analysis)
    3. [Twitter and Reddit Sentimental Analysis Dataset](https://www.kaggle.com/datasets/cosmos98/twitter-and-reddit-sentimental-analysis-dataset)
    4. [Social Media Sentiments Analysis Dataset](https://www.kaggle.com/datasets/kashishparmar02/social-media-sentiments-analysis-dataset)
    5. [Amazon Kindle Book Review for Sentiment Analysis](https://www.kaggle.com/datasets/meetnagadia/amazon-kindle-book-review-for-sentiment-analysis)
    6. [McDonald's Store Reviews](https://www.kaggle.com/datasets/nelgiriyewithana/mcdonalds-store-reviews)
    7. [Starbucks Reviews Dataset](https://www.kaggle.com/datasets/harshalhonde/starbucks-reviews-dataset)
    8. [IMDb Dataset Sentiment Analysis](https://www.kaggle.com/datasets/bhavikjikadara/imdb-dataset-sentiment-analysis)
    9. [Mental Health Corpus](https://www.kaggle.com/datasets/reihanenamdari/mental-health-corpus)
    10. [Movie Review](https://www.kaggle.com/datasets/nltkdata/movie-review)
    11. [37000 Reviews of Thread App Dataset](https://www.kaggle.com/datasets/shuvammandal121/37000-reviews-of-thread-app-dataset)
    12. [Spotify App Reviews 2022](https://www.kaggle.com/datasets/mfaaris/spotify-app-reviews-2022)
    13. [BERT Sentiment Analysis](https://www.kaggle.com/datasets/endofnight17j03/bert-sentiment-analysis)
    14. [Mental Health Insights Data](https://www.kaggle.com/datasets/sujaykapadnis/mental-health-insights-data)

## ✍️ Authors <a name = "authors"></a>

- [@dnachavez](https://github.com/dnachavez) - Idea & Initial work
- [@ReiKayomi](https://github.com/ReiKayomi) - Flask API

See also the list of [contributors](https://github.com/dnachavez/fine-tuning-tinybert-for-sentiment-analysis/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- The developers and contributors of the Transformers library
- The creators of the datasets used in this project
- The PyTorch team
- Google Colab for offering a powerful and free cloud computing environment
- The broader machine learning and NLP community
- Programming Philippines Discord Community
