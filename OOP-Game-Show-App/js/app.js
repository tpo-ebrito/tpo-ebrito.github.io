/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// global variables

let game
const buttons = document.querySelectorAll('.key')

/*
Adds an event listener to the button labeled "Start Game".
    1. When the button is pressed the code removes each child element from the ul, thus
       removing the previous phrase and resetting the game.
    2. Enables all buttons and sets their class name equal to key
    3. Selects all of the elements with the class of "tries" and sets their source image 
       back to liveHeart.png. Represents full lives at the start of the game.
    4. Creates a new class of the Game and calls the startGame method.
*/
document.querySelector('#btn__reset').addEventListener('click', (e) => {
  const ul = document.querySelector('ul')
  while (ul.firstElementChild) {
    ul.removeChild(ul.firstElementChild)
  }

  buttons.forEach(button => {
    button.disabled = false
    button.className = 'key'
  })

  const lives = document.querySelectorAll('.tries')
  lives.forEach(life => { life.firstElementChild.src = 'images/liveHeart.png' })

  game = new Game()
  game.startGame()
})

/*
Adds an event listener to each button on click. It then calls the handleInteraction button and
passes the value of the button that was clicked. The handleInteraction method is then run.
*/

buttons.forEach(button => button.addEventListener('click', (e) => {
  game.handleInteraction(e.target)
  // console.log(button.textContent)
  // console.log(e.target)
}))

/*
Adds an event listener on the user's keyboard.
All of buttons are then selected. The value of the clicked key is then compared
to the text content of each button. The button is then passed into the
handleInteraction method only if the key pressed exists in the buttons
*/
document.addEventListener('keyup', (e) => {
  buttons.forEach(button => {
    if (button.textContent === e.key) {
      game.handleInteraction(button)
    }
  })
// console.log(`key = ${e.key}, code = ${e.code}`)
})
