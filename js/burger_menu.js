const toggleButton = document.getElementById("toggle-button");
const navList = document.getElementById("navi-list");

toggleButton.addEventListener("click", () => {
  navList.classList.toggle("active");
});
