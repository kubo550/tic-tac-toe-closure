// Funkcje Pomocnicze
import { calculateWinner } from "./calculateWinner.js";
import { displayScore } from "./displayScore.js";
// Globalne Zmienne
const players = ["X", "O"];
const scores = new Map([
    ["X", 0],
    ["O", 0],
    ["tie", 0],
]);
let round = 0;
const init = (squares) => {
    // Deklaracja zmiennych na całą nową rundę
    const [player1, player2] = round++ % 2 ? players : players.reverse(); // Wybranie kto zaczyna względem, czy runda jest parzysta
    const gameboard = Array(9).fill(""); // tworzenie planszy, czyli 9 elementowej pustej tablicy
    let winner = "";
    let moves = 1;
    squares.forEach(s => s.classList.remove("X", "O", "gameOver")); // Oczyszczanie planszy z poprzedniej rundy
    // Przykład closure -> domknięcia, czyli zwracamy funckję, która będzie wykonowana po kliknięciu na któreś z pól
    return (e, i) => {
        // Jeśli dane pole jest już zajęte, lub ktoś wygrał, nie robimy nic
        if (gameboard[i] || winner) {
            return;
        }
        // Wybranie aktualnego gracza na podstawie parzystości liczby ruchów w tej turze
        const player = moves % 2 ? player1 : player2;
        // skąd zmienna i? jest to index klikniętego własnie pola, index jest przekaywany w addEventListener 
        gameboard[i] = player; // Nadanie danemu elementowi w tablicy wartość akutalnego gracza
        e.target.classList.add(player); // Dodanie klassy X lub O dla danego pola w HTML, za wyśweitlenie danego gracza odpowiedzialny jest CSS
        winner = calculateWinner(gameboard); // Po każdym ruchu patrzymy czy mamy zwycięzcę 
        // Jeśli ktoś wygrał
        if (winner) {
            scores.set(winner, scores.get(winner) + 1); // Dodaj mu punkt w tabeli wyników
            displayScore(scores, winner, handleRestart); // Wyświetl komunikat kto wygrał
            squares.forEach(s => s.classList.add("gameOver")); // Usuń podświetlanie podczas hoveru z pustych miejsc.
        }
        moves += 1;
    };
};
const squares = document.querySelectorAll(".square"); // Tablicopodobna lista 9 pól do ktorych 
const handleRestart = () => (game = init(squares)); // callback który resetuje grę
let game = init(squares); // zmienna game jest funckją zwróconą z funkcji init. en. Closure / pl. Domknięcie
squares.forEach((square, idx) => square.addEventListener("click", e => game(e, idx)) // Dla każdego kwadratu dodaj nasłuchiwanie na kliknięcie
);
