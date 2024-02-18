import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, _reject) => {
      setTimeout(resolve, delay, { position, delay });
    });
  } else {
    return new Promise((_resolve, reject) => {
      setTimeout(reject, delay, { position, delay });
    });
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const firstDelay = parseInt(this.elements.delay.value);
  const delayStep = parseInt(this.elements.step.value);
  const amount = parseInt(this.elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
