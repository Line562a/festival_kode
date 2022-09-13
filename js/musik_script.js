const endpoint = "https://passionfest-9b8b.restdb.io/rest/musikkategori";

const mereinfo = {
  headers: {
    "x-apikey": "631ef7f7fdc15b0265f172fc",
  },
};
const filterKnapper = document.querySelectorAll("button");
filterKnapper.forEach(knap => knap.addEventListener("click", filtrerScene));
hentData;

function filtrerScene() {
filter = this.dataset.scene;
document.querySelector(".valgt").classList.remove("valgt");
this.classList.add("valgt");
vis(data);
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

  data.forEach((artist) => {
    //console.log(artist.scene);
    if (filter == artist.scene || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("article").addEventListener("click", () => visArtist(artist));
      klon.querySelector(".billede").src = "images/" + artist.billede + ".jpg";
      klon.querySelector(".navn").textContent = artist.navn;
      main.appendChild(klon);
    }
  });
}

function visArtist(artist) {
  console.log(artist);
  const popop = document.querySelector("#popop");
  popop.style.display = "flex";
  popop.querySelector(".billede").src = "images/" + artist.billede + ".jpg";
  popop.querySelector(".dato").textContent = artist.dato;
  popop.querySelector(".navn").textContent = artist.navn;
  popop.querySelector(".langbeskrivelse").textContent = artist.langbeskrivelse;
  popop.addEventListener("click", () => (popop.style.display = "none"));
}
hentData();
