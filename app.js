'use strict';

///////////////////////////////////////////////////Lab 12 - Codefellows 201////////////////////////////////////////////////////////////

//*********************************************"Add a Chart to Your BusMall App"**************************************************//

//1.this app constructs 3 objects that generate images in groups of 3 with the renderApp() function.
//                                             V

//2.The event handler clickedPic() then listens for which image the user clicks and removes the current images from the screen (incrementing the properties clicked for the selected image and viewed for all displayed in th process)
//                                             V

//3. This proceeds 25 times until the user selects the final image.
//                                             V

//4. After 25 rounds, the images are removed from the screen and a bar graph will be rendered in its place to display the survey results to the user and (eventually) adminstrator.
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
  for(var j = 0; j < imgArray.length; j++){
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
  for(var i = 0; i < imgArray.length; i++){
    if(imgOne.alt === imgArray[i].name || imgTwo.alt === imgArray[i].name || imgThree.alt === imgArray[i].name){
      imgArray[i].viewed++;
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
function clickedPic(e) {
  allClicks++;
  if (allClicks <= surveyLimit) {
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].name === e.target.alt) {
        imgArray[i].clicked++;
        renderImages();
        break;
      }
    }
  }
  else if (allClicks >= surveyLimit) {
    imgOne.removeEventListener('click', clickedPic);
    imgTwo.removeEventListener('click', clickedPic);
    imgThree.removeEventListener('click', clickedPic);
    imgOne.remove();
    imgTwo.remove();
    imgThree.remove();

    var report = document.getElementById('surveyResults');
    var h2Element = document.createElement('h2');
    h2Element.style.color = 'white';
    h2Element.style.fontSize = '50px';
    h2Element.style.lineHeight = '150%';
    var listElement = document.createElement('ul');
    h2Element.textContent = 'Here Are Your Survey Results:';
    report.appendChild(h2Element);
    report.appendChild(listElement);

    //for loop runs through imgArray[], and lists their individual results in a list
    for (var j = 0; j < imgArray.length; j++) {
      var liElement = document.createElement('li');
      liElement.textContent = 'Product Name: ' + imgArray[j].name + ' was selected ' + imgArray[j].clicked + ' times and was viewed ' + imgArray[j].viewed + ' times.';
      listElement.appendChild(liElement);
      listElement.style.color = 'white';
      listElement.style.fontSize = '25px';
      listElement.style.lineHeight = '150%';
    }
  }
}

function renderBargraph(){

}
//it begins....
renderImages();
