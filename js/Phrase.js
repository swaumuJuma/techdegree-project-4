/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {      // Adds letter placeholders to the display when the game starts
        const ul = document.querySelector('ul');
        [...this.phrase].forEach((character) => {
            const liLetters = document.createElement('li');     // Create li for each letter in phrase
            ul.append(liLetters);
            if(character === ' ') {
                liLetters.classList.add('space');
                liLetters.innerHTML = ' ';
            } else {
                liLetters.classList.add('hide', 'letter', `${character}`, 'animated', 'bounceIn');  //  EXTRA CREDIT: add animation to phrase placeholders
                liLetters.innerHTML = character;
            }
        })
    }

    checkLetter(letter) {       // Check if letter entered imatches a letter in the phrase
        return this.phrase.indexOf(letter) > -1;   // true or false
    }

    showMatchedLetter(letter) {        // Displays all matched letters
        let matchedLetters = [];
        matchedLetters = document.querySelectorAll(`.${letter}`);

        matchedLetters.forEach(letters => {
            letters.classList.add('show');
            letters.classList.remove('hide');
        }
    )}
 }