export type Player = "" | "X" | "O";
export type Winner = Player | "tie";

import { calculateWinner } from "./calculateWinner.js";
import { displayScore } from "./displayScore.js";

const players: Player[] = ["X", "O"];
const scores = new Map<Winner, number>([
    ["X", 0],
    ["O", 0],
    ["tie", 0],
]);
let round = 0;

const init = (
    squares: NodeListOf<Element>
): ((e: Event, i: number) => void) => {
    const [player1, player2] = round % 2 ? players.reverse() : players;
    const gameboard: Player[] = Array(9).fill("");
    let winner: Winner = "";
    let moves = 1;

    squares.forEach(s => s.classList.remove("X", "O", "gameOver"));
    round++;

    return (e: Event, i: number) => {
        if (gameboard[i] || winner) {
            return;
        }

        const player = moves % 2 ? player1 : player2;
        gameboard[i] = player;
        (e.target as HTMLTextAreaElement).classList.add(player);
        winner = calculateWinner(gameboard);

        if (winner) {
            scores.set(winner, scores.get(winner)! + 1);
            displayScore(scores, winner, handleRestart);
            squares.forEach(s => s.classList.add("gameOver"));
        }

        moves += 1;
    };
};

const squares = document.querySelectorAll(".square")!;
const handleRestart = () => (game = init(squares));

let game = init(squares);

squares.forEach((square, idx) =>
    square.addEventListener("click", e => game(e, idx))
);
