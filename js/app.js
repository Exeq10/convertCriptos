const moneda = document.getElementById("moneda");
const cripto = document.getElementById("cripto");
const button = document.getElementById("button");
const body = document.getElementById("body");
const modal = document.getElementById("modal");
const spinner = document.getElementById("spinner");

document.addEventListener("DOMContentLoaded", () => {
  disabled(true);
  loadCriptos();
});

function disabled(param) {
  button.disabled = param;
}
/* CARGAR CRIPTOS */
function loadCriptos() {
  fetch(
    `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
  )
    .then((response) => response.json())
    .then((data) => {
      let criptos = data.Data;

      criptos.forEach((element) => {
        cripto.innerHTML += `<option value='${element.CoinInfo.Name}'>${element.CoinInfo.FullName}</option>`;
      });
    })
    .catch((err) => console.log(err))
    .finally((res) => console.log("Se cargaron las criptos"));
}

/* DETECTA  VALOR EN INPUT  */
let criptoMoneda;
const checkCripto = () => {
  criptoMoneda = cripto.value;
  return criptoMoneda;
};

let monedaFisica;

const checkMoneda = () => {
  monedaFisica = moneda.value;
  return monedaFisica;
};

const container = document.querySelector(".container");

/* VERIFICA VALORES Y ACTIVA EL BOTON */

const verify = () => {
  checkMoneda();
  checkCripto();

  if (monedaFisica != "--Moneda--" && criptoMoneda != "--Criptos--") {
    disabled(false);
  }
};

const ConsultarApi = () => {
  spinner.classList.add("spinner");
  spinner.innerHTML = `<div class="cube1"></div>
    <div class="cube2"></div>`;
  moneda.value = "--Moneda--";
  cripto.value = "--Criptos--";
  disabled(true);
  fetch(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${monedaFisica}`
  )
    .then((res) => res.json())
    .then((data) => {
      spinner.innerHTML = "";
      spinner.classList.remove("spinner");
      const conversion = data.DISPLAY[criptoMoneda][monedaFisica];

      const { PRICE, HIGH24HOUR, LOW24HOUR, LASTUPDATE, IMAGEURL } = conversion;

      modal.classList.add("modal-m");
      modal.innerHTML = ` 

      
      <h2>${criptoMoneda}</h2>
      <p>Precio : <span>${PRICE}</span></p>
      <p>Precio mas alto 24hs : <span>${HIGH24HOUR}</span></p>
      <p>Precio mas bajo 24hs : <span>${LOW24HOUR}</span></p>
      <button class="btn-cerrar" onclick="cerrar()">X</button>

      <p class="update">Actualizado:<span> Justo ahora</span></p>
    `;

      body.appendChild(modal);
    });
};

const cerrar = () => {
  modal.innerHTML = "";
  modal.classList.remove("modal-m");
};
