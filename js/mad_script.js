const endpoint = "https://passionfest-9b8b.restdb.io/rest/madkategori";

const mereinfo = {
  headers: {
    "x-apikey": "631ef7f7fdc15b0265f172fc",
  },
};
const filterKnapper = document.querySelectorAll("nav button");

let data;
let filter = "alle";

    //Henter JSON
async function hentData() {
  const respons = await fetch(endpoint, mereinfo);
  data = await respons.json();
  vis(data);
}

    //Viser alt content
function vis() {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";

    //Duplikerer alle "kasser" flere gange, med nyt indhold 
  data.forEach((mad) => {
    if (filter == mad.placering || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("article").addEventListener("click", () => visMad(mad));
      klon.querySelector(".billede").src = "images/" + mad.billede + ".webp";
      klon.querySelector(".pris").textContent = mad.pris + " kr.";
      klon.querySelector(".navn").textContent = mad.navn;
      main.appendChild(klon);
    }
  });
}

    //Klikbar popop funktion
function visMad(mad) {
  console.log(mad);
  const popop = document.querySelector("#popop");
  popop.style.display = "flex";
  popop.querySelector(".billede").src = "images/" + mad.billede + ".webp";
  popop.querySelector(".pris").textContent = mad.pris + " kr.";
  popop.querySelector(".navn").textContent = mad.navn;
  popop.querySelector(".langbeskrivelse").textContent = mad.langbeskrivelse;
  popop.addEventListener("click", () => (popop.style.display = "none"));
}
hentData();
