// Se agrega el DOM para poder usar estos valores ya que no estaban
const formulario = document.getElementById('formulario');
const entradaUsuario = document.getElementById('entrada-usuario');
const contenedorResultado = document.getElementById('resultado');


const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

// Elementos para mostrar en las clases del HTML
const $n = document.querySelector('#name');       //no había una clase name en el HTML
const $b = document.querySelector('#blog');        
const $l = document.querySelector('.location');    

// Función para mostrar datos
//Sync para que el await de abajo funcione
async function displayUser(username) {
  $n.textContent = 'Cargando...';


//Try y catch para posibles errores que puedan presentarse
  try {
    const response = await fetch(`${usersEndpoint}/${username}`);

    if (!response.ok) {
      throw new Error(`Usuario no encontrado: ${response.status}`);
    }

    const data = await response.json();
//Había información que no se puso en backtics y que parecía cadena de texto
    console.log(data); // Para depurar

    // datos en el DOM
    $n.textContent = data.name || 'Nombre no disponible';
    $b.textContent = data.blog || 'Blog no disponible';
    $l.textContent = data.location || 'Ubicación no disponible';

  } catch (err) {
    handleError(err);
  }
}

// Función para manejar errores
function handleError(err) {
  console.log('¡OH NO!');
  console.log(err);
//Para uso del DOM
  $n.textContent = `Algo salió mal: ${err.message}`;
}

// Puedes llamar esta función directamente o esperar a un formulario
displayUser('stolinski');
