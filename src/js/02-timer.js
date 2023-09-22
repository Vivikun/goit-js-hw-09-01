// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let countdownInterval;

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = new Date(
    document.getElementById('datetime-picker').value
  );
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    alert('Please choose a date in the future');
  } else {
    document.querySelector('[data-start]').disabled = true;

    countdownInterval = setInterval(() => {
      const timeRemaining = selectedDate - new Date();

      if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        document.querySelector('[data-start]').disabled = false;
        return;
      }

      const time = convertMs(timeRemaining);
      document.querySelector('[data-days]').textContent = addLeadingZero(
        time.days
      );
      document.querySelector('[data-hours]').textContent = addLeadingZero(
        time.hours
      );
      document.querySelector('[data-minutes]').textContent = addLeadingZero(
        time.minutes
      );
      document.querySelector('[data-seconds]').textContent = addLeadingZero(
        time.seconds
      );
    }, 1000);
  }
});
