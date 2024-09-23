const sounds = ["applause", "boo", "gasp", "tada", "victory", "wrong"];
const buttons = document.getElementById("buttons");

/*Durdurma bölümü*/
const stopSound = () => {
  sounds.forEach((sound) => {
    const currentSound = document.getElementById(sound);
    currentSound.pause()
    currentSound.currentTime = 0;
  })
}
/* button oluşturma bölümü*/
sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.innerHTML = sound;
  btn.addEventListener("click", () => {
    stopSound()
    document.getElementById(sound).play()
  })
  buttons.appendChild(btn)
})