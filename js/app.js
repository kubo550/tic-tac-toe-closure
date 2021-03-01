import { calculateWinner } from "./calculateWinner.js";
const init = (squares) => {
    const output = document.querySelector(".output");
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    let winner = "";
    let round = 1;
    squares.forEach(s => s.classList.remove("X", "O"));
    return (e, i) => {
        if (gameboard[i] || winner) {
            return;
        }
        const player = round % 2 ? "X" : "O";
        gameboard[i] = player;
        e.target.classList.add(player);
        winner = calculateWinner(gameboard);
        if (winner) {
            return console.log(`The Winner is ${winner}`);
        }
        round += 1;
    };
};
const resBtn = document.querySelector(".reset");
const squares = document.querySelectorAll(".square");
resBtn.addEventListener("click", () => {
    game = init(squares);
});
let game = init(squares);
squares.forEach((square, idx) => square.addEventListener("click", e => game(e, idx)));
