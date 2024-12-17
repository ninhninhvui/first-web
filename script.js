document.getElementById("clickButton").addEventListener("click", function () {
    const message = document.getElementById("message");
    message.style.display = "block";
});


const boardSize = 15; // Kích thước bàn cờ 10x10
const board = document.getElementById("board");
const message = document.getElementById("message_caro");
let currentPlayer = "X"; // Người chơi bắt đầu là "X"

// Tạo bàn cờ
function createBoard() {
for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
}
}

// Xử lý khi người chơi nhấn vào ô
function handleMove(event) {
const cell = event.target;
if (cell.textContent !== "") {
    return; // Ô đã được đánh
}

cell.textContent = currentPlayer; // Ghi ký hiệu "X" hoặc "O"
cell.classList.add("taken");

if (checkWin(cell.dataset.index)) {
    message.textContent = `Người chơi ${currentPlayer} thắng!`;
    board.removeEventListener("click", handleMove);
    return;
}

// Chuyển lượt người chơi
currentPlayer = currentPlayer === "X" ? "O" : "X";
message.textContent = `Lượt của người chơi: ${currentPlayer}`;
}

// Kiểm tra chiến thắng
function checkWin(index) {
const cells = Array.from(document.getElementsByClassName("cell"));
const row = Math.floor(index / boardSize);
const col = index % boardSize;

// Kiểm tra các hướng: ngang, dọc, chéo chính, chéo phụ
return (
    checkDirection(cells, row, col, 0, 1) || // Ngang
    checkDirection(cells, row, col, 1, 0) || // Dọc
    checkDirection(cells, row, col, 1, 1) || // Chéo chính
    checkDirection(cells, row, col, 1, -1) // Chéo phụ
);
}

// Hàm kiểm tra hướng
function checkDirection(cells, row, col, rowDir, colDir) {
let count = 1; // Đếm số quân liên tiếp

// Kiểm tra về phía trước
for (let i = 1; i < 5; i++) {
    const r = row + i * rowDir;
    const c = col + i * colDir;
    if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) break;
    if (cells[r * boardSize + c].textContent === currentPlayer) {
    count++;
    } else {
    break;
    }
}

// Kiểm tra về phía sau
for (let i = 1; i < 5; i++) {
    const r = row - i * rowDir;
    const c = col - i * colDir;
    if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) break;
    if (cells[r * boardSize + c].textContent === currentPlayer) {
    count++;
    } else {
    break;
    }
}

return count >= 5; // Thắng nếu có 5 quân liên tiếp
}

// Khởi tạo game
createBoard();
message.textContent = `Lượt của người chơi: ${currentPlayer}`;
