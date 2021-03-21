import { Player, Winner } from "./app";

export const displayScore = (
    scores: Map<Winner, number>,
    winner: Winner,
    restartGame: () => void
) => {
    const resBtn = document.querySelector("#reset")!;
    const scoreElements = ["X", "tie", "O"].map(
        document.getElementById.bind(document)
    );
    scoreElements?.forEach(
        el => (el!.textContent = scores.get(el?.id as Player)?.toString() as string)
    );
    resBtn.classList.remove("hidden");
    resBtn.textContent = winner === "tie" ? "Tie" : `The Winner is ${winner}`;

    resBtn.addEventListener("click", () => {
        resBtn.classList.add("hidden");
        restartGame();
    });
};
