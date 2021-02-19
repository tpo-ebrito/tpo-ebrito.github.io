/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/*
class Phrase. This class has 1 constructor that takes the phrase and
converts it to lower case
*/

class Phrase {
  constructor (phrase) {
    this.phrase = phrase.toLowerCase()
  }

  /*
This method takes the phrase and adds it to the display.
The method creates a child of the ul class, li, and appends each letter
of the phrase to an li tag. The method accounts for spaces and sets the
text content of the li tag to the letter. The method also adds a class name
to the li tags.
  */

  addPhrasetoDisplay () {
    const ul = document.querySelector('#phrase').firstElementChild
    for (let i = 0; i < this.phrase.length; i++) {
      const li = document.createElement('li')
      const letter = this.phrase.charAt(i)

      if (letter !== ' ') {
        li.className = `hide letter ${letter}`
        li.textContent = letter
      } else {
        li.className = 'space'
      }
      ul.appendChild(li)
    }
  }

  /*
This method takes in 1 parameter (letter). It checks to see if
that parameter is included in the phrase.
  */

  checkLetter (letter) {
    return this.phrase.includes(letter)
  }

  /*
This method takes the letter and replaces the class name of the letter from
"hide" to "show" when called. This is used to display the matched letter.
  */

  showMatchedLetter (letter) {
    letter = letter.toLowerCase()
    const elements = document.querySelectorAll(`.hide.letter.${letter}`)
    elements.forEach(element => element.classList.replace('hide', 'show'))
  }
}
