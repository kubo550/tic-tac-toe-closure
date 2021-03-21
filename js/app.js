import { calculateWinner } from "./calculateWinner.js";
import { displayScore } from "./displayScore.js";
const players = ["X", "O"];
const scores = new Map([
    ["X", 0],
    ["O", 0],
    ["tie", 0],
]);
let round = 0;
const init = (squares) => {
    const [player1, player2] = round % 2 ? players.reverse() : players;
    const gameboard = Array(9).fill("");
    let winner = "";
    let moves = 1;
    squares.forEach(s => s.classList.remove("X", "O", "gameOver"));
    round++;
    return (e, i) => {
        if (gameboard[i] || winner) {
            return;
        }
        const player = moves % 2 ? player1 : player2;
        gameboard[i] = player;
        e.target.classList.add(player);
        winner = calculateWinner(gameboard);
        if (winner) {
            scores.set(winner, scores.get(winner) + 1);
            displayScore(scores, winner, handleRestart);
            squares.forEach(s => s.classList.add("gameOver"));
        }
        moves += 1;
    };
};
const squares = document.querySelectorAll(".square");
const handleRestart = () => (game = init(squares));
let game = init(squares);
squares.forEach((square, idx) => square.addEventListener("click", e => game(e, idx)));
