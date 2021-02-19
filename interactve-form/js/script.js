'use strict'
// global variables

const name = document.querySelector('#name')
const jobRole = document.querySelector('#title')
const otherJobRole = document.querySelector('#other-job-role')
const design = document.querySelector('#design')
const color = document.querySelector('#color')
const activities = document.querySelector('#activities')
const total = document.querySelector('#activities-cost')
let totalCost = 0
const checkbox = document.querySelectorAll('input[type=checkbox]')
const regexEmail = /^\w+@\w+\.com$/
const regexCreditCard = /^\d{13,16}$/

const payment = document.querySelector('#payment')
const creditCard = document.querySelector('#credit-card')
const payPal = document.querySelector('#paypal')
const bitCoin = document.querySelector('#bitcoin')
const ccNum = document.querySelector('#cc-num')
const zip = document.querySelector('#zip')
const cvv = document.querySelector('#cvv')
const form = document.querySelector('form')

/* The below code sets the default layout of the page. Name is in focus,
   otherJobRole is hidden, color is disabled, paypal and
   bitcoin are hidden and the credit-card field is displayed
*/
name.focus()
otherJobRole.style.display = 'none'
color.disabled = true
payPal.style.display = 'none'
bitCoin.style.display = 'none'
document.querySelector('[value="credit-card"]').selected = true

/* Test code to confirm that the correct tags were selected
// console.log(jobRole)
// console.log(design)
// console.log(color)
// console.log(color.children[1])
*/

/* This for loop is used to check the checkboxes and apply both focus
   and blur to them when they are selected.
*/
for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener('focus', (e) => {
    checkbox[i].parentNode.classList.add('focus')
  })
  checkbox[i].addEventListener('blur', (e) => {
    checkbox[i].parentNode.classList.remove('focus')
  })
}

/* This event listener on jobRole checks to see if the selected dropdown is
   other. If it is then the otherJobRole will display, if it is not then it
   will not display.
*/
jobRole.addEventListener('change', (e) => {
  const dropDown = e.target.value
  // console.log(dropDown)
  if (dropDown === 'other') {
    otherJobRole.style.display = 'inline'
  } else {
    otherJobRole.style.display = 'none'
  }
})

/* This event listener on design checks to see if the design dropdown has
   been selected. If so, it enables the color field and displays the colors
   the t-shirts based on their data-theme.
*/

design.addEventListener('change', (e) => {
  color.disabled = false

  for (let i = 1; i < color.length; i++) {
    const colorValue = e.target.value
    const colorAttribute = color[i].getAttribute('data-theme')

    if (colorValue === colorAttribute) {
      color[i].hidden = false
      color[i].selected = true
    } else {
      color[i].hidden = true
      color[i].selected = false
    }
  }
})

/* This event listener on activites checks to see which activities were
   selected. It then disables the other activites that conflict with the
   date and time of the checked one. It then takes the sum of the selected
   values and displays them to the user.
*/

activities.addEventListener('change', (e) => {
  const clicked = e.target
  const dataCost = +(clicked.getAttribute('data-cost'))

  //  console.log(dataCost)
  //  console.log(typeof dataCost)

  const isChecked = clicked.checked
  //  console.log(totalCost)

  for (let i = 1; i < checkbox.length; i++) {
    const otherDateAndTime = checkbox[i].dataset.dayAndTime
    const isCheckedDayAndTime = clicked.dataset.dayAndTime
    const otherParent = checkbox[i].parentNode

    if ((isChecked) & (isCheckedDayAndTime === otherDateAndTime) && (clicked.name !== checkbox[i].name)) {
      checkbox[i].disabled = true
      otherParent.classList.add('.disabled')
    } else if (!isChecked) {
      checkbox[i].disabled = false
      otherParent.classList.remove('.disabled')
    }
  }

  if (isChecked) {
    totalCost += dataCost
    // console.log(totalCost)
  } else {
    totalCost -= dataCost
    // console.log(totalCost)
  }
  total.innerHTML = `Total: $${totalCost}`
})

/* This event listener on payment checks to see if the selected dropdown is
   either credit-card, bitcoin, or paypal. It will then display the appropriate
   style.
*/
payment.addEventListener('change', (e) => {
  switch (e.target.value) {
    case 'credit-card':
      creditCard.style.display = ''
      payPal.style.display = 'none'
      bitCoin.style.display = 'none'
      break
    case 'bitcoin':
      creditCard.style.display = 'none'
      payPal.style.display = 'none'
      bitCoin.style.display = ''
      break
    case 'paypal':
      creditCard.style.display = 'none'
      payPal.style.display = ''
      bitCoin.style.display = 'none'
      break
  }
})

/* This function adds an event listener to the credit-card number.
   It checks the user's input in real time and compares it to the
   regex validation that was created for the cc number. Once the cc num
   reaches 13 digits the error message dissapears, once it surpasses 16 digits
   the error message reappears.
*/

