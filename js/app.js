import { calculateWinner } from "./calculateWinner";
const init = (squares) => {
    const output = document.querySelector(".output");
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    const player1 = "X";
    const player2 = "O";
    let round = 1;
    let winner = "";
    squares.forEach(s => s.classList.remove("X", "O"));
    return (e, i) => {
        if (gameboard[i] || winner) {
            return;
        }
        const player = round % 2 ? player1 : player2;
        gameboard[i] = player;
        // @ts-ignore
        e.target.classList.add(player);
        winner = calculateWinner(gameboard);
        if (winner) {
            return alert(`The Winner is ${winner}`);
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
