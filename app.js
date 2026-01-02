class GuessingGame {
  constructor() {
    this.targetNumber = this.generateNumber();
    this.attempts = 0;
    this.gameOver = false;

    this.elements = {
      input: document.getElementById('guessInput'),
      submitBtn: document.getElementById('submitBtn'),
      resetBtn: document.getElementById('resetBtn'),
      message: document.getElementById('message'),
      attempts: document.getElementById('attempts'),
      container: document.querySelector('.game-container')
    };

    this.init();
  }

  init() {
    this.elements.submitBtn.addEventListener('click', () => this.checkGuess());
    this.elements.resetBtn.addEventListener('click', () => this.resetGame());

    // Allow Enter key to submit
    this.elements.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.checkGuess();
    });
  }

  generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  checkGuess() {
    if (this.gameOver) return;

    const guess = parseInt(this.elements.input.value);
    this.attempts++;
    this.elements.attempts.textContent = `Attempts: ${this.attempts}`;

    if (isNaN(guess) || guess < 1 || guess > 100) {
      this.updateFeedback('Please enter a valid number (1-100)', 'error-text');
      this.elements.container.classList.add('shake');
      setTimeout(() => this.elements.container.classList.remove('shake'), 500);
      return;
    }

    if (guess === this.targetNumber) {
      this.handleWin();
    } else if (guess < this.targetNumber) {
      this.updateFeedback('Too low! Try again.', 'info-text');
      this.elements.input.value = '';
      this.elements.input.focus();
    } else {
      this.updateFeedback('Too high! Try again.', 'info-text');
      this.elements.input.value = '';
      this.elements.input.focus();
    }
  }

  updateFeedback(msg, className) {
    this.elements.message.textContent = msg;
    this.elements.message.className = className;
  }

  handleWin() {
    this.gameOver = true;
    this.updateFeedback(`Correct! You found it in ${this.attempts} tries.`, 'success-text');
    this.elements.submitBtn.disabled = true;
    this.elements.submitBtn.style.opacity = '0.5';
  }

  resetGame() {
    this.targetNumber = this.generateNumber();
    this.attempts = 0;
    this.gameOver = false;

    this.elements.input.value = '';
    this.elements.input.disabled = false;
    this.elements.input.focus();

    this.elements.submitBtn.disabled = false;
    this.elements.submitBtn.style.opacity = '1';

    this.elements.attempts.textContent = 'Attempts: 0';
    this.updateFeedback('Start guessing...', 'info-text');
  }
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new GuessingGame();
});