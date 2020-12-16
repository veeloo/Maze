const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const h = canvas.height;
const w = canvas.width;

const walk = 0;
const wall = 1;
const player = 2;
const finish = 3;

const playerPos = [5, 0];

let arena = [
    [wall, wall, wall, wall, wall, wall, wall, wall],
    [wall, walk, wall, walk, walk, walk, walk, wall],
    [wall, walk, wall, wall, walk, wall, walk, wall],
    [wall, walk, walk, wall, walk, wall, walk, wall],
    [wall, walk, walk, walk, walk, wall, walk, wall],
    [wall, walk, wall, wall, walk, wall, walk, wall],
    [wall, walk, walk, wall, walk, wall, walk, finish],
    [wall, wall, wall, wall, wall, wall, wall, wall],
];

const blockSize = w / 8;

function drawElemenet() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            c.beginPath();
            c.rect(j * blockSize, i * blockSize, blockSize, blockSize);

            let [y, x] = playerPos;
            arena[y][x] = player;

            switch (arena[i][j]) {
                case wall:
                    c.fillStyle = " black";
                    break;
                case walk:
                    c.fillStyle = "white";
                    break;
                case finish:
                    c.fillStyle = "red";
                    break;
                case player:
                    c.fillStyle = "blue";
            }

            c.fill();
            c.strokeStyle = "black";
            c.stroke();
            c.closePath();
        }
    }
}

function drawArena() {
    c.beginPath();
    c.strokeStyle = "red";

    for (let i = 0; i < 8; i++) {
        c.moveTo(0, i * blockSize);
        c.lineTo(w, i * blockSize);
        for (let j = 0; j < 8; j++) {
            c.moveTo(j * blockSize, 0);
            c.lineTo(j * blockSize, h);
        }
    }

    c.stroke();
}

document.addEventListener("keydown", (e) => {
    let keyCode = e.keyCode;
    switch (keyCode) {
        case 39:
            movePlayer(0, 1);
            break;
        case 37:
            movePlayer(0, -1);
            break;
        case 38:
            movePlayer(-1, 0);
            break;
        case 40:
            movePlayer(1, 0);
            break;
    }
});

function movePlayer(y, x) {
    let [oldY, oldX] = playerPos;

    if (arena[oldY + y][oldX + x] === 1) return;
    else if (arena[oldY + y][oldX + x] === 3) alert("You Win");

    playerPos[0] = oldY + y;
    playerPos[1] = oldX + x;

    arena[oldY][oldX] = 0;

    drawArena();
    drawElemenet();
}

drawArena();
drawElemenet();
