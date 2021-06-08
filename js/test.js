'use strict';

// target our order form from the html
const orderForm = document.getElementById('orderForm');
const orders = document.getElementById('orders');

// constructor function to create a basic drink
function Coffee(name, size, milk, isHot, drinkType) {
    this.name = name;
    this.size = size;
    this.isHot = isHot;
    this.drinkType = drinkType;
    this.milk = milk;

    // add every drink that gets created into an array
    Coffee.drinks.push(this);
    savingToLs();
}

// set the global array to empty
Coffee.drinks = [];


function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);

    // get all the values from the form
    const drink = event.target;
    const name = drink.name.value;
    const size = drink.size.value;
    const isHot = drink.isHot.value;
    const dType = drink.drinkType.value;
    const milk = drink.milk.value;

    new Coffee(name, size, milk, isHot, dType);
    //Coffe.drinks//[
    // {
    // name:'bashar'
    //}
    //]
    // update the previous orders with the new order
    renderOrders();

}

function savingToLs() {
    // console.log(JSON);
    let convertedArr = JSON.stringify(Coffee.drinks);
    // is the way to communicate to the local storage 
    localStorage.setItem('Order', convertedArr);
    // [Object object] [{name: 'bashar'}] => [{"name":"bashar"}]
}


function gettingOrdersFromLs() {
    let data = localStorage.getItem('Order');
    console.log(data);
    //Null
    let parsedOrder = JSON.parse(data);
    console.log(parsedOrder);
    //Null
    // for the first time i am entering this website it will be null (nothing will be saved in the 
    // LS)
    if (parsedOrder) { // parsedOrder !== Null

        Coffee.drinks = parsedOrder;
        renderOrders();
    }
}

function renderOrders() {
    // clear all my current uls to prevent duplicate information
    orders.textContent = '';

    // go through the array and output the details of each drink in the array                 //Null.length?
    for (let i = 0; i < Coffee.drinks.length; i++) {
        const drinkLI = document.createElement('li');
        let temp;
        if (Coffee.drinks[i].isHot === 'on') {
            temp = 'cold';
        } else {
            temp = 'hot';
        }
        drinkLI.textContent = `${Coffee.drinks[i].name} orderd a ${temp} ${Coffee.drinks[i].size} ${Coffee.drinks[i].drinkType} with ${Coffee.drinks[i].milk}`;
        orders.appendChild(drinkLI);
    }
}

// Add an event listener to the submit button
orderForm.addEventListener('submit', handleSubmit);

gettingOrdersFromLs();