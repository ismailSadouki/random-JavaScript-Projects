const INPUTS = document.querySelector('.inputs'),
     resetBtn = document.querySelector('.reset-btn'),
     typingInput = document.querySelector('.typing-input'),
     wrongLetter = document.querySelector('.wrong-letter span'),
     guessLeft = document.querySelector('.guess-left span'),
     hint = document.querySelector('.hint span');

let word, incorrects = [], corrects = [], maxGuesses;

function randomWorld() {
     // getting random object from wordlist
     let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
     word = ranObj.word;
     maxGuesses = 8;incorrects = []; corrects = [];
     console.log(word + ' ;enjoy!')

     hint.innerText = ranObj.hint; 
     guessLeft.innerText = maxGuesses; 
     wrongLetter.innerText = incorrects; 

     let html = "";
     for (let i = 0; i < word.length; i++) {
          html += '<input type="text" disabled>';
          INPUTS.innerHTML = html;
     }
}
randomWorld();

function initGame(e) {
     let key = e.target.value;
     if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key} `) && !corrects.includes(key)) {
          if (word.includes(key)) { // if user letter found in the word
               for (let i = 0; i < word.length; i++) {
                    // showing matched latter in the input value 
                    if (word[i] === key) {
                         corrects.push(key);
                         INPUTS.querySelectorAll("input")[i].value = key;
                    }
               }
          } else {
               maxGuesses--; // decrement maxGuesses by 1
               incorrects.push(` ${key} `);
          }
          guessLeft.innerText = maxGuesses; 
          wrongLetter.innerText = incorrects;
     }
     typingInput.value = "";

     setTimeout(() => {
          if (corrects.length === word.length) { // if user found all letters 
               alert("Congrats!")
               randomWorld();
          } else if (maxGuesses < 1) { // if user couldn't found all letters
               alert("Game Over!");
               for (let i = 0; i < word.length; i++) {
                    // show all letters in the input   
                    INPUTS.querySelectorAll("input")[i].value = word[i];
               }
          }
     });
}

resetBtn.addEventListener("click", randomWorld); 
typingInput.addEventListener("input", initGame); 
document.addEventListener("keydown", () => typingInput.focus()); 