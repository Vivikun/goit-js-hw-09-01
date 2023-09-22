let intervalId;
let changingColors = false;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function startColorChange() {
  if (!changingColors) {
    intervalId = setInterval(() => {
      const randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
    }, 1000);
    changingColors = true;
    document.querySelector('[data-start]').disabled = true;
  }
}
function stopColorChange() {
  if (changingColors) {
    clearInterval(intervalId);
    changingColors = false;
    document.querySelector('[data-start]').disabled = false;
  }
}
export { startColorChange, stopColorChange };
