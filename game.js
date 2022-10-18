const petHungerLoseValue = 100;
const petCleanlinessLoseValue = 0;
const petNeedsLoseValue = 100;
const foodAttribute = "food";
const minHungerValueToFeed = 20;
const fedTimesToEvolve = 5;
const minCleanlinessValueToClean = 80;
const removeHungerValue = 10;
const addCleanlinessValue = 10;




const game = {
    init: function () {
        setPetStartingValues();
        initMenuButtons();
        initActionButtons();
        undragImages();
        initDragAndDrop();
        shuffleInventoryItems();
        game.running();
    },
    running: function () {
        setPetHunger();
        // setPetCleanliness();
    },
    end: function (message) {
        endGame(message);
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
    showerButton: null,
    sleepButton: null,
    gameButton: null,
    toiletButton: null,
    walkButton: null,
}

const pet = {
    happiness: 0,
    sleepiness: 0,
    cleanliness: 0,
    hunger: 0,
    needs: 0,
    stage: 0,
    fedTimes: 0,
}

const player = {
    name: null,
}


function initMenuButtons() {
    assignMenuButtons();
    activateMenuButtons();
    addTestEndGameButton();
}

function initActionButtons() {
    assignActionButtons();
    activateActionButtons();
}


function assignMenuButtons() {
    gameWindow.setDayButton = document.querySelector("#set-day-button");
    gameWindow.setNightButton = document.querySelector("#set-night-button");
    gameWindow.musicButton = document.querySelector("#music-button");
    gameWindow.resetButton = document.querySelector("#reset-button");
}


function activateMenuButtons() {
    gameWindow.resetButton.addEventListener("click", resetGame);
    gameWindow.setDayButton.addEventListener("click", setDay);
    gameWindow.setNightButton.addEventListener("click", setNight);
}

function assignActionButtons() {
    gameWindow.walkButton = document.querySelector("#walk-button");
    gameWindow.toiletButton = document.querySelector("#toilet-button");
    gameWindow.gameButton = document.querySelector("#game-button");
    gameWindow.sleepButton = document.querySelector("#sleep-button");
    gameWindow.showerButton = document.querySelector("#shower-button");
}


function activateActionButtons() {
    gameWindow.showerButton.addEventListener("click", cleanPet);
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
    pet.happiness = 100;
    pet.sleepiness = 0;
    pet.cleanliness = 100;
    pet.hunger = 0;
    pet.needs = 0;
    pet.stage = 0;
    pet.fedTimes = 0;
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

function shuffleInventoryItems() {
    const mixedItems = gameEnvironment.inventoryContainer.children;

    for (let i = mixedItems.length; i >= 0; i--) {
        gameEnvironment.inventoryContainer.appendChild(mixedItems[(Math.random() * i) | 0]);
    }
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
    console.log(e.currentTarget);
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
    const draggedAttribute = gameEnvironment.dragged.getAttribute("type");
    if (draggedAttribute == foodAttribute && pet.hunger >= minHungerValueToFeed) {
        gameEnvironment.inGameMessage.style.visibility = "visible";
        gameEnvironment.inGameMessage.innerText = "You've fed the pet!";
        setTimeout(clearInGameMessage, 5000);
        pet.hunger -= removeHungerValue;
        updatePetHungerBar(pet.hunger);
        pet.fedTimes += 1;
        if (pet.fedTimes >= fedTimesToEvolve) {
            pet.stage += 1;
            pet.fedTimes = 0;
        }
    } else if (draggedAttribute == foodAttribute && pet.hunger < minHungerValueToFeed) {
        gameEnvironment.inGameMessage.style.visibility = "visible";
        gameEnvironment.inGameMessage.innerText = "Pet is not hungry yet.";
        setTimeout(clearInGameMessage, 5000);
    }
    restorePetBackgroundDefaults();
}


function cleanPet() {
    if (pet.cleanliness <= minCleanlinessValueToClean) {
        pet.cleanliness += addCleanlinessValue;
        gameEnvironment.inGameMessage.style.visibility = "visible";
        gameEnvironment.inGameMessage.innerText = "You've cleaned your pet.";
        setTimeout(clearInGameMessage, 5000);
    } else {
        gameEnvironment.inGameMessage.style.visibility = "visible";
        gameEnvironment.inGameMessage.innerText = "Pet is not dirty yet.";
        setTimeout(clearInGameMessage, 5000);
    }
}


function restorePetBackgroundDefaults() {
    gameEnvironment.petBackground.style.border = "4px solid black";
    gameEnvironment.petBackground.style.opacity = "100%";
}

function clearInGameMessage() {
    gameEnvironment.inGameMessage.innerText = ".";
    gameEnvironment.inGameMessage.style.visibility = "hidden";
}

function setNight() {
    const body = document.body;
    body.style.backgroundColor = "black";
}

function setDay() {
    const body = document.body;
    body.style.backgroundColor = "white";
}

function updatePetHungerBar(value) {
    const petHungerBar = document.querySelector("#hunger-bar");
    petHungerBar.style.width = `${value}%`;
    if (value < 50) {
        petHungerBar.style.background = "green";
    } else if (value >= 50 && value < 80) {
        petHungerBar.style.background = "yellow";
    } else if (value >= 80) {
        petHungerBar.style.background = "red";
    }
}

function updatePetCleanlinessBar(value) {
    const petCleanlinessBar = document.querySelector("");
    petCleanlinessBar.style.width = `${value}%`;
    if (value < 30) {
        petHungerBar.style.background = "red";
    } else if (value >= 30 && value < 80) {
        petHungerBar.style.background = "yellow";
    } else if (value >= 80) {
        petHungerBar.style.background = "green";
    }
}


function setPetHunger() {
    petHungerInterval = setInterval(() => {
        let hungerAddValue = (Math.random() * 6) | 0;
        pet.hunger += hungerAddValue;
        updatePetHungerBar(pet.hunger);
        if (pet.hunger >= petHungerLoseValue) {
            const endGameMessage = "Pet was too hungry, you lost."
            game.end(endGameMessage);
            return;
        }
        // gameEnvironment.inGameMessage.style.visibility = "visible";
        // gameEnvironment.inGameMessage.innerText = `DEBUG ONLY: Pet hunger: ${pet.hunger}`;
    }, 2000);
}


function setPetCleanliness() {
    petCleanlinessInterval = setInterval(() => {
        let cleanlinessRemoveValue = (Math.random() * 6) | 0;
        pet.cleanliness -= cleanlinessRemoveValue;
        if (pet.cleanliness <= petCleanlinessLoseValue) {
            const endGameMessage = "Your pet was too dirty, you lost.";
            game.end(endGameMessage);
            return;
        }
        // gameEnvironment.inGameMessage.style.visibility = "visible";
        // gameEnvironment.inGameMessage.innerText = `DEBUG ONLY: Pet cleanliness: ${pet.cleanliness}`;
    }, 2000);
}


function clearOnRunningIntervals() {
    clearInterval(petHungerInterval);
    clearInterval(petCleanlinessInterval);
}

function endGame(message) {
    gameEnvironment.inGameMessage.style.visibility = "visible";
    gameEnvironment.inGameMessage.innerText = message;
    gameEnvironment.petBackground.style.border = "4px solid red";
    gameEnvironment.petBackground.style.opacity = "50%";
    removeDragEvents();
    removeDropBack(gameEnvironment.inventoryContainer);
    removeDropZone(gameEnvironment.petBackground);
    clearOnRunningIntervals();
}


game.init();