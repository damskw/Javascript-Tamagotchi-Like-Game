const mainGameContainer = document.querySelector(".main-game-container");
const menuContainer = document.querySelector(".menu-container");
const menuBar = document.querySelector(".menu-bar");
const menuOptions = document.querySelectorAll(".menu-content > div");
const menuTitle = document.querySelector("#menu-bar");
const gameContent = document.querySelector(".game-content");
const statusBar = document.querySelector(".top-bar-game-content");
const petBody = document.querySelector(".pet-body");
const bottomBar = document.querySelector(".bottom-bar-game-content");
const actionButtons = document.querySelectorAll(".action-button");
const inventoryBar = document.querySelector(".inventory-bar");
const inventoryBarTitle = document.querySelector("#inventory-bar");




const game = {
    init: function () {
        undragImages();
        initGame();
        initDragAndDrop();
    },
    running: function () {
        setPetHunger();
    },
    end: function () {
        endGame();
    }
}

const gameEnvironment = {
    dragged: null,
    inventoryItems: null,
    inventoryContainer: null,
    petBackground: null,
    inGameMessage: null,
}

const pet = {
    happiness: 0,
    sleepiness: 0,
    cleanliness: 0,
    hunger: 0,
    needs: 0,
}

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)

}

function undragImages() {
    const actionImages = document.querySelectorAll(".action-button > img");
    actionImages.forEach(image => {
        image.setAttribute("draggable", false);
    })
    const statusImages = document.querySelectorAll(".status-slot > img");
    statusImages.forEach(image => {
        image.setAttribute("draggable", false);
    })
    const petImage = document.querySelector(".pet-body > img");
    petImage.setAttribute("draggable", false);
}

function initDragAndDrop() {
    initElements();
    initDragEvents();
}


function initElements() {
    gameEnvironment.inventoryContainer = document.querySelector(".inventory-items");
    gameEnvironment.inventoryItems = document.querySelectorAll(".inventory-item");
    gameEnvironment.petBackground = document.querySelector(".pet-game-content");
    gameEnvironment.inGameMessage = document.querySelector("#in-game-message");;
}

function initDragEvents() {
    gameEnvironment.inventoryItems.forEach(function (card) {
        initDraggable(card);
    })
    initDropZone(gameEnvironment.petBackground);
    initDropBack(gameEnvironment.inventoryContainer);
}

function initDropZone(element) {
    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("dragleave", handleDragLeave);
    element.addEventListener("drop", handleDrop);
}

function initDropBack(element) {
    element.addEventListener("dragover", handleBackDragOver);
    element.addEventListener("drop", handleBackDrop);
}


function handleBackDragOver(e) {

}

function handleBackDrop(e) {

}

function handleDragStart(e) {
    gameEnvironment.dragged = e.currentTarget;
    gameEnvironment.dragged.style.scale = '1.25';
}

function handleDragEnd(e) {
    gameEnvironment.dragged.style.scale = '1';
    gameEnvironment.dragged = null;
    restorePetBackgroundDefaults();
}


function initDraggable(item) {
    item.setAttribute("draggable", true);
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
}

function handleDragEnter(e) {

}

function handleDragOver(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    dropzone.style.border = "4px solid green";
}

function handleDragLeave(e) {
    const dropzone = e.currentTarget;
    restorePetBackgroundDefaults();
}

function handleDrop(e) {
    e.preventDefault();
    gameEnvironment.inGameMessage.style.visibility = "visible";
    gameEnvironment.inGameMessage.innerText = "You've fed the pet!"
    setTimeout(clearInGameMessage, 5000);
}


function restorePetBackgroundDefaults() {
    gameEnvironment.petBackground.style.border = "4px solid black";
}

function clearInGameMessage() {
    gameEnvironment.inGameMessage.innerText = ".";
    gameEnvironment.inGameMessage.style.visibility = "hidden";
}


function setPetHunger() {

}

function endGame() {

}

// function refreshTime() {
//     const timeDisplay = document.querySelector("#time");
//     const dateString = new Date().toLocaleString();
//     const formattedString = dateString.replace(", ", " - ");
//     timeDisplay.textContent = formattedString;
// }

// setInterval(refreshTime, 1000);

game.init();
