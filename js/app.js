'use strict';

let leftImageElement = document.getElementById('left-image');
let centerImageElement = document.getElementById('center-image');
let rightImageElement = document.getElementById('right-image');

let leftIndex;
let centerIndex;
let rightIndex;
let showButton = document.getElementById("btn");
let rounds = 25;

let countsClick = 0;

function ProductImage(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    ProductImage.allProducts.push(this);
}

ProductImage.allProducts = [];

new ProductImage('bag', 'images/bag.jpg');
new ProductImage('banana', 'images/banana.jpg');
new ProductImage('bathroom', 'images/bathroom.jpg');
new ProductImage('boots', 'images/boots.jpg');
new ProductImage('breakfast', 'images/breakfast.jpg');
new ProductImage('chair', 'images/chair.jpg');
new ProductImage('cthulhu', 'images/cthulhu.jpg')
new ProductImage('dog-duck', 'images/dog-duck.jpg');
new ProductImage('dragon', 'images/dragon.jpg');
new ProductImage('pen', 'images/pen.jpg');
new ProductImage('pet-sweep', 'images/pet-sweep.jpg');
new ProductImage('scissors', 'images/scissors.jpg');
new ProductImage('shark', 'images/shark.jpg');
new ProductImage('sweep', 'images/sweep.png');
new ProductImage('tauntaun', 'images/tauntaun.jpg');
new ProductImage('unicorn', 'images/unicorn.jpg');
new ProductImage('usb', 'images/usb.gif');
new ProductImage('water-can', 'images/water-can.jpg');
new ProductImage('wine-glass', 'images/wine-glass.jpg');


function indexImg() {
    leftIndex = generateRandomIndex();
    centerIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();

}

function displayThreeImages() {
    indexImg()

    while (leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex) {
        indexImg()
    }

    leftImageElement.setAttribute('src', ProductImage.allProducts[leftIndex].source);
    centerImageElement.src = ProductImage.allProducts[centerIndex].source;
    rightImageElement.src = ProductImage.allProducts[rightIndex].source;
    ProductImage.allProducts[leftIndex].shown++
        ProductImage.allProducts[centerIndex].shown++
        ProductImage.allProducts[rightIndex].shown++

}
displayThreeImages();


function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * ProductImage.allProducts.length);
    return randomIndex;

}


leftImageElement.addEventListener('click', handleClicking);
centerImageElement.addEventListener('click', handleClicking);
rightImageElement.addEventListener('click', handleClicking);

function handleClicking(event) {
    countsClick++;

    if (rounds >= countsClick) {

        if (event.target.id === 'left-image') {
            ProductImage.allProducts[leftIndex].votes++;

        } else if (event.target.id === 'right-image') {
            ProductImage.allProducts[rightIndex].votes++;
        } else if (event.target.id === 'center-image') {
            ProductImage.allProducts[centerIndex].votes++;
        }
        displayThreeImages();
    } else {
        showButton.style.display = "block"
        showButton.style.backgroundColor = "green"
        showButton.onclick = function() { gettingList() };
        leftImageElement.removeEventListener('click', handleClicking);
        centerImageElement.removeEventListener('click', handleClicking);
        rightImageElement.removeEventListener('click', handleClicking);
    }

}



function gettingList() {
    let ul = document.getElementById('unList');
    for (let i = 0; i < ProductImage.allProducts.length; i++) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `${ProductImage.allProducts[i].name} has ${ProductImage.allProducts[i].votes} Votes and ${ProductImage.allProducts[i].shown} shown`;
    }

}