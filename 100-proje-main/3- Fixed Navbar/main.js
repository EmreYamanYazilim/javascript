const nav = document.querySelector(".nav");


// if (window.scrollY > nav.offsetHeight + 150) nav.classList.add("active"):
// Bu satır, sayfanın yukarıdan kaydırılma miktarının (window.scrollY)
// nav öğesinin yüksekliği artı 150 pikselden fazla olup olmadığını kontrol eder.
// Eğer bu koşul sağlanırsa, nav öğesine "active" sınıfı eklenir.
const fixNav = function() {
  if (window.scrollY > nav.offsetHeight + 150) nav.classList.add("active")
  else {
    nav.classList.remove("active");
  }
};
window.addEventListener("scroll",fixNav)


