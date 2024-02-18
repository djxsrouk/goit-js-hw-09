import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates && selectedDates[0];

    if (selectedDate && selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      if (startButton) startButton.disabled = true;
    } else {
      if (startButton) startButton.disabled = false;
    }
  },
};

const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const timeElements = ["days", "hours", "minutes", "seconds"]
  .map(element => document.querySelector(`[data-${element}]`));

if (dateTimePicker && startButton && timeElements.every(element => element)) {
  options.onClose([options.defaultDate]);
  flatpickr(dateTimePicker, options);

  let countdownInterval;
  startButton.addEventListener("click", startCountdown);

  function startCountdown() {
    const selectedDate = new Date(dateTimePicker.value).getTime();

    if (isNaN(selectedDate)) {
      window.alert("Invalid date");
      return;
    }

    countdownInterval = setInterval(() => updateTimer(selectedDate), 1000);
    startButton.disabled = true;
  }

  function updateTimer(endDate) {
    const currentDate = new Date().getTime();
    const timeRemaining = endDate - currentDate;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      resetTimeElements();
      window.alert("Countdown complete!");
      startButton.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      updateTimeElements(days, hours, minutes, seconds);
    }
  }

  function updateTimeElements(days, hours, minutes, seconds) {
    timeElements.forEach((element, index) => {
      element.textContent = addLeadingZero(arguments[index]);
    });
  }

  function resetTimeElements() {
    updateTimeElements(0, 0, 0, 0);
  }

  function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }

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
}