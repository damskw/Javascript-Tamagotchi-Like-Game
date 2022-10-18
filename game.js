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

const petHungerLoseValue = 100;
const petCleanlinessLoseValue = 0;
const petNeedsLoseValue = 100;




const game = {
    init: function () {
        setPetStartingValues();
        initMenuButtons();
        undragImages();
        initDragAndDrop();
        game.running();
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

const gameWindow = {
    setDayButton: null,
    setNightButton: null,
    musicButton: null,
    resetButton: null,
}

const pet = {
    happiness: 100,
    sleepiness: 0,
    cleanliness: 100,
    hunger: 0,
    needs: 0,
}

const player = {
    name: null,
}


function initMenuButtons() {
    assignMenuButtons();
    activateMenuButtons();
    addTestEndGameButton();
}


function assignMenuButtons() {
    gameWindow.setDayButton = document.querySelector("#set-day-button");
    gameWindow.setNightButton = document.querySelector("#set-night-button");
    gameWindow.musicButton = document.querySelector("#music-button");
    gameWindow.resetButton = document.querySelector("#reset-button");
}

function activateMenuButtons() {
    gameWindow.resetButton.addEventListener("click", resetGame);
}

function addTestEndGameButton() {
    gameWindow.musicButton.addEventListener("click", game.end);
}


function resetGame() {
    clearInGameMessage();
    restorePetBackgroundDefaults();
    game.init();
}

function setPetStartingValues() {
    pet.happiness = 0;
    pet.sleepiness = 0;
    pet.cleanliness = 0;
    pet.hunger = 0;
    pet.needs = 0;
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

function removeDragEvents() {
    gameEnvironment.inventoryItems.forEach(function (card) {
        removeDraggable(card);
    })
}

function initDropZone(element) {
    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("dragleave", handleDragLeave);
    element.addEventListener("drop", handleDrop);
}

function removeDropZone(element) {
    element.removeEventListener("dragenter", handleDragEnter);
    element.removeEventListener("dragover", handleDragOver);
    element.removeEventListener("dragleave", handleDragLeave);
    element.removeEventListener("drop", handleDrop);
}

function initDropBack(element) {
    element.addEventListener("dragover", handleBackDragOver);
    element.addEventListener("drop", handleBackDrop);
}

function removeDropBack(element) {
    element.removeEventListener("dragover", handleBackDragOver);
    element.removeEventListener("drop", handleBackDrop); 
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

function removeDraggable(item) {
    item.setAttribute("draggable", false);
    item.removeEventListener("dragstart", handleDragStart);
    item.removeEventListener("dragend", handleDragEnd);
}

function handleDragEnter(e) {

}

function handleDragOver(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    dropzone.style.border = "4px solid green";
    dropzone.style.opacity = "75%";
}

function handleDragLeave(e) {
    const dropzone = e.currentTarget;
    restorePetBackgroundDefaults();
}

function handleDrop(e) {
    e.preventDefault();
    gameEnvironment.inGameMessage.style.visibility = "visible";
    gameEnvironment.inGameMessage.innerText = "You've fed the pet!"
    restorePetBackgroundDefaults();
    setTimeout(clearInGameMessage, 5000);
}


function restorePetBackgroundDefaults() {
    gameEnvironment.petBackground.style.border = "4px solid black";
    gameEnvironment.petBackground.style.opacity = "100%";
}

function clearInGameMessage() {
    gameEnvironment.inGameMessage.innerText = ".";
    gameEnvironment.inGameMessage.style.visibility = "hidden";
}


function setPetHunger() {
    petHungerInterval = setInterval(() => {
        pet.hunger += 10;
        gameEnvironment.inGameMessage.style.visibility = "visible";
        gameEnvironment.inGameMessage.innerText = `Pet hunger: ${pet.hunger}`;
    }, 2000);
}


function clearOnRunningIntervals() {
    clearInterval(petHungerInterval);
}

function endGame() {
    gameEnvironment.inGameMessage.style.visibility = "visible";
    gameEnvironment.inGameMessage.innerText = "You've reached critical values, game has ended.";
    gameEnvironment.petBackground.style.border = "4px solid red";
    gameEnvironment.petBackground.style.opacity = "50%";
    removeDragEvents();
    removeDropBack(gameEnvironment.inventoryContainer);
    removeDropZone(gameEnvironment.petBackground);
    clearOnRunningIntervals();
}


game.init();