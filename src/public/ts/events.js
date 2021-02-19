window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight': 
            if(snake.currentDirection !== "Left") {
                snake.currentDirection = "Right";
                snake.setDirection(scale,0);
            };
        break;
        case 'ArrowLeft' : 
            if(snake.currentDirection !== "Right") {
                snake.currentDirection = "Left";
                snake.setDirection(-scale,0);
            };
        break;
        case 'ArrowDown' : 
            if(snake.currentDirection !== "Up") {
                snake.currentDirection = "Down";
                snake.setDirection(0,scale);
            };
        break;
        case 'ArrowUp' : 
            if(snake.currentDirection !== "Down") {
                snake.currentDirection = "Up";
                snake.setDirection(0,-scale);
            };
        break;
    }
});


window.document.getElementById("start").onclick = function () {
    setUp();
};

document.getElementById("name").addEventListener("click", () => {
    let name = prompt("Hier name Eingeben");
    document.getElementById("playerId").textContent = name || "player";
    playerName = name || "player";
});

