document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('text');
    const resultsElement = document.getElementById('results');
    const randomTextButton = document.getElementById('random_text');
    const lengthyTextButton = document.getElementById('lengthy_text');
    const formElement = document.getElementById('form');
    const backButton = document.getElementById('back');

    resultsElement.style.display = 'none';

    const randomTexts = [
        'I’m changeable, I can be bad',
        'I can be good if you like that',
        'I got power, I’ll take you wonder',
        'No one can stop me and can deny',
    ];

    function toggleTextType() {
        const replacementElement = document.createElement(isLengthy ? 'input' : 'textarea');
        if (!isLengthy) replacementElement.rows = 5;
        else replacementElement.type = 'text';
        
        ['id', 'name', 'className', 'placeholder'].forEach(attr => {
            replacementElement[attr] = textElement[attr];
        });
        
        textElement.parentNode.replaceChild(replacementElement, textElement);
    }

    function displayRandomText(event) {
        event.preventDefault();
        textElement.value = 'Loading...';
        textElement.disabled = true;
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * randomTexts.length);
            textElement.value = randomTexts[randomIndex];
            textElement.disabled = false;
        }, 1000);
    }

    function showError(message) {
        let errorElement = document.querySelector('.error');
        if (!errorElement) {
            errorElement = document.createElement('small');
            errorElement.className = 'error text-danger';
            textElement.parentNode.insertBefore(errorElement, textElement.nextSibling);
        }
        errorElement.innerHTML = message;
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const text = textElement.value.trim();
        if (!text) {
            showError('This field is required.');
            return;
        }

        fetchPrediction(text);
    }

    async function fetchPrediction(text) {
        try {
            const response = await fetch('http://192.168.254.103:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                const errorMessage = await response.text();
                showError(errorMessage);
            }
        } catch (error) {
            showError('An error occurred while processing your request.');
        }
    }

    function displayResults({ predicted_class, confidence, probabilities }) {
        const audio = new Audio('audio/bereal.mp3');
        audio.play();
        const percentageProbabilities = probabilities.map(prob => (prob * 100).toFixed(2));
        resultsElement.style.display = 'block';
        resultsElement.classList.add('fade-in');
        document.getElementById('predicted_class').textContent = `${(confidence * 100).toFixed(2)}% ${predicted_class} Sentiment`;
        ['negative', 'neutral', 'positive'].forEach((sentiment, index) => {
            document.getElementById(`${sentiment}_probability_percentage`).textContent = `${percentageProbabilities[index]}%`;
            document.getElementById(`${sentiment}_probability_bar`).style.width = `${percentageProbabilities[index]}%`;
            document.getElementById(`${sentiment}_probability`).textContent = `Probability: ${probabilities[index]}`;
        });
        formElement.style.display = 'none';
    }

    function resetResults(event) {
        event.preventDefault();
        resultsElement.classList.add('fade-out');
        formElement.classList.add('fade-in');
        setTimeout(() => {
            resultsElement.style.display = 'none';
            formElement.style.display = 'block';
            textElement.value = '';
            textElement.disabled = false;
            const errorElement = document.querySelector('.error');
            if (errorElement) {
                errorElement.parentNode.removeChild(errorElement);
            }
        }, 100);
    }

    randomTextButton.addEventListener('click', displayRandomText);
    lengthyTextButton.addEventListener('click', () => {
        isLengthy = !isLengthy;
        toggleTextType();
    });
    formElement.addEventListener('submit', handleFormSubmit);
    backButton.addEventListener('click', resetResults);
});
