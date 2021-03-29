import { Player, Winner } from "./app"

type Line = [number, number, number]


// Funckja pochodzi z tutoriala reactjs, trochę ją zmodyfikowałem na potrzeby mojego projektu.
// Jest to według mnie idealne podejście do tego probelmu, dlatego ją tutaj zastosowałem

export const calculateWinner = (squares: Player[]): Winner => {
    const lines: Line[] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    if (squares.every(Boolean)) {
        return "tie"
    }
    return '';
};