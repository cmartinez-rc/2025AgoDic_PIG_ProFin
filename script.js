let casillas = 6;
let estadoJuego = "configurando"
const jugadores = [
    {
        jugador: 1,
        nombre: "el martines",
        color: "#0e26ffff"
    },
    {
        jugador: 2,
        nombre: "el se erre siete",
        color: "#ff460eff"
    }
]

const sonidosDerribo = [
    new Audio("recursos/sonidos/sfx01.mp3"),
    new Audio("recursos/sonidos/sfx02.mp3"),
    new Audio("recursos/sonidos/sfx03.mp3"),
    new Audio("recursos/sonidos/sfx04.mp3"),
    new Audio("recursos/sonidos/sfx05.mp3"),
    new Audio("recursos/sonidos/sfx06.mp3"),
    new Audio("recursos/sonidos/sfx07.mp3")
]

const tableros = document.querySelector("#tableros")
const contenedorJugadores = document.querySelector("#jugadores")


const generarTableros = () => {
    for (const jugador of jugadores) {

        contenedorJugadores.insertAdjacentHTML("beforeend", `
            
                <div class="jugador">
                    <div class="distintivo" style="background-color: ${jugador.color}"></div>
                    <h3>${jugador.nombre}</h3>
                    <button onclick="asignarBarcosJugador(${jugador.jugador}, this)">Configurar barcos</button>
                </div>
            
            `)


        const HTMLtabla = document.createElement("table")
        HTMLtabla.style.display = "none";
        HTMLtabla.dataset.jugador = jugador.jugador;
        const HTMLcuerpo = document.createElement("tbody")

        for (let i = 0; i < casillas; i++) {
            const HTMLfila = document.createElement("tr")

            for (let j = 0; j < casillas; j++) {
                const HTMLcolumna = document.createElement("td")
                
                
                HTMLcolumna.addEventListener('click', (event) => {

                    if(HTMLcolumna.classList.contains('jugando')){
                        determinarBarco(HTMLcolumna, event)
                        return;
                    }

                    if(HTMLcolumna.classList.contains('barco')){
                        HTMLcolumna.classList.remove('barco')
                    }else{
                        HTMLcolumna.classList.add('barco')
                    }

                })
                
                
                
                HTMLfila.append(HTMLcolumna)
            }

            HTMLcuerpo.append(HTMLfila)
        }

        HTMLtabla.append(HTMLcuerpo)

        tableros.append(HTMLtabla)

    }
}

generarTableros()


const asignarBarcosJugador = ( jugador, nodo ) => {
    const tabla = document.querySelector(`table[data-jugador="${jugador}"]`);
    
    if(nodo.classList.contains('configurando')){
        nodo.classList.remove('configurando')
        nodo.textContent = "Configurar barcos"
        tabla.style.display = "none"
        estadoBotonesJugador(false)
        Swal.close()
    }else{
        nodo.classList.add('configurando')
        nodo.textContent = "Configurando barcos"
        const datosJugador = jugadores.find( j => j.jugador == jugador )
        mensajeJugadorConfigurando( datosJugador )
        tabla.style.display = "block"
        estadoBotonesJugador(true)
    }

    
}

const estadoBotonesJugador = (estado) => {
    const botonesJugador = document.querySelectorAll("aside button:not(.configurando)")
    for (const botonJugador of botonesJugador) {
        botonJugador.disabled = estado;
    }
}

const mensajeJugadorConfigurando = (jugador) => {
    Swal.fire({
        icon: "info",
        html: `<b>${jugador.nombre}</b> está configurando sus barcos`,
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        background: jugador.color,
        customClass: "alerta-jugador",
        width: "100%"
    })
}



/*
document.body.addEventListener('click', (event) => {
    aplicarExplosion()
    setTimeout(() => {
        animarMuerte(event)
    }, 300);
})
*/


const animarMuerte = (event) => {
    sonidosDerribo[Math.floor(Math.random() * sonidosDerribo.length)].play()

    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    
    confetti({
    particleCount: 20,
    origin: {x,y},
    scalar: 4,
    shapes: ["emoji"],
    shapeOptions: {
        emoji: {
            value: ["💀", "🔥", "⚰️"],
        },
        },
    });
}


const aplicarExplosion = () => {
    const explosion = document.createElement('div')
    explosion.classList.add('explosion')
    document.body.append(explosion)

    setTimeout(() => {
        explosion.remove();
    }, 300);
}



const botonComenzar = document.querySelector('#comenzar')
botonComenzar.addEventListener('click', () => {
    estadoJuego = "jugando"

    for (const casilla of document.querySelectorAll('td')) {
        casilla.classList.add('jugando')
    }
})


const determinarBarco = (casilla, event) => {

    if(casilla.classList.contains('barco')){
        aplicarExplosion()
        setTimeout(() => {
            animarMuerte(event)
        }, 300);
        casilla.classList.add('muerto')
    }

}