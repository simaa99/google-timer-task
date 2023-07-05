const timerBtn = document.querySelector(".timer-btn");
const stopBtn = document.querySelector(".stop-btn");

const timerCounter = document.querySelector(".timer-counter");
const stopCounter = document.querySelector(".stop-counter");

const startBtn = document.querySelector(".start-btn");
const timerStopBtn = document.querySelector(".timer-stop-btn");
const resetBtn = document.querySelector(".reset-btn");

const timerMinutes = document.querySelector(".timer-minutes");
const timerSeconds = document.querySelector(".timer-seconds");
const stopSeconds = document.querySelector(".stop-seconds");
const stopMSeconds = document.querySelector(".stop-mSeconds");
const volumeIcon = document.querySelector(".fa-volume-low");
const timeline = document.querySelector(".timeline");

const alarmAudio = new Audio("alarm.mp3");

// Common function to handle button click events
function handleClick(event) {
  const { target } = event;

  // Reset button
  if (target === resetBtn) {
    if (timerBtn.classList.contains("active")) {
      clearInterval(timerInterval);
      timerMinutes.textContent = 5;
      timerSeconds.textContent = "00";
      timeline.style.width = 0;
      timerCounter.style.borderBottom = "2px solid #303135";
    } else if (stopBtn.classList.contains("active")) {
      clearInterval(counterInterval);
      stopSeconds.textContent = 0;
      stopMSeconds.textContent = "00";
    }
    startBtn.style.display = "inline-block";
    timerStopBtn.style.display = "none";
    return;
  }

  // Timer/Stopwatch button
  if (target === timerBtn || target === stopBtn) {
    const isTimer = target === timerBtn;

    timerBtn.classList.toggle("active", isTimer);
    stopBtn.classList.toggle("active", !isTimer);
    timerCounter.style.display = isTimer ? "block" : "none";
    stopCounter.style.display = isTimer ? "none" : "block";
    volumeIcon.style.display = isTimer ? "inline-block" : "none";
    timeline.style.display = isTimer ? "block" : "none";

    if (timerInput.style.display === "block") {
      timerInput.style.display = "none";
    }

    // Fixing bugs
    startBtn.style.display = "inline-block";
    timerStopBtn.style.display = "none";
    return;
  }

  // Start/Stop button
  if (target === startBtn) {
    startBtn.style.display = "none";
    timerStopBtn.style.display = "inline-block";

    if (timerBtn.classList.contains("active")) {
      let timeLineWidth = timeline.offsetWidth;
      timerCounter.style.borderBottom = "none";
      timerInterval = setInterval(() => {
        if (timerSeconds.textContent == 0 && timerMinutes.textContent == 0) {
          alarmAudio.play();
          clearInterval(timerInterval);
        } else if (timerSeconds.textContent == 0) {
          timerSeconds.textContent = 59;
          timerMinutes.textContent -= 1;
          timeLineWidth += 2.03;
          timeline.style.width = `${timeLineWidth}px`;
        } else {
          timerSeconds.textContent -= 1;
          timeLineWidth += 2.03;
          timeline.style.width = `${timeLineWidth}px`;
        }

        // Fixing bugs
        if (
          timerBtn.classList.contains("active") &&
          timerStopBtn.style.display === "none"
        ) {
          startBtn.style.display = "none";
          timerStopBtn.style.display = "inline-block";
        }
      }, 1000);
    } else if (stopBtn.classList.contains("active")) {
      counterInterval = setInterval(() => {
        if (stopMSeconds.textContent < 99) {
          stopMSeconds.textContent = Number(stopMSeconds.textContent) + 1;
        } else {
          stopSeconds.textContent = Number(stopSeconds.textContent) + 1;
          stopMSeconds.textContent = 0;
          stopMSeconds.textContent = stopMSeconds.textContent + 1;
        }

        // Fixing bugs
        if (
          stopBtn.classList.contains("active") &&
          timerStopBtn.style.display === "none"
        ) {
          startBtn.style.display = "none";
          timerStopBtn.style.display = "inline-block";
        }
      }, 10);
    }
  }

  // Timer stop button
  if (target === timerStopBtn) {
    if (timerBtn.classList.contains("active")) {
      alarmAudio.pause();
      clearInterval(timerInterval);
      timerCounter.style.borderBottom = "2px solid #303135";
    } else if (stopBtn.classList.contains("active")) {
      clearInterval(counterInterval);
    }
    startBtn.style.display = "inline-block";
    timerStopBtn.style.display = "none";
  }
}

// Add event listeners using event delegation
document.addEventListener("click", handleClick);

// Fullscreen button
const fullscreenBtn = document.querySelector(".fa-expand");
const myTimerSection = document.querySelector(".timer-section");

fullscreenBtn.addEventListener("click", () => {
  if (getFullscreenElement()) {
    document.exitFullscreen();
  } else {
    myTimerSection.requestFullscreen().catch((e) => console.log(e));
  }
});

function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullscreenElement ||
    document.msFullscreenElement
  );
}

// Timer input
const timerInput = document.querySelector(".timer-counter-input");

timerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const timerTimeArray = timerInput.value.split("");
    const timerMinutesValue = `${timerTimeArray[0] || 0}${
      timerTimeArray[1] || 0
    }`;
    const timerSecondsValue = `${timerTimeArray[2] || 0}${
      timerTimeArray[3] || 0
    }`;
    timerCounter.style.display = "block";
    timerInput.style.display = "none";
    timerMinutes.textContent = timerMinutesValue;
    timerSeconds.textContent = timerSecondsValue;
  }
});

// Show input when clicking on the timer counter
timerCounter.addEventListener("click", () => {
  timerCounter.style.display = "none";
  timerInput.style.display = "block";
  clearInterval(timerInterval);
  startBtn.style.display = "inline-block";
  timerStopBtn.style.display = "none";
  timerInput.value = `${timerMinutes.textContent}:${timerSeconds.textContent}`;
});

// Onload event listener
window.addEventListener("load", () => {
  if (timerBtn.classList.contains("active")) {
    startBtn.style.display = "none";
    timerStopBtn.style.display = "inline-block";
    let timeLineWidth = timeline.offsetWidth;
    timerCounter.style.borderBottom = "none";
    timerInterval = setInterval(() => {
      if (timerSeconds.textContent == 0 && timerMinutes.textContent == 0) {
        clearInterval(timerInterval);
      } else if (timerSeconds.textContent == 0) {
        timerSeconds.textContent = 59;
        timerMinutes.textContent -= 1;
        timeLineWidth += 2.03;
        timeline.style.width = `${timeLineWidth}px`;
      } else {
        timerSeconds.textContent -= 1;
        timeLineWidth += 2.03;
        timeline.style.width = `${timeLineWidth}px`;
      }

      // Fixing bugs
      if (
        timerBtn.classList.contains("active") &&
        timerStopBtn.style.display === "none"
      ) {
        startBtn.style.display = "none";
        timerStopBtn.style.display = "inline-block";
      }
    }, 1000);
  }
});
