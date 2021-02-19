/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/*
The class Game has a constructor that takes no parameters. The constructor
has 3 property keys that are missed, phrases and activePhrase. Missed accounts
for the number of times the user picked the incorrect letter. phrases takes an object
of the Phrases class and includes 5 different phrases. activePhrases is used to identify
the activePhrase in the game.
*/

class Game {
  constructor () {
    this.missed = 0
    this.phrases = [
      new Phrase('The best of both worlds'),
      new Phrase('See eye to eye'),
      new Phrase('Once in a blue moon'),
      new Phrase('A piece of cake'),
      new Phrase('Let the cat out of the bag')
    ]
    this.activePhrase = null
  }

  /*
The startGame method does 3 things when called.
1. hides the overlay display
2. it sets the activePhrase equal to the method getRandomPhrase
3. it adds the active phrase to the display by calling the method addPhrasetoDisplay
  */

  startGame () {
    document.querySelector('#overlay').style.display = 'none'
    this.activePhrase = this.getRandomPhrase()
    this.activePhrase.addPhrasetoDisplay()
  }

  /*
The getRandomPhrase method
1. creates a random number based on the number of phrases in the phrases array
2. returns the phrase at that random number
  */

  getRandomPhrase () {
    const randomNum = Math.floor(Math.random() * this.phrases.length)
    return this.phrases[randomNum]
  }

  /*
The handleInteraction method
1. when called, the method disables the button
2. The method checks to see if the textContent of the selected button is in the phrase
    - if it is, the class name "chosen" is added to the button and the showMatchedLetter
      method is called on the button's textContent
    - if it is not included, the className "wrong" is added to the class and the method
      removeLife is called
3. It then checks to see if the game is over by calling the checkForWin() function. If the
   value returns true, then the game is over. 
  */

  handleInteraction (button) {
    button.disabled = true
    if (!this.activePhrase.phrase.includes(button.textContent)) {
      button.className = 'wrong'
      this.removeLife()
    } else {
      button.className = 'chosen'
      this.activePhrase.showMatchedLetter(button.textContent)

      if (this.checkForWin() === true) {
        this.gameOver()
      }
    }
  }

  /*
The checkForWin method
1. checks to see if any of the DOM contains any class that includes the word "hide"
    - This is done because of the showMatchedLetter method. showMatchedLetter is 
      responsible for changing the className of a letter in the phrase from "hide" to "show".
      If the game is won, then all of the "hide" will have been changed to "show" thus making
      the length of classes containing "hide" equal to 0
2. returns the value "true" or "false"
  */

  checkForWin () {
    return (document.querySelectorAll('.hide').length === 0)
  }

  /*
The removeLife method
1. selects all of the elements that have the class name "tries"
2. changes the source of the lives at the specified index this.missed. This.missed
   represents the letters that aren't in the phrase. The source is changed to reflect a lost heart
3. The code then iterates this.missed.
4. It then checks to see if the user has missed 5 times. If so, then the game is over and the 
   gameOver method is called.
  */

  removeLife () {
    const lives = document.querySelectorAll('.tries')
    lives[this.missed].firstElementChild.src = 'images/lostHeart.png'
    this.missed++
    if (this.missed === 5) {
      this.gameOver()
    }
  }

  /*
The gameOver method
1. Shows the overlay display
2. calls the checkForWin method. If true, then the text content will be changed
   to "Congrats! You Won! :D". Then the class name is changed to "win"
3. If false, the text content will be changed to "Sorry, You Lost." It will then show
   the phrase and change the class name to 'lose'
  */

  gameOver () {
    document.querySelector('#overlay').style.display = 'inherit'
    if (this.checkForWin() === true) {
      document.querySelector('#game-over-message').textContent = 'Congrats! You Won! :D'
      document.querySelector('#overlay').className = 'win'
    } else {
      document.querySelector('#game-over-message').textContent = `Sorry, You Lost. The Phrase: ${this.activePhrase.phrase}`
      document.querySelector('#overlay').className = 'lose'
    }
  }
}
