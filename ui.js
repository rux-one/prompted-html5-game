export class UI {
  constructor() {
    this.scoreElem = document.getElementById('score');
    this.instructionsElem = document.getElementById('instructions');
    this.popupElem = document.getElementById('popup');
  }
  draw() {
    // UI is handled via DOM for now
  }
  setScore(val) {
    this.scoreElem.textContent = `Carrots: ${val}/5`;
  }
  showPopup() {
    this.popupElem.classList.remove('hidden');
  }
  hidePopup() {
    this.popupElem.classList.add('hidden');
  }
  hideInstructions() {
    this.instructionsElem.style.display = 'none';
  }
}
