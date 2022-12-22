const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionMensajes = document.getElementById("resultado")

const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const ataqueDelJugador = document.getElementById("ataque-del-jugador")
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

const anchoMaximoDelMapa = 350

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigo = [] 
let ataqueJugador = []
let botones = []
let ataqueEnemigo = []
let opcionesDeMokepones
let ataquesMokepon
let ataqueMokeponEnemigo
let tipoJugador
let tipoEnemigo
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputPydos
let inputTucapalma
let inputLangostelvis
let mascotaJugador
let mascotJugadorObjeto
let mascotaEnemigoTipo
let botonFuego
let botonAgua 
let botonTierra
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, tipo, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.tipo = tipo
        this.ataques = []
        this.ancho = 50
        this.alto = 50
        this.x = aleatoreo(0, mapa.width - this.ancho)
        this.y = aleatoreo(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/agua.png", 5, "AGUA", "./assets/hipodoge-cabeza.png")
let capipepo = new Mokepon("Capipepo", "./assets/tierra.png", 5, "TIERRA", "./assets/capipepo-cabeza.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/fuego.png", 5, "FUEGO","./assets/ratigueya-cabeza.png")
let pydos = new Mokepon("Pydos", "./assets/pydos.png", 5, "AGUA", "./assets/pydos.png")
let tucapalma = new Mokepon("Tucapalma", "./assets/tucapalma.png", 5, "TIERRA", "./assets/tucapalma.png")
let langostelvis = new Mokepon ("Langostelvis", "./assets/langostelvis.png", 5, "FUEGO", "./assets/langostelvis.png")

const HIPODOGE_ATAQUES = [
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
]

const  CAPIPEPO_ATAQUES = [
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
]

const RATIGUEYA_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
]

const PYDOS_ATAQUES = [
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
]

const  TUCAPALMA_ATAQUES = [
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
]

const LANGOSTELVIX_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "🔥", id: "boton-fuego", titulo: "FUEGO"},
    { nombre: "💧", id: "boton-agua", titulo: "AGUA"},
    { nombre: "🍃", id: "boton-tierra", titulo: "TIERRA"},
]
mokepones.push(hipodoge, capipepo, ratigueya, pydos, tucapalma, langostelvis)

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

pydos.ataques.push(...PYDOS_ATAQUES)
tucapalma.ataques.push(...TUCAPALMA_ATAQUES)
langostelvis.ataques.push(LANGOSTELVIX_ATAQUES)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionesDeMokepones = `
            <input type = "radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>`

        contenedorTarjetas.innerHTML += opcionesDeMokepones
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputPydos = document.getElementById("Pydos")
        inputTucapalma = document.getElementById("Tucapalma")
        inputLangostelvis = document.getElementById("Langostelvis")
    })
    reiniciar.style.display = "none"
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
    unirseAlJuego()
}
 
function unirseAlJuego(){
    fetch("http://192.168.1.19:7070/unirse")
        .then(function(res){
            if (res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log("id Jugador "+respuesta)
                        jugadorId = respuesta
                    })
            }
    })
}

function seleccionarMascotaJugador(){
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else if(inputPydos.checked){
        spanMascotaJugador.innerHTML = inputPydos.id
        mascotaJugador = inputPydos.id
    } else if (inputTucapalma.checked){
        spanMascotaJugador.innerHTML = inputTucapalma.id
        mascotaJugador = inputTucapalma.id
    } else if (inputLangostelvis.checked){
        spanMascotaJugador.innerHTML = inputLangostelvis.id
        mascotaJugador = inputLangostelvis.id
    } else {
        alert("Selecciona una mascota")
        return
    }
    sectionSeleccionarMascota.style.display = "none"
    seleccionarMokepon(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.1.19:7070/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataqueMokeponEnemigo = enemigo.ataques
    tipoEnemigo = enemigo.tipo
    console.log("mascota enemigo tipo "+tipoEnemigo) 
    extraerAtaques(mascotaJugador)   
}

function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
            tipoJugador = mokepones[i].tipo
        }
    }
    console.log("Mascota Judador tipo " + tipoJugador)
    mostrarAtaques(ataques, tipoJugador)
    secuenciaAtaque() 
}

