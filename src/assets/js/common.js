// すべて

const body = document.querySelector("body");

// SP版

// 開いているページのnavの色変更
const navColor = (num) => {
  const nav = document.querySelector(`nav ul li:nth-child(` + num + `) a`);
  nav.setAttribute("id", "setNav");
};

// footのshereアイコン消す
const footShereRmv = () => {
  const shereFoot = document.querySelector("footer .nav__link--shere");
  const foot = document.querySelector("footer");
  foot.removeChild(shereFoot);
};

export default {
  body,
  footShereRmv,
  navColor,
};
