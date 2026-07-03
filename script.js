const display = document.getElementById("display");
const timer = document.getElementById("timer");
const count = document.getElementById("count");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const themeBtn = document.getElementById("themeBtn");
const alarmSound = document.getElementById("alarmSound");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let minute = 25;
let second = 0;
let totalSeconds = 1500;
let currentSeconds = minute*60 + second;
let percent = (currentSeconds/1500) * 100;

progressBar.style.width =`${percent}%`;

let isWorking = true;

let pomodoroCount = 0;

let interval=null;
function playAlarm(){
    alarmSound.currentTime = 0;
    alarmSound.play();
}
function renderTime() {
  const displayMinute = String(minute).padStart(2, "0");

  const displaySecond = String(second).padStart(2, "0");

  timer.innerText =`${displayMinute}:${displaySecond}`;

  count.innerText =`完成番茄鐘：${pomodoroCount} / 4`;

  const currentSeconds = minute * 60 + second;

  const percent = (currentSeconds / totalSeconds) * 100;

  progressBar.style.width = `${percent}%`;
  progressText.innerText = `${Math.round(percent)}%`;

  progressBar.style.width =`${percent}%`;
}

function startTimer() {
  clearInterval(interval);
  interval = null;

  interval = setInterval(() => {
    if (second === 0) {
      if (minute === 0) {
        switchMode();
        return;
      }
      minute--;
      second = 59;
    } else {
      second--;
    }
    renderTime();
  }, 1000);
}

function switchMode() {
  playAlarm();
  clearInterval(interval);
  if (isWorking) {
    pomodoroCount++;
    isWorking = false;
    if (pomodoroCount === 4) {
      minute = 20;
      second = 0;
      totalSeconds = 20 * 60;
      display.innerText = "長休息時間";
      display.style.background = "#9c27b0";
    } else {
      minute = 5;
      second = 0;
      totalSeconds = 5 * 60;
      display.innerText = "短休息時間";
      display.style.background = "#2196f3";
    }
  } else {
    isWorking = true;
    minute = 25;
    second = 0;
    totalSeconds = 25 * 60;
    display.innerText = "工作時間";
    display.style.background = "#4caf50";
    if (pomodoroCount === 4) {
      pomodoroCount = 0;
    }
  }
  renderTime();
  startTimer();
}

startBtn.addEventListener("click",startTimer);

pauseBtn.addEventListener("click", function () {
  clearInterval(interval);
  interval = null;
});

resetBtn.addEventListener("click", function () {
  clearInterval(interval);
  interval = null;

  minute = 25;
  second = 0;
  isWorking = true;
  pomodoroCount = 0;

  display.innerText = "工作時間";

  renderTime();
});


themeBtn.addEventListener("click", function () {
  
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerText = "☀️ 淺色模式";
  } else {
    themeBtn.innerText = "🌙 深色模式";
  }
});