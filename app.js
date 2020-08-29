'use strict';

///////////////////////////////////////////////////Lab 13 - Codefellows 201////////////////////////////////////////////////////////////


//*********************************************"Add Local Storage to BusMall App"**************************************************//
//Global Variables:
//var imgArray[] - an Array to contain all the image objects created by the constructor
//var imgOne - an html object assigned the value of document.getElementById('image-one');
//var imgTwo - an html object assigned the value of document.getElementById('image-two');
//var imgThree - an html object assigned the value of document.getElementById('image-three');
//var allClicks - maintains a running count of how many rounds the survey has gonne on for, default of 0
//var surveyLimit - the maximum number of survey rounds, default of 25

//LOGIC FLOW:
//1.this app constructs 3 objects that generate images in groups of 3 with the renderApp() function. If it has been used before it will populate the imgArray with information from prior visit, if not it will create 20 new image objects (hardcoded this way)
//                                             V

//2.The event handler clickedPic() then listens for which image the user clicks and removes the current images from the screen (incrementing the properties clicked for the selected image and viewed for all displayed in th process)
//                                             V

//3. This proceeds 25 times (variable - 'surveyLimit') until the user selects the final image.
//                                             V

//4. After the 'surveyLimit' amount of rounds, the images are removed from the screen and a bar graph will be rendered in its place to display the survey results to the user and (eventually) adminstrator.

//5. Total number of clicks and times each image was displayed are stored to local storage for repeated uses of the site to keep a running total of all users who use this machine to survey.
//                                            END
//___________________________________________________________________________________________________________________________________//


//************************************************Global Variables******************************************************************//
//holds all the image objects created by the Picture(name,src) constructor
var imgArray = [];

//gets references to the html objects so their srcs can be manipulated
var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');
var imgThree = document.getElementById('image-three');

//maintains a running count of how many rounds the survey has gonne on for then provides a maximum in surveyLimit
var allClicks = 0;
var surveyLimit = 25;

//-------------------------------------Constructor Picture(name, src)-------------------------------------------//
//Parameters://
//name - the name of the image created, should correspond to the alternate text value of the html image that references it//
//src - the image file path source//

//Creates a new object to reference the image of a product. Also stores times selected by the user, was this image currenty displayed, and times each image was displayed on screen. Finally is pushed into the imgArray to be rendered on screen later.

//Properties:
//this.viewed - numbers of times image has been displayed on page
//this.clicked - how many times image has been clicked on by user, default of 0
//this.src - the current image file path source
//this.name - the alternate text value of the image
//this.used - was this item displayed in the last round of images?
//_______________________________________________________________________________________________________________//
function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;
  this.used = false;

  imgArray.push(this);
}

//FIRST, we check to see if there is already an array stored for prior surveys taken on this machine. If so, we will just add on tot hat array.

//If this is the user's first time taking this survey on this machine, then the product objects and imgArray are populated instead.
if (localStorage.getItem('productArray') !== null) {
  imgArray = JSON.parse(localStorage.getItem('productArray'));
}
else {
  //Picture('name of new Picture object', image file path)
  //Creates 20 survey items to populate the page with
  new Picture('bag', './img/bag.jpg');
  new Picture('banana', './img/banana.jpg');
  new Picture('bathroom', './img/bathroom.jpg');
  new Picture('boots', './img/boots.jpg');
  new Picture('breakfast', './img/breakfast.jpg');
  new Picture('bubblegum', './img/bubblegum.jpg');
  new Picture('chair', './img/chair.jpg');
  new Picture('cthulhu', './img/cthulhu.jpg');
  new Picture('dog-duck', './img/dog-duck.jpg');
  new Picture('dragon', './img/dragon.jpg');
  new Picture('pen', './img/pen.jpg');
  new Picture('pet-sweep', './img/pet-sweep.jpg');
  new Picture('scissors', './img/scissors.jpg');
  new Picture('shark', './img/shark.jpg');
  new Picture('sweep', './img/sweep.png');
  new Picture('tauntaun', './img/tauntaun.jpg');
  new Picture('unicorn', './img/unicorn.jpg');
  new Picture('usb', './img/usb.gif');
  new Picture('water-can', './img/water-can.jpg');
  new Picture('wine-glass', './img/wine-glass.jpg');
}

//-------------------------------------Function renderImages()-------------------------------------------//
//Parameters://
//none//

//Local Variables
//var randImgOne - an image object meant to be filled with a random image element selected from the imgArray[] by the mathRand(max) function
//var randImgTwo - an image object meant to be filled with a random image element selected from the imgArray[] by the mathRand(max) function
//var randImgThree - an image object meant to be filled with a random image element selected from the imgArray[] by the mathRand(max) function

//1. randImgOne-Three are created as one of the 20 product objects created.
//                                      V

//2. randImgOne-Three are checked for copies, and then to see if they were used in the previous round and recreated if any are found        until we have 3 new products that weren't seen the last survey round.
//                                      V

//3. all items in the imgArray have their .used property set to false
//                                      V

//4. randImgOne-Three have their .used property set to true so they may be found next time renderImages is invoked
//                                      V

//5. the html objects imgOne-Three have their .src properties set to the .src of randImgOne-Three
//                                      V

//6. the html objects imgOne-Three have their .alt properties set to the .name of randImgOne-Three
//                                      V

//7. all image objects displayed during this round have their .viewed property incremented++
//                                      V

//returns:                           nothing
//                                      V

