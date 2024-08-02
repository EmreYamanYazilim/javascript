document.addEventListener("DOMContentLoaded", function() {

  let yemekAdi      = document.getElementById("yemekAdi");
  let yemekTarifi   = document.getElementById("yemekTarifi");
  let search        = document.getElementById("search");
  let urunListesi   = document.getElementById("urunListesi");
  let yemekBaslik   = document.getElementById("yemekBaslik");
  let icerikListesi = document.getElementById("icerikListesi");
  let tarifDetay    = document.getElementById("tarifDetay");
  let btnKaydet     = document.getElementById("btnKaydet");
  let urunler       = JSON.parse(localStorage.getItem("urunler"));
  let yemekListesi  = JSON.parse(localStorage.getItem("yemek_listesi"));

  if (urunler == null) {
    urunler = [];
  }
  if (yemekListesi == null) {
    yemekListesi = [];
  }
  let yemek    = {
    yemekAdi   : "",
    yemekTarifi: "",
    icindekiler: [],
  };
  let icindeki = [];

  listele(urunler);

  yemekAdi.addEventListener("input", function() {
    let yemekAD = this.value;
    if (yemekAD) {
      yemekBaslik.innerHTML = yemekAD;
      yemek.yemekAdi        = yemekAD;
    } else {
      yemekBaslik.innerHTML = "Yazınız";
    }
  });

  yemekTarifi.addEventListener("input", function() {
    let yemekTarif = this.value;
    if (yemekTarif) {
      tarifDetay.innerHTML = yemekTarif;
      yemek.yemekTarifi    = yemekTarif;

    } else {
      tarifDetay.innerHTML = "Lezzetli yemeklerinizi eklemek içi sol taraftaki alana yazınız";
    }
  });

  search.addEventListener("input", function() {
    let searchValue        = this.value;
    let fitrelenmisurunler = urunler.filter(function(value) {
      return value.toLowerCase().includes(searchValue.toLowerCase());
    });
    listele(fitrelenmisurunler);
  });

  document.body.addEventListener("click", function(event) {
    let element                = event.target;
    let addPlus2               = element.matches(".add-product");
    let addPlus                = element.className.includes("add-product");
    let elementIsProductDelete = element.className.includes(
        "delete-product-content");
    let urunAdi                = false;
    if (addPlus &&
        idExistsUrunler(element.id) && // urun varsa ekleme yapıla billmesi için önce burda id kontrol ediyorum sonra bir altta urun adini cekerken olmayan bir id yollamamak için id kontrol ediyorum
        (urunAdi = urunler[element.id]) &&
        !isNameExistsIcındekiler(urunAdi))  // içindekiler arrayı içinde  bu ürün adı var mı yokmu kontrolü için  altta funcionu olusturdum baştaki ünlemle tanımlanmamışsa eklenmemişse undefined döndürücek
    {
      let product = {
        id    : element.id,
        name  : urunler[element.id],
        miktar: "",
      };
      icindeki.push(product);
      icindekilisteleme(icindeki);
      yemek.icindekiler             = icindeki;
      let parentLi                  = element.parentElement;
      parentLi.style.textDecoration = "line-through"; // tıklananın üstünü çizme
      parentLi.style.opacity        = "0.4"; // tıkladıktan sonra  rengini şeffaflaştırma
      element.pointerEvents         = "none";// + işaretini  geçersiz kılma
    }

    if (elementIsProductDelete &&
        element.hasAttributes("data-id") &&
        (elementID = element.getAttribute("data-id")) &&
        idExistsUrunler(elementID) &&
        (urunAdi = urunler[elementID]) &&
        isNameExistsIcındekiler(urunAdi)
    ) {
      icindeki = icindeki.filter(product => product.name !== urunAdi);
      icindekilisteleme(icindeki);
      yemek.icindekiler             = icindeki;
      let iElement                  = document.getElementById(elementID);
      iElement.pointerEvent         = "auto";
      let parentLi                  = iElement.parentElement;
      parentLi.style.textDecoration = "none";
      parentLi.style.opacity        = "1";
    }
  });

  icerikListesi.addEventListener("input", function(inputEvent) {
    let degisenElement       = inputEvent.target;
    let degisenElementMiktar = degisenElement.classList.contains("miktar");
    if (degisenElementMiktar) {
      let miktarUrunID = degisenElement.getAttribute("data-id");
      icindeki.find(function(item) {
        if (item.id == miktarUrunID) {
          item.miktar = degisenElement.value;
        }
      });
    }
  });

  btnKaydet.addEventListener("click", function() {

    if (yemekBaslikKontrol()) {
      yemekListesi.push(yemek);
      localStorage.setItem("yemek_listesi", JSON.stringify(yemekListesi));
      Swal.fire({
                  title            : "Tebrikler",
                  text             : "Yemeğiniz başarı ile eklendi",
                  icon             : "success",
                  confirmButtonText: "Tamam",
                });
    } else {
      Swal.fire({
                  title            : "Malesef!",
                  text             : "Yemeğinizi ekleyemedik",
                  icon             : "warning",
                  confirmButtonText: "tamam",
                });
    }
  });

  function yemekBaslikKontrol() {
    return yemekListesi.find(item => item.yemekAdi === yemek.yemekAdi) ===
           undefined;
  }

  function isNameExistsIcındekiler(name) {
    //  icindeki.find(function(item) { // icindeki array içinde find bul diyorum calback function ile yada arrow ile tanımlayarak yapacağım 75.satırdaki ve 84. satırdaki aynı birisi
    //   if (item.name === name) {
    //     return false;
    //   }else{
    //     return true;
    //   }
    // });
    return icindeki.find(item => item.name === name) !== undefined; // arrow ile yapılan bulamazsa yani undefined değilse tanımlanmamış değilse tanımlanmışsa dedik
  }

  function idExistsUrunler(id) {
    return urunler[id] !== undefined; //urunler arrayımız içinde bu id var mı diye sorgulatıyorum   true urun var  false urun yok
  }

  function icindekilisteleme(urunler) {
    if (urunler == null || (Array.isArray(urunler) && !urunler.length)) {
      let icerikListesi       = document.getElementById("icerikListesi");
      let liElement           = document.createElement("li");
      liElement.className     = "d-flex justify-content-between bg-danger text-white ms-3";
      liElement.textContent   = "Henüz ekleme yapılmadı";
      icerikListesi.innerHTML = "";
      icerikListesi.appendChild(liElement);
    } else {
      icerikListesi.innerHTML = "";
      urunler.forEach(function(urun, index) {
        let liElement       = document.createElement("li");
        let spanElement     = document.createElement("span");
        let iElement        = document.createElement("i");
        let labelElement    = document.createElement("label");
        let inputElement    = document.createElement("input");
        liElement.className = "justify-content-between";
        iElement.className  = "bi bi-trash delete-product-content text-danger";
        iElement.setAttribute("data-id", urun.id);
        labelElement.setAttribute("for", "miktar-" + urun.id);
        labelElement.textContent = urun.name;
        inputElement.placeholder = "Miktar";
        inputElement.id          = "miktar-" + urun.id;
        inputElement.setAttribute("data-id", urun.id);
        inputElement.className = "float-end border-0 border-bottom border-black miktar";
        icerikListesi.appendChild(liElement);
        liElement.appendChild(spanElement);
        spanElement.appendChild(iElement);
        spanElement.appendChild(labelElement);
        liElement.appendChild(inputElement);
      });
    }
  }

  function listele(urunler) {
    if (urunler == null || (Array.isArray(urunler) && !urunler.length)) {
      let urunListesi       = document.getElementById("urunListesi");
      let liElement         = document.createElement("li");
      let iElement          = document.createElement("i");
      liElement.className   = "list-group-item bg-warning text-white";
      liElement.textContent = "Henüz bir ürün eklenmedi";
      urunListesi.innerHTML = "";
      urunListesi.appendChild(liElement);
    } else {
      urunListesi.innerHTML = "";
      urunler.forEach(function(urun, index) {
        let liElement         = document.createElement("li");
        let iElement          = document.createElement("i");
        liElement.className   = "list-group-item";
        liElement.textContent = urun;
        iElement.className    = "bi bi-plus-lg add-product float-end text-danger";
        iElement.id           = index;
        urunListesi.appendChild(liElement);
        liElement.appendChild(iElement);
      });
    }
  }
});


