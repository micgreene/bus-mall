'use strict';

var imgArray = [];

var imgOne = document.getElementById('image-one');
var imgTwo = document.getElementById('image-two');
var imgThree = document.getElementById('image-three');

var allClicks = 0;
var surveyLimit = 25;

//creates image
function Picture(name, src) {
  this.viewed = 0;
  this.clicked = 0;
  this.src = src;
  this.name = name;
  this.used = false;

  imgArray.push(this);
}
//('name of new Picture object', image file path)
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

function renderImages() {
  var randImgOne = imgArray[mathRand(imgArray.length)];
  var randImgTwo = imgArray[mathRand(imgArray.length)];
  var randImgThree = imgArray[mathRand(imgArray.length)];

  while (randImgOne === randImgTwo || randImgOne === randImgThree || randImgTwo === randImgThree) {
    randImgTwo = imgArray[mathRand(imgArray.length)];
    randImgThree = imgArray[mathRand(imgArray.length)];
  }

  imgOne.src = randImgOne.src;
  imgTwo.src = randImgTwo.src;
  imgThree.src = randImgThree.src;

  imgOne.alt = randImgOne.name;
  imgTwo.alt = randImgTwo.name;
  imgThree.alt = randImgThree.name;

  for(var i = 0; i < imgArray.length; i++){
    if(imgOne.alt === imgArray[i].name || imgTwo.alt === imgArray[i].name || imgThree.alt === imgArray[i].name){
      imgArray[i].viewed++;
    }
  }
}

function mathRand(max) {
  return Math.floor(Math.random() * max);
}

imgOne.addEventListener('click', clickedPic);
imgTwo.addEventListener('click', clickedPic);
imgThree.addEventListener('click', clickedPic);

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
renderImages();
