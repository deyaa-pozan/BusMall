'use strict';

let leftImageElement = document.getElementById('left-image');
let centerImageElement = document.getElementById('center-image');
let rightImageElement = document.getElementById('right-image');

let leftIndex;
let centerIndex;
let rightIndex;
let showButton = document.getElementById("btn");
let rounds = 25;
let arrOfNames = [];
let arrOfVotes = [];

let countsClick = 0;

function ProductImage(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shown = 0;
    arrOfNames.push(this.name)
        // If this item exists in localstorg don't add it
    if (JSON.parse(localStorage.getItem('Product').includes(this))) {
        savingProduct()
    }





}

let allProducts = []
allProducts.length = 19
allProducts.fill({ shown: 0, votes: 0 })
if (localStorage.getItem('Product') == null) {
    localStorage.setItem('Product', allProducts);
}
allProducts = [
    new ProductImage('bag', 'images/bag.jpg'),
    new ProductImage('banana', 'images/banana.jpg'),
    new ProductImage('bathroom', 'images/bathroom.jpg'),
    new ProductImage('boots', 'images/boots.jpg'),
    new ProductImage('breakfast', 'images/breakfast.jpg'),
    new ProductImage('chair', 'images/chair.jpg'),
    new ProductImage('cthulhu', 'images/cthulhu.jpg'),
    new ProductImage('dog-duck', 'images/dog-duck.jpg'),
    new ProductImage('dragon', 'images/dragon.jpg'),
    new ProductImage('pen', 'images/pen.jpg'),
    new ProductImage('pet-sweep', 'images/pet-sweep.jpg'),
    new ProductImage('scissors', 'images/scissors.jpg'),
    new ProductImage('shark', 'images/shark.jpg'),
    new ProductImage('sweep', 'images/sweep.png'),
    new ProductImage('tauntaun', 'images/tauntaun.jpg'),
    new ProductImage('unicorn', 'images/unicorn.jpg'),
    new ProductImage('usb', 'images/usb.gif'),
    new ProductImage('water-can', 'images/water-can.jpg'),
    new ProductImage('wine-glass', 'images/wine-glass.jpg')
];


function savingProduct() {
    let convertedArr = JSON.stringify(allProducts);

    localStorage.setItem('Product', convertedArr);


}

function setvotes(index) {
    let votesLocal = JSON.parse(localStorage.getItem('Product'))
    votesLocal[index].votes++;
    localStorage.setItem('Product', JSON.stringify(votesLocal));

}

function setshown(indexl, indexc, indexr) {
    let shownLocal = JSON.parse(localStorage.getItem('Product'))
    shownLocal[indexl].shown++;
    shownLocal[indexc].shown++;
    shownLocal[indexr].shown++;
    localStorage.setItem('Product', JSON.stringify(shownLocal));


}



function indexImg(left, center, right) {

    leftIndex = generateRandomIndex();
    centerIndex = generateRandomIndex();
    rightIndex = generateRandomIndex();

    while (leftIndex === left || leftIndex === center || leftIndex === right || centerIndex === left || centerIndex === center || centerIndex === right || rightIndex === left || rightIndex === center || rightIndex === right) {
        leftIndex = generateRandomIndex();
        centerIndex = generateRandomIndex();
        rightIndex = generateRandomIndex();
    }
}

function displayThreeImages() {

    indexImg(leftIndex, centerIndex, rightIndex)

    while (leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex) {
        indexImg(leftIndex, centerIndex, rightIndex)
    }


    leftImageElement.setAttribute('src', allProducts[leftIndex].source);
    centerImageElement.src = allProducts[centerIndex].source;
    rightImageElement.src = allProducts[rightIndex].source;
    setshown(leftIndex, centerIndex, rightIndex);
    // ProductImage.allProducts[leftIndex].shown++
    //     ProductImage.allProducts[centerIndex].shown++
    //     ProductImage.allProducts[rightIndex].shown++


}
displayThreeImages();


function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * allProducts.length);
    return randomIndex;

}


leftImageElement.addEventListener('click', handleClicking);
centerImageElement.addEventListener('click', handleClicking);
rightImageElement.addEventListener('click', handleClicking);

function handleClicking(event) {
    countsClick++;

    if (rounds >= countsClick) {

        if (event.target.id === 'left-image') {
            setvotes(leftIndex)
                // ProductImage.allProducts[leftIndex].votes++;
                // arrOfVotes.push(ProductImage.allProducts[leftIndex].votes)

        } else if (event.target.id === 'right-image') {
            setvotes(rightIndex)
                // ProductImage.allProducts[rightIndex].votes++;
                // arrOfVotes.push(ProductImage.allProducts[rightIndex].votes)

        } else if (event.target.id === 'center-image') {
            setvotes(centerIndex)
                // ProductImage.allProducts[centerIndex].votes++;
                // arrOfVotes.push(ProductImage.allProducts[centerIndex].votes)

        }
        displayThreeImages();
    } else {
        showButton.style.display = "block"
        showButton.style.backgroundColor = "green"
        showButton.onclick = function() {
            gettingList()
            gettingChart()


        };

        leftImageElement.removeEventListener('click', handleClicking);
        centerImageElement.removeEventListener('click', handleClicking);
        rightImageElement.removeEventListener('click', handleClicking);

    }

}


let arrOfSeen = [];

function gettingList() {
    let ul = document.getElementById('unList');
    for (let i = 0; i < allProducts.length; i++) {
        // arrOfSeen.push(ProductImage.allProducts[i].shown);
        let li = document.createElement('li');
        ul.appendChild(li);
        let localArray = JSON.parse(localStorage.getItem('Product'))
        let arrOfVotes = localArray.map(x => x.votes);
        let arrOfSeen = localArray.map(x => x.shown);
        li.textContent = `${allProducts[i].name} has ${arrOfVotes[i]} Votes and ${arrOfSeen[i]} shown`;
    }

}


function gettingChart() {

    let localArray = JSON.parse(localStorage.getItem('Product'))
    let arrOfVotes = localArray.map(x => x.votes);
    let arrOfSeen = localArray.map(x => x.shown);

    let ctx = document.getElementById('myChart')
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: arrOfNames,
            datasets: [{
                label: '# of Votes',
                data: arrOfVotes,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                ],
                borderWidth: 1
            }, {
                label: '# of Seen',
                data: arrOfSeen,
                backgroundColor: [
                    'rgba(255, 0, 0)',
                ],
                borderWidth: 2
            }]
        },
    });
}