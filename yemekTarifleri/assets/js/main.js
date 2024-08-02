document.addEventListener("DOMContentLoaded", function() {
  let foodList             = document.getElementById("foodList");
  let completedListElement = document.getElementById("completedList");

  let completedList = JSON.parse(localStorage.getItem("completed_list"));
  if (completedList == null) {
    completedList = [];
  }
  let yemekListesi = JSON.parse(localStorage.getItem("yemek_listesi"));
  if (yemekListesi == null) {
    yemekListesi = [];
  }

  console.log(foodList);
  listele(yemekListesi, foodList,true);
  listele(completedList, completedListElement);

  document.body.addEventListener("click", function(event) {
    let element             = event.target;
    let elementDeleteFood   = element.className.includes("delete-food");
    let elementComplateFoot = element.matches(".completed-food");

    if (elementDeleteFood) {
      let yemekID = element.getAttribute("data-id");
      let yemek   = yemekListesi[yemekID];
      Swal.fire({
                  title            : yemek.yemekAdi + " Yemeği Silinsin mi ?",
                  showDenyButton   : true,
                  showCancelButton : true,
                  confirmButtonText: "Evet",
                  denyButtonText   : `Hayır`,
                  cancelButtonText : "Iptal",
                }).then((result) => {
        if (result.isConfirmed) {
          yemekListesi.splice(yemekID, 1);
          listele(yemekListesi, foodList,true);
          Swal.fire({
                      title            : "işlem Başaarılı",
                      text             : "yemek Silindi!",
                      icon             : "success",
                      confirmButtonText: "tamam",
                    });
        } else if (result.isDenied) {
          Swal.fire({
                      text             : "yemek Silinmedi",
                      icon             : "info",
                      confirmButtonText: "tamam",
                    });
        }
      });

    }

    if (elementComplateFoot) {
      let yemekID = element.getAttribute("data-id");
      let yemek   = yemekListesi[yemekID];
      Swal.fire({
                  title            : yemek.yemekAdi + " Yemeği yapılanlara eklensin mi ?",
                  showDenyButton   : true,
                  showCancelButton : true,
                  confirmButtonText: "Evet",
                  denyButtonText   : `Hayır`,
                  cancelButtonText : "Iptal",
                }).then((result) => {
        if (result.isConfirmed) {

          let newCompate = yemekListesi.splice(yemekID, 1); // splcie array olara çıkarır  eleman çıkardıktan sonra onu değişkene vererek tamamlananlara aktarmak için kullanacağım
          completedList = completedList.concat(newCompate);  // en üstte completeList olarak bir array belirledim concat yaparak onun içierisine elimdeki arrayı koyuyorum
          localStorage.setItem("yemek_listesi", JSON.stringify(yemekListesi)); // splice olarak slindikten sonra tekrar yükleyerek silindiğini  locale aktarmak için güncellemek için kullandım
          localStorage.setItem("completed_list",JSON.stringify(newCompate));  //içinden tek 1 array olarak çıkardığımı local olarak complate_liste  atıyorum
          listele(yemekListesi, foodList ,true);
          listele(completedList, completedListElement);
          Swal.fire({
                      title            : "işlem Başaarılı",
                      text             : "yemek Yapıldı!",
                      icon             : "success",
                      confirmButtonText: "tamam",
                    });
        } else if (result.isDenied) {
          Swal.fire({
                      text             : "yemek Yapılmadı",
                      icon             : "info",
                      confirmButtonText: "tamam",
                    });
        }
      });

    }


  });

  function listele(yemekler, listElement,buttonStatus=false) {
    listElement.innerHTML = "";
    if (!yemekler.length) {
      listElement.innerHTML = "Listede Yemek Yok";
    } else {
      yemekler.forEach(function(urun, index) {
        let satirElement            = document.createElement("div");
        satirElement.className      = "col-md-6 mt-4";
        let cardElement             = document.createElement("div");
        cardElement.className       = "card";
        let cardHeaderElement       = document.createElement("h5");
        cardHeaderElement.className = "card-header";
        cardHeaderElement.innerHTML = `<storng>Yemek Adı: </storng>${urun.yemekAdi}`;
        let cardBodyElement         = document.createElement("div");
        cardBodyElement.className   = "card-body";
        let contentTitle            = document.createElement("h5");
        contentTitle.textContent    = "Içindekiler";
        let ulContentListElement    = document.createElement("ul");
        urun.icindekiler.forEach(function(item) {
          let liElement         = document.createElement("li");
          liElement.className   = "d-flex justify-content-between";
          liElement.textContent = item.name + " miktar :  " + item.miktar;
          ulContentListElement.appendChild(liElement);
        });
        cardBodyElement.appendChild(contentTitle);
        cardBodyElement.appendChild(ulContentListElement);
        let recipeDivElement       = document.createElement("div");
        recipeDivElement.className = "recipe";
        let recipeTitle            = document.createElement("h6");
        recipeTitle.textContent    = "Tarif: ";
        let recipeDetail           = document.createElement("p");
        recipeDetail.textContent   = urun.yemekTarifi;
        recipeDivElement.appendChild(recipeTitle);
        recipeDivElement.appendChild(recipeDetail);
        cardElement.appendChild(cardHeaderElement);
        cardElement.appendChild(cardBodyElement);
        satirElement.appendChild(cardElement);
        listElement.appendChild(satirElement);
        //button bölümünü pasiflerştirmek için
        if (buttonStatus) {
          let footerElement       = document.createElement("div");
          footerElement.className = "card-footer d-flex justify-content-between";
          let buttonSil           = document.createElement("button");
          buttonSil.className     = "btn btn-danger col me-5 delete-food";
          buttonSil.textContent   = "Sil";
          buttonSil.setAttribute("data-id", index);
          let buttonTamam         = document.createElement("button");
          buttonTamam.className   = "btn btn-success col completed-food";
          buttonTamam.textContent = "Tamam";
          buttonTamam.setAttribute("data-id", index);
          footerElement.appendChild(buttonSil);
          footerElement.appendChild(buttonTamam);
          cardElement.appendChild(footerElement);

        }
      });
    }
  }
});