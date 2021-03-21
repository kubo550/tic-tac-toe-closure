export const displayScore = (scores, winner, restartGame) => {
    const resBtn = document.querySelector("#reset");
    const scoreElements = ["X", "tie", "O"].map(document.getElementById.bind(document));
    scoreElements.forEach(el => (el.textContent = scores.get(el?.id)?.toString()));
    resBtn.classList.remove("hidden");
    resBtn.textContent = winner === "tie" ? "Tie" : `The Winner is ${winner}`;
    resBtn.addEventListener("click", () => {
        resBtn.classList.add("hidden");
        restartGame();
    });
};
