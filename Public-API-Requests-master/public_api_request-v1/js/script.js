'use strict'

/*
Gets the information needed in order to populate the page. Then calls the loadData function
with the information received.
*/

fetch('https://randomuser.me/api/?nat=us&results=12')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    loadData(data)
  })

/*
  loads the data on the page with the fetch data. Creates a new div class
  with the specified class name. Provides the infroamtion of the user. (Name, picture, location, etc.)
  Has an event listener in order to create the modal window.
 */

function loadData (data) {
  data.results.forEach((entry) => {
    const card = document.createElement('DIV')
    card.className = 'card'
    const innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${entry.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${entry.name.first} ${entry.name.last}</h3>
            <p class="card-text">${entry.email}</p>
            <p class="card-text cap">${entry.location.city}, ${entry.location.state}</p>
        </div>`

    card.insertAdjacentHTML('beforeend', innerHTML)

    card.addEventListener('click', () => {
      showModal(entry)
    })
    document.querySelector('#gallery').insertAdjacentElement('beforeEnd', card)
  })
}

/*
  Creates a modal window based based on the specified employee. Displays the employee's information.
  (name, DOB, email, location, etc.)
 */

function showModal (employeeData) {
  const overlay = document.createElement('DIV')
  overlay.className = 'modal-container'
  const html = ` <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
          <img class="modal-img" src="${employeeData.picture.medium}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${employeeData.name.first} ${employeeData.name.last}</h3>
          <p class="modal-text">${employeeData.email}</p>
          <p class="modal-text cap">${employeeData.email}</p>
          <hr>
          <p class="modal-text">${employeeData.phone}</p>
          <p class="modal-text">${employeeData.location.street.number} ${employeeData.location.street.name}, ${employeeData.location.city}, ${employeeData.location.state} ${employeeData.location.postcode}</p>
          <p class="modal-text">Birthday: ${employeeData.dob.date.substring(0, 10)}</p>
      </div>
  </div>`

  overlay.insertAdjacentHTML('beforeEnd', html)
  document.body.insertAdjacentElement('beforeEnd', overlay)

  overlay.querySelector('#modal-close-btn').addEventListener('click', () => {
    overlay.remove()
  })
  document.body.insertAdjacentElement('beforeEnd', overlay)
}
