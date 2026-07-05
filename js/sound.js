/* ---------------------------------- Sound --------------------------------- */
import { alarmSound } from "./dom.js";

export function playAlarm() {
  // 每次播放前先歸零，避免音效重複播放時沒有從頭開始
  alarmSound.currentTime = 0;
  alarmSound.play();
}
