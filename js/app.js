/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

document.querySelector('#btn__reset').addEventListener('click', () => {  // Reveal game board when Sart Game is clicked
    game = new Game();
    game.startGame();    
});

document.querySelector('#qwerty').addEventListener('click', e => {    // When any letter is clicked, handleInteractions will be called
    if(e.target.className === 'key') {
        game.handleInteraction(e.target);
    }
})

let keys = [];
keys = document.querySelectorAll('.key');
keys.forEach(key => key.setAttribute('tabindex', -1));      // Disable tab key focus on onscreen keyboard

document.addEventListener('keydown', e => {          // EXTRA CREDIT: Add functionality to physical keyboard
    const letter = event.key.toLowerCase(); 
    const valid = /^[A-Za-z]$/.test(letter);        // Check to see if a single letter was entered 
    const overlay = document.querySelector('#overlay').style.display;  // check to see if game has started
  
    if (valid && overlay === 'none') {              // If single letter was entered, game has started, and key has not been disabled, handle interactions
        keys.forEach(key => { 
            keyLetter = key.textContent;
            if(letter.includes(keyLetter) && key.disabled !== true) { 
                game.handleInteraction(key);
            }
        });
    }
});

