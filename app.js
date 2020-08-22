'use strict';

var imgArray = [];

var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');

//creates image
function Picture(name, src){
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;

  imgArray.push(this);
}
//('name of new Picture object', image file path)
//new Picture('firstImage', src);

function renderImages(){
  var randImgOne = imgArray[mathRand(imgArray.length)];
  var randImgTwo = imgArray[mathRand(imgArray.length)];

  while(randImgOne === randImgTwo){
    randImgTwo = imgArray[mathRand(imgArray.length)];
  }

  imgOne.src = randImgOne.src;
  imgTwo.src = randImgTwo.src;

  imgOne.viewed++;
  imgTwo.viewed++;
}

function mathRand(max) {
  return Math.floor(Math.random() * max);
}

imgOne.addEventListener('click', clickedPic);
imgTwo.addEventListener('click', clickedPic);

function clickedPic(e){
  console.log('clicked');
}

renderImages();
