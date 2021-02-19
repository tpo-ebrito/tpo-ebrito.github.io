"use strict"

/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// Quotes array. The objects are stored inside of arrays.

const quotes = [
{
  author: 'Kobe Bryant', 
  quote: "If you want to be great at something, there’s a choice you have to make. What I mean by that is, there are inherent sacrifices that come along with that. Family time, hanging out with friends, being a great friend, being a great son, nephew, whatever the case may be." 
},
{
  author:  'Dave Chappelle',
  quote: "You know, be able to do something great in your life, you're gonna have to realize your failures. You're gonna have to embrace them and figure out how to overcome it"},
{
  author: 'Barack Obama',
  quote: "Change will not come if we wait for some other person or if we are the ones we've been waiting for. We are the change that we seek",
  citation: "Campaign Speech",
  year: 2008
},
{
  author: 'Trevor Noah',
  quote: "We spend so much time being afraid of failure, afraid of rejection. But regret is the thing we should fear most."
},
{
  author: 'Trevor Noah',
  quote: " Often, people who can do, don’t because they’re afraid of what people that can’t do will say about them doing. "
},
{
  author: 'Michelle Obama',
  quote: "If my future were determined just by my performance on a standardized test, I wouldn't be here. I guarantee you that."
},
{
  author: 'Mother Teresa',
  quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier."
},
{
  author: 'Muhammad Ali',
  quote: "If my mind can conceive it, and my heart can believe it - then I can achieve it.",
  citation: "The Soul of a Butterfly: Reflections on Life's Journey"
}
];

/*
Defined the html variable. The variable is used to store the string that will be used in the index.html document.
*/

let html = '';

/* 
randomValue fucntion. This function is used in order to generate a random number between 0 and 255. 
This is multiplied by 256 since Math.floor rounds down and RGB consists of 255 numbers.
*/

const randomValue = () => Math.floor(Math.random() * 256);

/* 
getRGB function. This function changes the background color of the html document when called. The randomValue function
is used here in order to provide 3 random numbers. The numbers are input into a temperate literal consisting of the 
rgb format. 
*/

function getRGB(){
  document.body.style.backgroundColor = `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
}

/* 
getRandomQuote function. This function adds a random number between 0 and however many arrays are in the quotes function. 
This number is then used to find the quote.
*/

function getRandomQuote(){

const randNum = Math.floor(Math.random()*quotes.length);
return quotes[randNum];

}

//This function is responsible for the ouput of the quote.

function printQuote(){
const randomQuote = getRandomQuote();        // calls the random quote function. This defines randNum and randQuote.
getRGB();                // gets the RGB function, this sets the background color

html = `
<p class = "quote">${randomQuote.quote}</p>
<p class = "source">${randomQuote.author}`;

/*
  This if function checks if the array has a citation and a year property. If it does then the 
  code concatenates the citation and year into html. If there is only year, then the code will
  concatenate the year only, same if there is only citation. If there is neither year or citation
  then the code will add the closing </p>
*/

if(randomQuote.citation && randomQuote.year){
  html += `
  <span class="citation">${randomQuote.citation}</span>
  <span class="year">${randomQuote.year}</span>`;

}else if(randomQuote.citation){
  
  html += `
  <span class="citation">${randomQuote.citation}</span>`;

}else if(randomQuote.year){
  html+=`<span class="year">${randomQuote.year}</span>`;
}

  html+= `</p>`;

document.getElementById('quote-box').innerHTML = html; 

};

/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);

