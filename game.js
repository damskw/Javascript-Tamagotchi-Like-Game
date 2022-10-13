initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}

function refreshTime() {
    const timeDisplay = document.querySelector("#time");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
  }
    setInterval(refreshTime, 1000);