# BusMall App

Repo for my Codefellows 201 Lab11 - Lab15b "Bus Mall" 9/3/20

### Note: app.js uses chart.js to display graphs documentation can be found here:
  + [![](https://data.jsdelivr.com/v1/package/npm/chart.js/badge)](https://www.jsdelivr.com/package/npm/chart.js)



## Global Variables:

**var imgArray[]** - an Array to contain all the image objects created by the constructor

**var imgOne** - an html object assigned the value of document.getElementById('image-one');

**var imgTwo** - an html object assigned the value of document.getElementById('image-two');

**var imgThree** - an html object assigned the value of document.getElementById('image-three');

**var allClicks** - maintains a running count of how many rounds the survey has gonne on for, default of 0

**var surveyLimit** - the maximum number of survey rounds, default of 25


## LOGIC FLOW:

**1.** this app constructs 3 objects that generate images in groups of 3 with the **renderApp()** function. If it has been used before it will populate the **imgArray[]** with information from local storage, if not it will create 20 new image objects via the **Picture(name, src)** constructor (hardcoded this way)

**2.** The event handler **clickedPic()** then listens for which image the user clicks and removes the current images from the screen (incrementing the properties clicked for the selected image **(imgArray[0].clicked)** and viewed **(imgArray[0].viewed)** for all displayed during the process)

**3.** This proceeds 25 times (**variable - 'surveyLimit'**) until the user selects the final image.

**4.** After **'surveyLimit'** amount of rounds, the images are removed from the screen and a bar graph will be rendered in its place to display the survey results to the user.

**5.** Total number of clicks and times each image was displayed are stored to local storage for repeated uses of the site to keep a running total of all users who use this machine to survey.

                  END