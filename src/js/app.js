import { addTouchAttr, addLoadedAttr, isMobile, FLS } from "@js/common/functions.js"

addTouchAttr();

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".popular__list");
  if (!list) return;

  const items = list.querySelectorAll(".popular__item");

  // максимальный z-index = количество элементов
  let z = items.length;

  items.forEach(item => {
    item.style.zIndex = z;
    z--;
  });
});
