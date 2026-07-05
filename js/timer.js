/* ------------------------------- Timer State ------------------------------ */
import {display,timer,count,progressBar,progressText,} from "./dom.js";
import { playAlarm } from "./sound.js";

let minute = 25;
let second = 0;
let totalSeconds = 1500;
let currentSeconds = minute * 60 + second;
let percent = (currentSeconds / 1500) * 100;

let isWorking = true;
let pomodoroCount = 0;
let interval = null;

progressBar.style.width = `${percent}%`;

/* -------------------------------- Render UI ------------------------------- */
export function renderTime() {
  // 將數字補成兩位數，例如 5 會顯示為 05
  const displayMinute = String(minute).padStart(2, "0");
  const displaySecond = String(second).padStart(2, "0");

  timer.innerText = `${displayMinute}:${displaySecond}`;
  count.innerText = `完成番茄鐘：${pomodoroCount} / 4`;

  // 根據剩餘秒數計算目前進度條百分比
  const currentSeconds = minute * 60 + second;
  const percent = (currentSeconds / totalSeconds) * 100;

  progressBar.style.width = `${percent}%`;
  progressText.innerText = `${Math.round(percent)}%`;
}

/* ----------------------------- Timer Controls ----------------------------- */
export function startTimer() {
  // 避免重複點擊開始後產生多個計時器
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

export function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

export function resetTimer() {
  clearInterval(interval);
  interval = null;

  minute = 25;
  second = 0;
  isWorking = true;
  pomodoroCount = 0;

  display.innerText = "工作時間";

  renderTime();
}

/* ------------------------------- Mode Change ------------------------------ */
function switchMode() {
  playAlarm();
  clearInterval(interval);

  if (isWorking) {
    startBreak();
  } else {
    startWork();
  }

  renderTime();
  startTimer();
}

function startBreak() {
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
}

function startWork() {
  isWorking = true;
  minute = 25;
  second = 0;
  totalSeconds = 25 * 60;
  display.innerText = "工作時間";
  display.style.background = "#4caf50";
}
