// All images and links used on this page are taken from https://bwfthomasubercups.bwfbadminton.com/

// Array to store images
const images = ["images/kimsimnews.png", "images/tiebreakernews.png", "images/top15news.png"];

// Array to store links to corresponding images
const links = ["https://bwfthomasubercups.bwfbadminton.com/news-single/2022/06/06/kim-and-sim-repay-coach-sungs-faith/", 
              "https://bwfthomasubercups.bwfbadminton.com/news-single/2022/06/01/the-tie-breaker-two-approaches/", 
              "https://bwfthomasubercups.bwfbadminton.com/news-single/2022/05/30/alex-lanier-hope-to-break-into-top-15-this-season/"];

// Get HMTL elements for display
const imageContainer = document.getElementById("image-container");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

// Index to parse through arrays
let currentIndex = 0;

// Function to display the current image in the image container
function displayImage() {

  // Get image from array
  const currentImage = images[currentIndex];

  // Debug console
  console.log(currentImage);

  // Set the image inside HTML attribute
  imageContainer.setAttribute("src", currentImage);
}

// Function to move to next image
function nextImage() {

  // Increase index in images array
  currentIndex++;

  // Check if index is out of bounds, loop back to 0 if it is the case
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  // Call function to display image
  displayImage();
}

// Function to move to previous image
function previousImage() {

  // Decrement index in images array
  currentIndex--;

  // Check if index is out of bounds, loop back to 0 if it is the case
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }

  // Display the current image
  displayImage();
}

// Function to open link in new tab
function toLink(){
  window.open(links[currentIndex], '_blank');
}

// Add event listeners to buttons that allows user to cycle through images
leftButton.addEventListener("click", previousImage);
rightButton.addEventListener("click", nextImage);

// Add an event listener to the image container that redirects to corresponding link
imageContainer.addEventListener("click", toLink);

// Automatically move the slides every 15 seconds
setInterval(nextImage, 15000);

// Display the current image
displayImage();