function mostrarAtaques(ataques, tipoJugador){
    ataques.forEach((ataque) => {
        ataquesMokepon = ` <button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    if(tipoJugador == "FUEGO" && tipoEnemigo == "TIERRA" ){
        ataquesMokepon = ` <button id="boton-fuego" class="boton-de-ataque BAtaque">🔥</button>`
        contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
    }else if(tipoJugador == "AGUA" && tipoEnemigo == "FUEGO"){
        ataquesMokepon = ` <button id="boton-agua" class="boton-de-ataque BAtaque">💧</button>`
        contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
    } else if(tipoJugador == "TIERRA" && tipoEnemigo == "AGUA"){
        ataquesMokepon = ` <button id="boton-tierra" class="boton-de-ataque BAtaque">🍃</button>`
        contenedorAtaques.innerHTML = ataquesMokepon + contenedorAtaques.innerHTML
    }
    
    botonFuego = document.getElementById("boton-fuego")
    botonTierra = document.getElementById("boton-tierra")
    botonAgua = document.getElementById("boton-agua")
    
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if(e.target.textContent === "🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }else if(e.target.textContent === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }else{
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
    
}

function enviarAtaques(){
    fetch(`http://192.168.1.19:7070/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.1.19:7070/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok) {
                res.json()
                    .then(function({ ataques }){
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}


function ataqueAleatoreoEnemigo(){
    console.log("ataques enemigo ", ataqueMokeponEnemigo)
    let ataqueAleatoreo = aleatoreo(0, ataqueMokeponEnemigo.length - 1)
    ataqueEnemigo.push(ataqueMokeponEnemigo[ataqueAleatoreo].titulo)  
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarMapa(){
    mascotJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
    intervalo = setInterval(pintarCanvas, 50)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y 
    const abajoEnemigo = enemigo.y + enemigo.alto 
    const derechaEnemigo = enemigo.x + enemigo.ancho 
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota = mascotJugadorObjeto.y 
    const abajoMascota = mascotJugadorObjeto.y + mascotJugadorObjeto.alto 
    const derechaMascota = mascotJugadorObjeto.x + mascotJugadorObjeto.ancho
    const izquierdaMascota = mascotJugadorObjeto.x 
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log("Se detecto una colision ")

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

function iniciarPelea(){
    if(ataqueJugador.length === botones.length){
        combate()
    }
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        }else if(ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO" || ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA" || ataqueJugador[index]=="TIERRA" && ataqueEnemigo[index]=="AGUA"){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias()
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function revisarVictorias(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES! Ganaste :) ")
    }else{
        crearMensajeFinal("Lo siento perdiste :(")
    }
}

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado 
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal 
    
    reiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}

function aleatoreo(min, max){
    return Math.floor(Math.random() *(max - min + 1) + min)
}

function pintarCanvas(){
    mascotJugadorObjeto.x = mascotJugadorObjeto.x + mascotJugadorObjeto.velocidadX
    mascotJugadorObjeto.y = mascotJugadorObjeto.y + mascotJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height )
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotJugadorObjeto.x, mascotJugadorObjeto.y)

    mokeponesEnemigo.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function enviarPosicion(x, y){
    fetch(`http://192.168.1.19:7070/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })

    .then(function (res){
        if (res.ok){
            res.json()
                .then(function ({ enemigos }){
                    console.log(enemigos)
                    mokeponesEnemigo = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepon("Hipodoge", "./assets/agua.png", 5, "AGUA", "./assets/hipodoge-cabeza.png", enemigo.id)
                        }else if (mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new Mokepon("Capipepo", "./assets/tierra.png", 5, "TIERRA", "./assets/capipepo-cabeza.png", enemigo.id)
                        }else if (mokeponNombre === "Ratigueya"){
                            mokeponEnemigo = new Mokepon("Ratigueya", "./assets/fuego.png", 5, "FUEGO","./assets/ratigueya-cabeza.png", enemigo.id)
                        }else if (mokeponNombre === "Pydos"){
                            mokeponEnemigo= new Mokepon("Pydos", "./assets/pydos.png", 5, "AGUA", "./assets/pydos.png", enemigo.id)
                        }else if (mokeponNombre === "Tucapalma"){
                            mokeponEnemigo = new Mokepon("Tucapalma", "./assets/tucapalma.png", 5, "TIERRA", "./assets/tucapalma.png", enemigo.id)
                        }else if (mokeponNombre === "Langostelvis"){
                            mokeponEnemigo = new Mokepon ("Langostelvis", "./assets/langostelvis.png", 5, "FUEGO", "./assets/langostelvis.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })
                })
        }
    })
}

function moverDerecha(){
    mascotJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotJugadorObjeto.velocidadX = 0
    mascotJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
        case "w":
            moverArriba()
            break
        case "ArrowDown":
        case "s":
            moverAbajo()
            break
        case "ArrowLeft":
        case "a":
            moverIzquierda()
            break
        case "ArrowRight":
        case "d":
            moverDerecha()
            break
        default:
            break
    }
}

window.addEventListener("load", iniciarJuego)