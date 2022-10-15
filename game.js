const mainGameContainer = document.querySelector(".main-game-container");
const menuContainer = document.querySelector(".menu-container");
const menuBar = document.querySelector(".menu-bar");
const menuOptions = document.querySelectorAll(".menu-content > div");
const menuTitle = document.querySelector("#menu-bar");
const gameContent = document.querySelector(".game-content");
const statusBar = document.querySelector(".top-bar-game-content");
const petBackground = document.querySelector(".pet-game-content");
const petBody = document.querySelector(".pet-body");
const bottomBar = document.querySelector(".bottom-bar-game-content");
const actionButtons = document.querySelectorAll(".action-button");
const inventoryContainer = document.querySelector(".inventory-container");
const inventoryBar = document.querySelector(".inventory-bar");
const inventoryBarTitle = document.querySelector("#inventory-bar");
const inventoryItems = document.querySelectorAll(".inventory-item");




const game = {
    init: function() {
        initGame();
        initDragAndDrop();
    },
    running: function() {
        setPetHunger();
    },
    end: function() {
        endGame();
    }
}

const pet = {
    happiness: 0,
    sleepiness: 0,
    cleanliness: 0,
    needs: 0,
}

function initDragAndDrop () {

}

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)

}

function setPetHunger() {

}

function endGame() {

}

function refreshTime() {
    const timeDisplay = document.querySelector("#time");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
  }
  
setInterval(refreshTime, 1000);

game.init()
