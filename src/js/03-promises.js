import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('form').addEventListener('submit', async e => {
  e.preventDefault();
  const firstDelay = parseInt(
    document.querySelector('input[name="delay"]').value,
    10
  );
  const step = parseInt(document.querySelector('input[name="step"]').value, 10);
  const amount = parseInt(
    document.querySelector('input[name="amount"]').value,
    10
  );

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + i * step;

    // Corrected 'then' to 'await createPromise'
    await createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
  }
});
