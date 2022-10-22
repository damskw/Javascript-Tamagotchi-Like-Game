const petHungerLoseValue = 100;
const petCleanlinessLoseValue = 0;
const petNeedsLoseValue = 100;
const petHappinessLoseValue = 0;
const intervalsTime = 5000;
const foodAttribute = "food";
const minHungerValueToFeed = 20;
const fedTimesToEvolve = 5;
const minCleanlinessValueToClean = 80;
const minNeedsValueToUseBathroom = 15;
const removeHungerValue = 10;
const addCleanlinessValue = 10;
const removeNeedsValue = 10;
const addHappinessValue = 10;
const minHappinessValueToEntertain = 90;
const minSleepinessValueToSleep = 30;
const removeSleepinessValue = 30;
const sleepinessValueToLose = 100;




const game = {
    preInit: function() {
        getPlayerName();
        getPetName();
        updatePetAge();
        initGame();
    },
    init: function () {
        changeDisplayOfInventoryItems("visible");
        setPetStartingValues();
        placePetOnGameWindow();
        initMenuButtons();
        initActionButtons();
        undragImages();
        initDragAndDrop();
        shuffleInventoryItems();
        setTimeOfDay();
        game.running();
    },
    running: function () {
        setPetCleanliness();
        setPetHunger();
        setPetHappiness();
        setPetSleepiness();
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
    timeOfDay: null,
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
    age: 0,
}

const player = {
    name: null,
}

function changeDisplayOfInventoryItems(display) {
    const inventoryItems = document.querySelectorAll(".inventory-item > img");
    if (display == "hidden") {
        inventoryItems.forEach(item => {
            item.style.visibility = "hidden";
        })
    } else if (display == "visible") {
        inventoryItems.forEach(item => {
            item.style.visibility = "visible";
        })
    }
}


function setTimeOfDay() {
    gameEnvironment.timeOfDay = "day";
}

function getBoardReady() {
    changeDisplayOfInventoryItems("hidden");
    const startGameButton = document.querySelector("#start-game-button");
    startGameButton.addEventListener("click", game.preInit);
}

function getPlayerName() {
    const playerName = prompt("Please enter your name:")
    const petOwnerInformation = document.querySelector("#pet-owner");
    petOwnerInformation.innerText = "Owner: " + playerName;
}

function getPetName() {
    const petName = prompt("Please name your pet:");
    const petNameInformation = document.querySelector("#pet-name");
    petNameInformation.innerText = "Pet name: " + petName;
}


function initGame() {
    deleteStartButton();
    game.init();
}


function deleteStartButton() {
    const startGameButton = document.querySelector("#start-game-button");
    const startGameButtonParent = document.querySelector(".pet-body");
    startGameButtonParent.removeChild(startGameButton);
}

function updatePetAge() {
    const petAgeInformation = document.querySelector("#pet-age");
    const petAge = pet.stage * 4;
    petAgeInformation.innerText = "Age: " + petAge;
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
    gameWindow.toiletButton.addEventListener("click", usePetBathroom);
    gameWindow.walkButton.addEventListener("click", walkThePet);
    gameWindow.gameButton.addEventListener("click", entertainPet);
    gameWindow.sleepButton.addEventListener("click", putPetToBed);
}

function addTestEndGameButton() {
    gameWindow.musicButton.addEventListener("click", game.end);
}

function placePetOnGameWindow() {
    changePetImage("img/Egg3.png", 1.50);
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
    pet.stage = 1;
    pet.fedTimes = 0;
    pet.age = 0;
    updatePetHappinessBar(pet.happiness);
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
        sendInGameMessage("You've fed the pet!")
        pet.hunger -= removeHungerValue;
        updatePetHungerBar(pet.hunger);
        pet.fedTimes += 1;
        pet.needs += 10;
        updatePetNeedsBar(pet.needs);
        if (pet.fedTimes >= fedTimesToEvolve) {
            pet.stage += 1;
            pet.fedTimes = 0;
            if (pet.stage == 2) {
                updatePetAge();
                sendInGameMessage("Your pet has evolved! Yay!");
                changePetImage("img/cat.png", 2);
            } else if (pet.stage == 3) {
                updatePetAge();
                sendInGameMessage("Your pet has evolved! Yay!");
                changePetImage("img/Pet.png", 1);
            }
        }
    } else if (draggedAttribute == foodAttribute && pet.hunger < minHungerValueToFeed) {
        sendInGameMessage("Pet is not hungry yet.");
    }
    restorePetBackgroundDefaults();
}


function sendInGameMessage(message) {
    gameEnvironment.inGameMessage.style.visibility = "visible";
    gameEnvironment.inGameMessage.innerText = message;
    setTimeout(clearInGameMessage, 5000);
}


function cleanPet() {
    if (pet.cleanliness <= minCleanlinessValueToClean) {
        pet.cleanliness += addCleanlinessValue;
        updatePetCleanlinessBar(pet.cleanliness);
        sendInGameMessage("You've cleaned your pet.")
    } else {
        sendInGameMessage("Pet is not dirty yet.")
    }
}


function putPetToBed() {
    if (pet.sleepiness >= minSleepinessValueToSleep) {
        pet.sleepiness -= removeSleepinessValue;
        updatePetSleepinessBar(pet.sleepiness);
        sendInGameMessage("You've put your pet to bed.")
    } else {
        sendInGameMessage("Pet is not sleepy yet.")
    }
}


function entertainPet() {
    if (pet.happiness <= minHappinessValueToEntertain) {
        pet.happiness += addHappinessValue;
        updatePetHappinessBar(pet.happiness);
        sendInGameMessage("Yay! You've entertainted your pet!")
    } else {
        sendInGameMessage("Pet is too tired, try again later.")
    }
}

