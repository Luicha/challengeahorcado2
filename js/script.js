//Primero obtengo los elementos del HTML.
const contenedor = document.getElementById("contenedorPalabra");
const btnStart = document.getElementById("btnStart");
const btnStart2 = document.getElementById("btnStart2");
const letrasUsadasElem = document.getElementById("letrasUsadas");

//Creo el canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.canvas.height = 0;
ctx.canvas.width = 0;

//Esto es para el muñequito pixelado.
const partesCuerpo = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1],
];

let palabraSeleccionada;
let letrasUsadas;
let errores;
let aciertos;

const agregarLetra = letra => {
    const letraElem = document.createElement('span');
    letraElem.innerHTML = letra.toUpperCase();
    letrasUsadasElem.appendChild(letraElem);
}

const agregarCuerpo = parteCuerpo => {
    ctx.fillStyle = '#000';
    ctx.fillRect(...parteCuerpo);
}

const letraIncorrecta = () => {
    agregarCuerpo(partesCuerpo[errores]);
    errores++;
    if(errores === partesCuerpo.length) finJuego();
}

const finJuego = () => {
    document.removeEventListener('keydown', letraEvento);
    btnStart.style.display = 'block';
}

const letraCorrecta = letra => {
    const { children } = contenedor;
    for (let i = 0; i < children.lenght; i++) {
        if(children[i].innerHTML === letra) {
            children[i].classList.toggle('hidden');
            aciertos++;
        }
    }
    if(aciertos === palabraSeleccionada.lenght) finJuego();
};

const inputLetra = letra => {
    if (palabraSeleccionada.includes(letra)) {
        letraCorrecta(letra);
    } else {
        letraIncorrecta();
    }
    agregarLetra(letra);
    letrasUsadas.push(letra);
};

const letraEvento = event => {
    let nuevaLetra = event.key.toUpperCase();
    if(nuevaLetra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(nuevaLetra)) {
        inputLetra(nuevaLetra);
    }
};

const dibujarPalabra = () => {
    palabraSeleccionada.forEach(letra => {
        const letraElem = document.createElement('span');
        letraElem.innerHTML = letra.toUpperCase();
        letraElem.classList.add('letra');
        letraElem.classList.add('hidden');
        contenedor.appendChild(letraElem);
    });
};

const seleccionarPalabra = () => {
    let palabra = palabras[Math.floor((Math.random() * palabras.length))].toUpperCase();
    //Esto me separa la palabra en letras
    palabraSeleccionada = palabra.split('');
};

const crearHorca = () => {
    ctx.canvas.width = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d95d39';
    ctx.fillRect(0,7,4,1);
    ctx.fillRect(1,0,1,8);
    ctx.fillRect(2,0,3,1);
    ctx.fillRect(4,1,1,1);
};

const iniciarJuego = () => {
    letrasUsadas = [];
    errores = 0;
    aciertos = 0;
    contenedor.innerHTML = '';
    letrasUsadasElem.innerHTML = '';
    btnStart.style.display = 'none';
    btnStart2.style.display = 'none';
    crearHorca();
    seleccionarPalabra();
    dibujarPalabra();
    document.addEventListener('keydown', letraEvento);
};

const agregarPalabras = () => {

}


btnStart.addEventListener('click', iniciarJuego);
btnStart2.addEventListener('click', agregarPalabras);