//                                     END
//_______________________________________________________________________________________________________________//
function renderImages() {
  //1.
  var randImgOne = imgArray[mathRand(imgArray.length)];
  var randImgTwo = imgArray[mathRand(imgArray.length)];
  var randImgThree = imgArray[mathRand(imgArray.length)];

  //2.
  while (randImgOne === randImgTwo || randImgOne === randImgThree || randImgTwo === randImgThree || randImgOne.used === true || randImgTwo.used === true || randImgThree.used === true) {
    randImgOne = imgArray[mathRand(imgArray.length)];
    randImgTwo = imgArray[mathRand(imgArray.length)];
    randImgThree = imgArray[mathRand(imgArray.length)];
  }

  //3.
  for (var j = 0; j < imgArray.length; j++) {
    imgArray[j].used = false;
  }

  //4.
  randImgOne.used = true;
  randImgTwo.used = true;
  randImgThree.used = true;

  //5.
  imgOne.src = randImgOne.src;
  imgTwo.src = randImgTwo.src;
  imgThree.src = randImgThree.src;

  //6.
  imgOne.alt = randImgOne.name;
  imgTwo.alt = randImgTwo.name;
  imgThree.alt = randImgThree.name;

  //7.
  for (var i = 0; i < imgArray.length; i++) {
    if (imgOne.alt === imgArray[i].name || imgTwo.alt === imgArray[i].name || imgThree.alt === imgArray[i].name) {
      if (allClicks < surveyLimit) {
        imgArray[i].viewed++;
      }
    }
  }
}

//-------------------------------------Function mathRand(max)-------------------------------------------//
//Parameters://
//max - the maximum number to be randomly selected//

//returns:
// the math.floor() of a random number between 0 and .99 multiplied by the maximum number in order to round the decimel
//                                      V

//                                     END
//_______________________________________________________________________________________________________________//
function mathRand(max) {
  return Math.floor(Math.random() * max);
}

//all html objects are given an event listener in order to detect when an image has been clicked on by the user
//event handler named clickedPic()
imgOne.addEventListener('click', clickedPic);
imgTwo.addEventListener('click', clickedPic);
imgThree.addEventListener('click', clickedPic);


//-------------------------------------EventHandler clickedPic(e)-------------------------------------------//
//Parameters://
//e - the 'click' event from imgOne-Three//

//Local Variables
//none                                     V

//1.  if the last round  of the survey (surveyLimit) hasn't been reached yet, the imgArray[] is sorted through in the for loop to increment the .clicked property of the selected item for this round. allClicks is incremented by 1 to keep track of how many rounds of voting has occured. then new images are rendered to the page with the function renderImages() and the for loop ends.
//                                      V

//2. if the last round has been reached, then the event listeners are all removed, the image displays removed, and the bargraph info rendered with the renderBargraph() function.
//                                      V

//returns:                           nothing

//                                     END
//_______________________________________________________________________________________________________________//
function clickedPic(e) {
  //1.
  if (allClicks < surveyLimit) {
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].name === e.target.alt) {
        imgArray[i].clicked++;
        allClicks++;
        renderImages();
        break;
      }
    }
  }

  //2.
  if (allClicks === surveyLimit) {
    imgOne.removeEventListener('click', clickedPic);
    imgTwo.removeEventListener('click', clickedPic);
    imgThree.removeEventListener('click', clickedPic);
    imgOne.remove();
    imgTwo.remove();
    imgThree.remove();

    renderBargraph();
  }
}

//-------------------------------------Function renderBargraph()-------------------------------------------//
//Parameters://
//none//

//Local Variables
//- var productNameArray - array used to store the names of all the products to be labeled in the bargraph
//- var totalClicksArray - array used to store the total times the user clicked each product
//- var totalViewsArray - array used to store the total times each product was displayed on screen
//- var data1ColorArray - array used to store the color of the bar graph element for the # of clicks
//- var data2ColorArray - array used to store the color of the bar graph element for the # of views
//- var ctx - this is a reference to our chart's id in index.html

//1. First, the arrays are filled with their respective product information from this round we just completed. All color bars are consistent for each category.
//                                      V

//2.  the bargraph is created as a new object literal.
//                                      V

//3. ctx is assigned the value of the html canvas with the id #results. all the font elements are customized, then the bargraph object is rendered on the page.
//                                      V

//4. the new imgArray (and its property totals) are stringified to JSON format then stored in the local storage for future uses of the site.
//                                      V

//returns:                           nothing

//                                     END
//_______________________________________________________________________________________________________________//
function renderBargraph() {
  //local variables
  var productNameArray = [];
  var totalClicksArray = [];
  var totalViewsArray = [];
  var data1ColorArray = [];
  var data2ColorArray = [];

  //1.
  for (var k = 0; k < imgArray.length; k++) {
    productNameArray.push(imgArray[k].name);
    totalClicksArray.push(imgArray[k].clicked);
    totalViewsArray.push(imgArray[k].viewed);
    data1ColorArray.push('rgba(255, 180, 76, 1)');
    data2ColorArray.push('rgba(54, 200, 235, 1)');
  }

  //2.
  var barGraphObject = {
    type: 'horizontalBar',
    data: {
      labels: productNameArray,
      datasets: [{
        label: '# of Clicks',
        data: totalClicksArray,
        backgroundColor: data1ColorArray,
        borderColor: data1ColorArray,
        borderWidth: 1
      }, {
        label: '# of Total Views',
        data: totalViewsArray,
        backgroundColor: data2ColorArray,
        borderColor: data2ColorArray,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  //3.
  var ctx = document.getElementById('results').getContext('2d');
  Chart.defaults.global.defaultFontStyle = 'bold';//eslint-disable-line
  Chart.defaults.global.defaultFontColor = 'white';//eslint-disable-line
  Chart.defaults.global.defaultFontSize = 30;//eslint-disable-line
  var chart1 = new Chart(ctx, barGraphObject);//eslint-disable-line

  //4.
  imgArray = JSON.stringify(imgArray);

  localStorage.setItem('productArray', imgArray);
}

//it begins....
renderImages();
