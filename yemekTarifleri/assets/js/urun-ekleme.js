document.addEventListener("DOMContentLoaded", function(event) {

  let btnUrunEkle = document.getElementById("btnUrunEkle");
  let urunler     = JSON.parse(localStorage.getItem("urunler"));

  if (urunler == null) {
    urunler = [];
  }
  listele(urunler);

  btnUrunEkle.addEventListener("click", function() {
    let urunAdi = document.getElementById("urunAdi").value;
    urunAdi     = urunAdi.trim();
    let isAdded = urunler.includes(urunAdi);
    if (isAdded) {
      alert("daha önce ürün eklendi");
    } else if (urunAdi === "") {
      alert("lütfen ürün yazın ");
    } else {
      urunler.unshift(urunAdi);
      localStorage.setItem("urunler", JSON.stringify(urunler));
      listele(urunler);
      document.getElementById("urunAdi").value = "";
    }
  });

  let searchInput = document.getElementById("search");
  searchInput.addEventListener("input", function() {
    let searchValue        = this.value;
    let fitrelenmisUrunler = urunler.filter(function(urun) {
      return urun.toLowerCase().includes(searchValue.toLowerCase());
    });
    listele(fitrelenmisUrunler);
  });

  document.body.addEventListener("click", function(event) {
    let element           = event.target;
    let elementDeleteIcon = element.className.includes("delete-product");

    if (elementDeleteIcon) {
      let deleteIconID = element.id;
      urunler.splice(deleteIconID, 1);
      listele(urunler);
      localStorage.setItem("urunler", JSON.stringify(urunler));
    }
  });

  function listele(urunler) {
    if (urunler == null || (Array.isArray(urunler) && !urunler.length)) {
      let urunListesi       = document.getElementById("urunListesi");
      let liElement         = document.createElement("li");
      liElement.className   = "list-group-item text-bg-warning text-white";
      liElement.textContent = "Henüz bir ürün eklenmedi !";
      urunListesi.innerHTML = "";
      urunListesi.appendChild(liElement);
    } else {
      urunListesi.innerHTML = "";
      urunler.forEach(function(urun, index, array) {
        let liElement         = document.createElement("li");
        let iElement          = document.createElement("i");
        liElement.className   = "list-group-item";
        liElement.textContent = urun;
        iElement.className    = "bi bi-trash delete-product float-end";
        iElement.style        = "color: #e33e3e; cursor: pointer;";
        iElement.id           = index;
        urunListesi.appendChild(liElement);
        liElement.appendChild(iElement);
      });
    }
  }

});