/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// there are 9 students per page
const itemsPerPage = 9;

/*function gets a list and page parameter and prints the contents of the page to the document 
   startIndex and last index both use itemsPerPage in order to figure out which 9 students from the list are going
   to be displayed on the page
*/
function showPage(list, page){   
   const startIndex = (page*itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';

   // console.log(startIndex);
   // console.log(endIndex);

/*
for loop lists all of the given list elements to the HTML page. The start and end Index in the if statement is used to append
the list items that are between the endIndex and the startIndex
*/
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         const student = list[i];
         let studentItem = 
         `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
           <h3>${student.name.title}. ${student.name.first} ${student.name.last}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined: ${student.registered.date}</span>
         </div>
       </li>`;
       studentList.insertAdjacentHTML("beforeend", studentItem);
    } 
   }
};

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/** 
 numofPages is used in order to find the number of pages needed. This is found by taking the Math.ceil, which rounds a number up,
 of the length of the list divided by the itemsPerPage. If there are 40 studnets and you want 5 students perPage, numofPages will
 become 8 pages.
*/
function addPagination(list){
   const numOfPages = Math.ceil(list.length/itemsPerPage);

//   console.log(numOfPages);

   const linkList = document.querySelector('ul.link-list'); //selects the link-list class of ul and sets the innerHTML to an empty string.
   linkList.innerHTML='';

   for(let i = 1; i < numOfPages+1; i++){  //for loop is used to display the numofpages and displays each button as a page number
      let button = 
      `<li>
      <button type="button">${i}</button>
      </li>`;

   linkList.insertAdjacentHTML("beforeend",button);  //inserts the button in the HTML document

 //     console.log(i);
   }
      
   let button = document.querySelector('button'); //selects the button and assigns it to the button className active
      button.className = 'active';

      /*click event that works with the page number's listed on the bottom. The handler only works if the button is clicked, it
      gets the class" active, removes the active class from the other buttons and sets active to the one the user clicked.
      */

   linkList.addEventListener('click', (e) => {   
      if(e.target.tagName === 'BUTTON'){
         const activeClass = document.querySelector('.active');
         activeClass.className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);  //calls showPage in order to determine the 9 students that will be on the selected page
      }
      
   });

};

// Call functions
showPage(data, 1);
addPagination(data);


