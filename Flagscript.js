document.addEventListener('DOMContentLoaded', function () {
    const flagImg = document.getElementById('flag-img');
    const guessInput = document.getElementById('guess-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultMsg = document.getElementById('result');
    let correctAnswer = '';
    let incorrectGuessCount = 0;
    const maxIncorrectGuesses = 5;

    // Fetch a random country flag
    function fetchRandomFlag() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const flagUrl = data[randomIndex].flags.png;
                const countryName = data[randomIndex].name.common;
                flagImg.src = flagUrl;
                correctAnswer = countryName;
                // Reset incorrect guess count when fetching a new flag
                incorrectGuessCount = 0;
            })
            .catch(error => console.log('Error fetching data: ', error));
    }

    // Check the user's guess
    function checkGuess() {
        const userGuess = guessInput.value.trim().toLowerCase();

        if (userGuess === correctAnswer.toLowerCase()) {
            resultMsg.textContent = 'Correct!';
            resultMsg.style.color = 'green';
            // Fetch a new random flag for the next round
            fetchRandomFlag();
        } else {
            resultMsg.textContent = 'Incorrect. Try again.';
            resultMsg.style.color = 'red';
            // Increment incorrect guess count
            incorrectGuessCount++;
            // Check if reached maximum incorrect guesses
            if (incorrectGuessCount >= maxIncorrectGuesses) {
                // Fetch a new random flag
                fetchRandomFlag();
            }
        }
        // Clear the input after checking the guess
        guessInput.value = '';
    }

    // Event listener for the submit button
    submitBtn.addEventListener('click', checkGuess);

    // Reset result message when typing a new answer after clicking submit
    guessInput.addEventListener('input', function() {
        resultMsg.textContent = '';
    });

    // Fetch a random flag when the page loads
    fetchRandomFlag();
});