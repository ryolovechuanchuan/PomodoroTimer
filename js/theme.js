import { themeBtn } from "./dom.js";

export function toggleTheme() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerText = "☀️ 淺色模式";
  } else {
    themeBtn.innerText = "🌙 深色模式";
  }
}
