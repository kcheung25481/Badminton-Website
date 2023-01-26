// Create variables to store user input
let price;
let skillLevel;
let productType;

// Create array of objects for each of the different racquets
const products = [
  {
    name: 'Yonex Nanoflare 001 Feel',
    price: 65,
    skillLevel: 'beginner',
    productType: 'light'
  },
  {
    name: 'Yonex Astrox 99 Game',
    price: 100,
    skillLevel: 'beginner',
    productType: 'balanced'
  },
  {
    name: 'Yonex Duora Z Strike',
    price: 270,
    skillLevel: 'advanced',
    productType: 'head heavy'
  },
  {
    name: 'Yonex AstroX VTZF2',
    price: 180,
    skillLevel: 'intermediate',
    productType: 'head heavy'
  },
  {
    name: 'Yonex Arcsaber 11',
    price: 200,
    skillLevel: 'advanced',
    productType: 'balanced'
  },
  {
    name: 'Yonex Arcsaber 10',
    price: 150,
    skillLevel: 'advanced',
    productType: 'balanced'
  },
];


// Buttons for skill level
const beginnerButton = document.getElementById('beginner-button');
beginnerButton.addEventListener('click', function () {
  skillLevel = 'beginner';

  // Remove selected class from other buttons
  intermediateButton.classList.remove('selected');
  advancedButton.classList.remove('selected');
  // Add selected class to this button
  beginnerButton.classList.add('selected');
});

const intermediateButton = document.getElementById('intermediate-button');
intermediateButton.addEventListener('click', function () {
  skillLevel = 'intermediate';

  // Remove selected class from other buttons
  beginnerButton.classList.remove('selected');
  advancedButton.classList.remove('selected');
  // Add selected class to this button
  intermediateButton.classList.add('selected');
});

const advancedButton = document.getElementById('advanced-button');
advancedButton.addEventListener('click', function () {
  skillLevel = 'advanced';

  // Remove selected class from other buttons
  beginnerButton.classList.remove('selected');
  intermediateButton.classList.remove('selected');
  // Add selected class to this button
  advancedButton.classList.add('selected');
});

// Button for type of racquet
const lightButton = document.getElementById('light-button');
lightButton.addEventListener('click', function () {
  productType = 'light';

  // Remove selected class from other buttons
  balancedButton.classList.remove('selected');
  headheavyButton.classList.remove('selected');
  // Add selected class to this button
  lightButton.classList.add('selected');
});

const balancedButton = document.getElementById('balanced-button');
balancedButton.addEventListener('click', function () {
  productType = 'balanced';

  // Remove selected class from other buttons
  lightButton.classList.remove('selected');
  headheavyButton.classList.remove('selected');
  // Add selected class to this button
  balancedButton.classList.add('selected');
});

const headheavyButton = document.getElementById('headheavy-button');
headheavyButton.addEventListener('click', function () {
  productType = 'head heavy';

  // Remove selected class from other buttons
  lightButton.classList.remove('selected');
  balancedButton.classList.remove('selected');
  // Add selected class to this button
  headheavyButton.classList.add('selected');
});

// Input field for price
const priceInput = document.getElementById('price-input');
priceInput.addEventListener('input', function () {
  price = priceInput.value;
});

// Buttons for skill level
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function () {
  findBestProduct(price, skillLevel, productType);
});

// Function that finds the best product for the user depending on the variables selected
function findBestProduct(price, skillLevel, productType) {
  // Initialize a variable to store the best product
  let bestProduct = null;

  // Loop through each product in the products array
  for (let i = 0; i < products.length; i++) {
    // Get the current product
    const product = products[i];

    // Debug
    console.log(products.length);

    // Check if the current product in the array matches the variables the user has selected
    if (product.price <= price && product.skillLevel === skillLevel && product.productType === productType) {
      // Set best product if product is null
      if (bestProduct === null) {
        bestProduct = product;
      }// Set product if user can purchase a better racquet with budget
      else if (product.price > bestProduct.price) {
        bestProduct = product;
      }
    }
  }
  // Debug
  console.log(bestProduct);
  displayResult(bestProduct);
}

// Function to display the resulting best product
function displayResult(bestProduct) {
  let message;

  // Get the element where the message should be displayed
  const resultDiv = document.getElementById('result');

  // Check if the bestProduct variable is not null
  if (bestProduct !== null) {
    // Create a message to display the best product's name and price
    message = `The best product for you is ${bestProduct.name} with a price of $${bestProduct.price}.`;    
  }else{
    // Create a message to display there is no product found
    message = `There is no such product with the requested specifications. Please try again with new parameters`;  
  }

  // Set the message as the innerHTML of the resultDiv element
  resultDiv.innerHTML = message;
}