function walkThePet() {
    if (pet.happiness <= minHappinessValueToEntertain) {
        pet.happiness += addHappinessValue;
        updatePetHappinessBar(pet.happiness);
        sendInGameMessage("You've taken your pet for a walk!")
        gameEnvironment.petBackground.style.backgroundImage = "url('img/Walk2.png')";
        if (gameEnvironment.timeOfDay == "day") {
            setTimeout(() => {
                gameEnvironment.petBackground.style.backgroundImage = "url('img/background-pet.png')";
            }, 3000);
        } else if (gameEnvironment.timeOfDay == "night") {
            setTimeout(() => {
                gameEnvironment.petBackground.style.backgroundImage = "url('img/background-pet1.png')";
            }, 3000);
        }
    } else {
        sendInGameMessage("Pet is too tired, try again later.")
    }
}

function usePetBathroom() {
    if (pet.needs >= minNeedsValueToUseBathroom) {
        pet.needs -= removeNeedsValue;
        updatePetNeedsBar(pet.needs);
        sendInGameMessage("Your pet has used the bathroom.")
    } else {
        sendInGameMessage("Pet doesn't need to use bathroom yet.")
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
    body.style.backgroundImage = "url('img/Night-background.jpg')";
    gameEnvironment.timeOfDay = "night";
    gameEnvironment.petBackground.style.backgroundImage = "url('img/background-pet1.png')";

}

function setDay() {
    const body = document.body;
    body.style.backgroundImage = "url('img/Day-background.png')";
    gameEnvironment.timeOfDay = "day";
    gameEnvironment.petBackground.style.backgroundImage = "url('img/background -pet.png')";
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



function updatePetSleepinessBar(value) {
    const petSleepinessBar = document.querySelector("#sleep-bar");
    petSleepinessBar.style.width = `${value}%`;
    if (value < 50) {
        petSleepinessBar.style.background = "green";
    } else if (value >= 50 && value < 80) {
        petSleepinessBar.style.background = "yellow";
    } else if (value >= 80) {
        petSleepinessBar.style.background = "red";
    }
}



function updatePetCleanlinessBar(value) {
    const petCleanlinessBar = document.querySelector("#clean-bar");
    petCleanlinessBar.style.width = `${value}%`;
    if (value < 30) {
        petHungerBar.style.background = "red";
    } else if (value >= 30 && value < 80) {
        petHungerBar.style.background = "yellow";
    } else if (value >= 80) {
        petHungerBar.style.background = "green";
    }
}

function updatePetHappinessBar(value) {
    const happinessIcon = document.querySelector("#happiness-icon");
    const petHappinessBar = document.querySelector("#happiness-bar");
    petHappinessBar.style.width = `${value}%`;
    if (value < 30) {
        petHappinessBar.style.background = "red";
        happinessIcon.src = "img/madStatus.png";
    } else if (value >= 30 && value < 80) {
        petHappinessBar.style.background = "yellow";
        happinessIcon.src = "img/midStatus.png";
    } else if (value >= 80) {
        petHappinessBar.style.background = "green";
        happinessIcon.src = "img/happyStatus.png";
    }
}


function updatePetNeedsBar(value) {
    const petNeedsBar = document.querySelector("#toilet-bar");
    petNeedsBar.style.width = `${value}%`;
    if (value < 50) {
        petNeedsBar.style.background = "green";
    } else if (value >= 50 && value < 80) {
        petNeedsBar.style.background = "yellow";
    } else if (value >= 80 && value < 100) {
        petNeedsBar.style.background = "red";
    } else if (value >= 100) {
        const endGameMessage = "Your pet wanted to use bathroom badly but you didn't let him."
        game.end(endGameMessage);
        return;
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
    }, intervalsTime);
}

function setPetSleepiness() {
    petSleepinessInterval = setInterval(() => {
        let sleepinessAddValue = (Math.random() * 6) | 0;
        pet.sleepiness += sleepinessAddValue;
        updatePetSleepinessBar(pet.sleepiness);
        if (pet.sleepiness >= sleepinessValueToLose) {
            const endGameMessage = "Your pet fell into a coma."
            game.end(endGameMessage);
            return;
        }
    }, intervalsTime);
}


function setPetCleanliness() {
    petCleanlinessInterval = setInterval(() => {
        let cleanlinessRemoveValue = (Math.random() * 6) | 0;
        pet.cleanliness -= cleanlinessRemoveValue;
        updatePetCleanlinessBar(pet.cleanliness);
        if (pet.cleanliness <= petCleanlinessLoseValue) {
            const endGameMessage = "Your pet was too dirty, you lost.";
            game.end(endGameMessage);
            return;
        }
    }, intervalsTime);
}

function setPetHappiness() {
    petHappinessInterval = setInterval(() => {
        let hapinessRemoveValue = (Math.random() * 6) | 0;
        pet.happiness -= hapinessRemoveValue;
        updatePetHappinessBar(pet.happiness);
        if (pet.happiness <= petHappinessLoseValue) {
            sendInGameMessage("Your pet is miserable! Entertain it!");
            clearInterval(petHappinessInterval);
        }
    }, intervalsTime);
}


function changePetImage(imageURL, scale) {
    const petBodyImage = document.querySelector("#pet-body-image");
    petBodyImage.src = imageURL;
    petBodyImage.style.scale = scale;
}


function clearOnRunningIntervals() {
    clearInterval(petHungerInterval);
    clearInterval(petCleanlinessInterval);
    clearInterval(petHappinessInterval);
    clearInterval(petSleepinessInterval);
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


// game.init();
getBoardReady();