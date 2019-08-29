/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [                                                // Phrases to be displayed on game board
            new Phrase('A bird in the hand is worth two in the bush'),
            new Phrase('Honk if you love peace and quiet'),
            new Phrase('Through the eye of a needle'),
            new Phrase('Mad as a hatter'),
            new Phrase('It is raining cats and dogs')
        ];
        this.activePhrase = null;
    }

    startGame() {   // Displays game board and phrase

        document.querySelector('#overlay').style.display = 'none';      // Display game board
        this.activePhrase = this.getRandomPhrase();                     // Get random phrase form phrases
        this.activePhrase.addPhraseToDisplay();                         // Display random phrase to screen
    }

    getRandomPhrase() {          // Selects and return a random phrase from this.phrases
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    handleInteraction(button) {
        button.disabled = true;     // disable the key clicked

        // Checks if letter entered is in phrase
        if(this.activePhrase.checkLetter(button.textContent)) {     // If true, show letters.
            this.activePhrase.showMatchedLetter(button.textContent);
            button.classList.add('chosen', 'animated', 'rotateIn'); // EXTRA CREDIT: Add animation to correct key pressed
            if(this.checkForWin()) {                                // If all letters guessed, Game Over.
                this.gameOver()
            }
        } else {                    // If false, remove life.
            button.classList.add('wrong', 'animated', 'shake');     // EXTRA CREDIT: Add animation to wrong key pressed
            this.removeLife();
            this.checkForWin();
        }
    }

    removeLife() {    // Remove life when incorrect letter entered
        let images = [];
        images = document.querySelectorAll('img');
        images[this.missed].classList.add("animated", "jello");    // EXTRA CREDIT: Add animation to removed heart
        images[this.missed].src = 'images/lostHeart.png';   
        this.missed += 1;                                       // Replace blue hearts with gray hearts when missed    
        if(this.missed === 5) {                                 // If missed five times, game is over and special efects removed
            this.gameOver();   
        } 
    }

    checkForWin() {                         // Checks to see if all letters in phrase have been found
        if(document.querySelectorAll('.hide').length === 0) {
            return true;
        } else {
            return false;
        }
    }

    gameOver() {                                                 // Displays "win" or "loss" message
        const overlay = document.querySelector('#overlay');
        overlay.style.display = '';                              //  Show overlay, hide game board
        let gameOverMsg = document.querySelector('#game-over-message');
        if(this.checkForWin() === true) {  
            gameOverMsg.classList.add("animated", "flash");                // If game is won, display winning message
            gameOverMsg.textContent = 'Victory is yours!';
            overlay.classList.remove('lose');
            overlay.classList.add('win');
        } else {      
            gameOverMsg.classList.add("animated", "pulse");                      // If game is lost, display losing message
            gameOverMsg.innerHTML = "Sorry! Correct answer is:" + 
                `<p>${this.activePhrase.phrase.charAt(0).toUpperCase() +        // EXTRA CREDIT: Display correct phrase
                    this.activePhrase.phrase.slice(1)}</p>`;        
            overlay.classList.remove('win');
            overlay.classList.add('lose');
        }
        this.resetGame();

    }
    resetGame() {       // Reset the gameboard
        let li = [];
        li = document.querySelectorAll('.letter');
        let spaces = [];
        spaces = document.querySelectorAll('.space');
        li.forEach(l => l.parentNode.removeChild(l));       // Remove phrase placeholders from gameboard
        spaces.forEach(space => space.parentNode.removeChild(space));       // Remove space from gameboard

        let keys = [];
        keys = document.querySelectorAll('.key');
        keys.forEach(key => {                               // Enable all keys
            key.removeAttribute("disabled");
            key.classList.remove("animated", "rotateIn", 'shake'); 
            key.className = "key";
        });

        let image = [];
        image = document.querySelectorAll('img');
        image.forEach(img => {
            img.src= 'images/liveHeart.png';                   // Restore hearts
            img.classList.remove("animated", "jello");         // Remove animation class from hearts
        });   

        this.activePhrase = null;                               // Remove previous phrase
    }
}