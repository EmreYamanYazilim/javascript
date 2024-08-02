const panels = document.querySelectorAll(".panel");

// seçili olana active clasını ekleme functionu
panels.forEach((panel) => {
  panel.addEventListener("click", function() {
    removeActiveClasses();
    panel.classList.add("active");
  });
});


// tüm panel class olanlardan  active clasını kaldırma functionu
const removeActiveClasses = function() {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
}

