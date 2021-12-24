import { Leon, Lobo, Aguila, Oso, Serpiente } from "./clases/Tipos.js";

const validarFormulario = () => {
  let animal = document.getElementById("animal").value;
  let edad = document.getElementById("edad").value;
  let comentarios = document.getElementById("comentarios").value;
  if (
    animal === "Seleccione un animal" ||
    edad === "Seleccione un rango de años" ||
    comentarios === ""
  ) {
    alert("Rellenar todos los campos");
    return;
  }
};

const crearObjAnimal = (valueAnimal) => {
  let animal = document.getElementById("animal").value;
  let edad = document.getElementById("edad").value;
  let comentarios = document.getElementById("comentarios").value;

  let obj = null;

  switch (valueAnimal.name) {
    case "Leon":
      obj = new Leon(
        animal,
        edad,
        `./assets/imgs/${valueAnimal.imagen}`,
        comentarios,
        valueAnimal.sonido
      );
      break;
    case "Lobo":
      obj = new Lobo(
        animal,
        edad,
        `./assets/imgs/${valueAnimal.imagen}`,
        comentarios,
        valueAnimal.sonido
      );
      break;
    case "Aguila":
      obj = new Aguila(
        animal,
        edad,
        `./assets/imgs/${valueAnimal.imagen}`,
        comentarios,
        valueAnimal.sonido
      );
      break;
    case "Serpiente":
      obj = new Serpiente(
        animal,
        edad,
        `./assets/imgs/${valueAnimal.imagen}`,
        comentarios,
        valueAnimal.sonido
      );
      break;
    case "Oso":
      obj = new Oso(
        animal,
        edad,
        `./assets/imgs/${valueAnimal.imagen}`,
        comentarios,
        valueAnimal.sonido
      );
      break;

    default:
      break;
  }
  return obj;
};

const obtenerDatos = async () => {
  const response = await fetch("./animales.json");

  const json = await response.json();
  return json.animales;
};
// // Función autoejecutante
(async () => {
  const data = await obtenerDatos();
  const arregloAnimales = [];

  let animal = null;

  /** Cargar Imagen */
  document.getElementById("animal").addEventListener("change", (event) => {
    event.preventDefault();
    const { value } = event.target;
    const previewElement = document.getElementById("preview");
    animal = data.find((valueIteracion) => valueIteracion.name === value);
    previewElement.style.backgroundImage = `url(./assets/imgs/${animal.imagen})`;
  });

  /** Agregar */
  document.getElementById("btnRegistrar").addEventListener("click", () => {
    // Validamos
    validarFormulario();

    // Crear instancia
    const objAnimal = crearObjAnimal(animal);
    arregloAnimales.push(objAnimal);
    generarCard(arregloAnimales);
  });
})();

const generarCard = (arregloAnimales) => {
  const divAnimales = document.getElementById("Animales");
  divAnimales.innerHTML = "";

  let cardString = "";
  arregloAnimales.forEach((element, index) => {
    cardString = `
    <div id="div-animal-${index}" class="card">
            <img id="img-animal-${index}" src="${element.img}" class="card-img-top" data-toggle="modal" data-target="#myNewModal">
                <div class="card-body">
                    <a id="btn-animals-sound-${index}" href="#" class="btn btn-secondary d-flex justify-content-center"><i class="fas fa-volume-up fa-2x"></i></a>
                </div>
        </div> `;

    const div = document.createElement("div");
    div.innerHTML = cardString;
    divAnimales.appendChild(div);

    eventAnimalsSound(element, index);
    contentModal(element, index);
  });
};
const contentModal = (element, index) => {

  document.getElementById(`img-animal-${index}`).addEventListener('click', () => {
      const newCard = document.getElementById('modal-body-content');
      newCard.innerHTML = '';
      const div = document.createElement("div");
      const info = `
      <img src="${element.img}" class="img-thumbnail">
      <div class="text-center text-white pt-4">
          <p>Su edad es:</p>
          <br>
          <p>${element.edad}</p>
          <p>Comentarios</p>
          <hr>
          <p>${element.comentarios}</p>
      </div>
      `;
      div.innerHTML = info;
      newCard.appendChild(div);
  });
}

  const eventAnimalsSound = (element, index) => {
    document.getElementById(`btn-animals-sound-${index}`).addEventListener("click", () =>{
      switch (element.nombre) {
        case "Leon":
          element.Rugir();
          break;
        case "Lobo":
          element.Aullar();
          break;
        case "Oso":
          element.Gruñido();
          break;
        case "Serpiente":
          element.Sisear();
          break;
        case "Aguila":
          element.Chillar();
          break;
      }
    });
  };


