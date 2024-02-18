const startButton = document.querySelector("[data-start]");
const stopButton = document.querySelector("[data-stop]");
const body = document.querySelector("body");

let timer = null;

startButton.addEventListener("click", () => {
  startButton.setAttribute("disabled", true);
  stopButton.removeAttribute("disabled");
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
stopButton.addEventListener("click", () => {
  startButton.removeAttribute("disabled");
  stopButton.setAttribute("disabled", true);
  clearInterval(timer);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};