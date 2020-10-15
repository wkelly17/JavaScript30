let countdown;
const timerDisplay = document.querySelector('.display__time-left');
console.log(timerDisplay);
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown); //clear any currently running timers.
  const now = Date.now(); //returns milliseconds
  const then = now + seconds * 1000; //how long to return timer.  seconds * 1000 to get ms
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  console.log(seconds);
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer() {
  console.log(this);
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value; //.minutes is html attr.
  timer(mins * 60);
  this.reset(); //reset form;
});
