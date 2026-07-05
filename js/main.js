/* --------------------------- Button Click Event --------------------------- */
import {startBtn,pauseBtn,resetBtn,themeBtn,} from "./dom.js";

import {startTimer,pauseTimer,resetTimer,} from "./timer.js";

import { toggleTheme } from "./theme.js";

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
themeBtn.addEventListener("click", toggleTheme);