ccNum.addEventListener('input', (e) => {
  if (!regexCreditCard.test(e.target.value)) {
    ccNum.parentNode.lastElementChild.style.display = 'inherit'
  } else {
    ccNum.parentNode.lastElementChild.style.display = 'none'
  }
})

/* This function is used to validate the email address and display
   the appropriate message. It takes 2 parameters, a field and the pattern,
   checks the length, tests it with the regex validation for email and checks
   if the email is valid. It then displays the appropriate message.
*/

function validateEmailAndDisplayMessage (field, pattern) {
  if (field.value.length === 0) {
    field.parentNode.classList.add('not-valid')
    field.parentNode.lastElementChild.innerHTML = 'This email field cannot be blank'
    field.parentNode.lastElementChild.style.display = 'inherit'
    return false
  } else {
    field.parentNode.classList.remove('not-valid')
    field.parentNode.lastElementChild.style.display = 'none'
  }

  const isValid = pattern.test(field.value)

  if (isValid) {
    field.parentNode.classList.remove('not-valid')
    field.parentNode.lastElementChild.style.display = 'none'
  } else {
    field.parentNode.classList.add('not-valid')
    field.parentNode.lastElementChild.innerHTML = 'Email address must be formatted correctly (example@example.com)'
    field.parentNode.lastElementChild.style.display = 'inherit'
    return false
  }

  return true
}

// function being called on the email and checking the input in real time.

document.querySelector('#email').addEventListener('input', (e) => {
  validateEmailAndDisplayMessage(e.target, regexEmail)
})

/* This event payment on the form is used in order to submit the form.
   It checks the remaining validations, and displays the appropriate message.
   If the user did not enter a required field then the form will not submit. If
   the user does enter all fields that are required then the form will submit. 
*/

form.addEventListener('submit', (e) => {
  const userName = name.value
  const userCreditCard = ccNum.value
  const userZip = zip.value
  const userCvv = cvv.value

  const parentName = name.parentNode
  const parentCreditCard = ccNum.parentNode
  const parentZip = zip.parentNode
  const parentCvv = cvv.parentNode

  const regexName = /^[A-Za-z\s]+$/
  const regexZip = /^\d{5}$/
  const regexCvv = /^\d{3}$/

  const isValidName = regexName.test(userName)
  const isValidCreditCard = regexCreditCard.test(userCreditCard)
  const isValidZip = regexZip.test(userZip)
  const isValidCvv = regexCvv.test(userCvv)

  // console.log(isValidName)
  // console.log(isValidEmail)
  // console.log(isValidCreditCard)
  // console.log(isValidZip)
  // console.log(isValidCvv)
  // console.log(checkbox.length)

  if (!isValidName) {
    e.preventDefault()
    parentName.classList.add('not-valid')
    parentName.classList.remove('valid')
    parentName.lastElementChild.style.display = 'block'
  } else {
    parentName.classList.add('valid')
    parentName.classList.remove('not-valid')
    parentName.lastElementChild.style.display = 'none'
  }

  const isValidEmail = validateEmailAndDisplayMessage(document.querySelector('#email'), regexEmail)

  if (!isValidEmail) {
    e.preventDefault()
  }

  if (document.querySelector('[value="credit-card"]').selected) {
    if (!isValidCreditCard) {
      e.preventDefault()
      parentCreditCard.classList.add('not-valid')
      parentCreditCard.classList.remove('valid')
      parentCreditCard.lastElementChild.style.display = 'block'
    } else {
      parentCreditCard.classList.add('valid')
      parentCreditCard.classList.remove('not-valid')
      parentCreditCard.lastElementChild.style.display = 'none'
    }
    if (!isValidZip) {
      e.preventDefault()
      parentZip.classList.add('not-valid')
      parentZip.classList.remove('valid')
      parentZip.lastElementChild.style.display = 'block'
    } else {
      parentZip.classList.add('valid')
      parentZip.classList.remove('not-valid')
      parentZip.lastElementChild.style.display = 'none'
    }
    if (!isValidCvv) {
      e.preventDefault()
      parentCvv.classList.add('not-valid')
      parentCvv.classList.remove('valid')
      parentCvv.lastElementChild.style.display = 'block'
    } else {
      parentCvv.classList.add('valid')
      parentCvv.classList.remove('not-valid')
      parentCvv.lastElementChild.style.display = 'none'
    }
  }

  if (!checkbox[0].checked &&
     !checkbox[1].checked &&
     !checkbox[2].checked &&
     !checkbox[3].checked &&
     !checkbox[4].checked &&
     !checkbox[5].checked &&
     !checkbox[6].checked) {
    e.preventDefault()
    checkbox[0].parentNode.parentNode.classList.add('not-valid')
    checkbox[0].parentNode.parentNode.classList.remove('valid')
    checkbox[0].parentNode.parentNode.parentNode.lastElementChild.style.display = 'block'
  } else {
    checkbox[0].parentNode.parentNode.classList.add('valid')
    checkbox[0].parentNode.parentNode.classList.remove('not-valid')
    checkbox[0].parentNode.parentNode.parentNode.lastElementChild.style.display = 'none'
  }
})
