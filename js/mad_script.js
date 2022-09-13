const endpoint = "https://passionfest-9b8b.restdb.io/rest/madkategori";

const mereinfo = {
  headers: {
    "x-apikey": "631ef7f7fdc15b0265f172fc",
  },
};
const filterKnapper = document.querySelectorAll("nav button");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMad));
hentData;

function filtrerMad() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis(data);
  header.textContent = this.textContent;
}

let data;
let filter = "alle";

async function hentData() {
  const respons = await fetch(endpoint, mereinfo);
  data = await respons.json();
  vis(data);
}

function vis() {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";

  data.forEach((mad) => {
    //console.log("placering", mad.placering);
    if (filter == mad.placering || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("article").addEventListener("click", () => visMad(mad));
      klon.querySelector(".billede").src = "images/" + mad.billede + ".jpg";
      klon.querySelector(".pris").textContent = mad.pris + " kr.";
      klon.querySelector(".navn").textContent = mad.navn;
      main.appendChild(klon);
    }
  });
}

function visMad(mad) {
  console.log(mad);
  const popop = document.querySelector("#popop");
  popop.style.display = "flex";
  popop.querySelector(".billede").src = "images/" + mad.billede + ".jpg";
  popop.querySelector(".pris").textContent = mad.pris + " kr.";
  popop.querySelector(".navn").textContent = mad.navn;
  popop.querySelector(".langbeskrivelse").textContent = mad.langbeskrivelse;
  popop.addEventListener("click", () => (popop.style.display = "none"));
}
hentData();
