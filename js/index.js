// objeto que define el estado inicial del juego, incluyendo estadísticas del jugador, mapa y enemigos
const defaultGameState={
    player: {
        name: "Luigi", // nombre del jugador
        health: 100, // salud actual del jugador
        strength: 6, // fuerza base del jugador
        strengthBonus: 0, // bonificación de fuerza
        defense: 5, // defensa base del jugador
        defenseBonus: 0, // bonificación de defensa
        currentRoom: 1, // ID de la sala actual del jugador
        gold: 50, // cantidad de oro del jugador
        potions: 2 // número de pociones del jugador
    },

    // objeto map que tiene los objeto que representan salas y enemigos
    map:{
        rooms: [
            {
                id: 1, // identificador único de la sala
                monsterProb: 0.0, // probabilidad de encontrar un monstruo
                isShop: false, // boleano que dice si la sala es una tienda
                name: "Entrada principal", // nombre de la sala
                description: "", // descripción de la sala
                north: null, // ID de la sala contigua en esa dirección
                south: null, // ID de la sala contigua en esa dirección
                west: null,
                east: null,
                img: "img/scenaries/entrada-principal.png" // ruta de la imagen de la sala
            },
            {
                id: 2, // identificador único de la sala
                monsterProb: 0.1, // probabilidad de encontrar un monstruo
                isShop: false, // boleano que dice si la sala es una tienda
                name: "Ascensor", // nombre de la sala
                description: "Lujoso vestíbulo Art Déco en tonos púrpura. Sillones y atriles flanquean la puerta del ascensor, un oasis de calma antes del horror.", // descripción de la sala
                north: 2, // ID de la sala contigua en esa dirección
                south: null, // ID de la sala contigua en esa dirección
                west: null, // ID de la sala contigua en esa dirección
                east: null, // ID de la sala contigua en esa dirección
                img: "img/scenaries/ascensor.png" // ruta de la imagen de la sala
            },
            {
                id: 3,
                monsterProb: 0.4,
                isShop: false,
                name: "Pasillo principal",
                description: "Pasillo estrecho y oscuro. Alfombra roja sobre mármol. Una única luz rojiza proyecta sombras largas y claustrofóbicas hacia una puerta distante.",
                north: 3,
                south: 1,
                west: 4,
                east: 5,
                img: "img/scenaries/pasillo.png"
            },
            {
                id: 4,
                monsterProb: 0.6,
                isShop: false,
                name: "Puerta reloj",
                description: "Imponente escalera victoriana. Un gran reloj antiguo se sitúa sobre la majestuosa puerta central, indicando una hora indeterminada. Ambiente de opulencia en ruinas.",
                north: null,
                south: 2,
                west: null,
                east: null,
                img: "img/scenaries/puerta-reloj.png"
            },
            {
                id: 5,
                monsterProb: 0.0,
                isShop: true,
                name: "Laboratorio del profesor",
                description: "Centro de operaciones caótico y tecnológico. Múltiples pantallas rojas y verdes emiten una luz neón sobre consolas repletas de botones y equipos industriales.",
                north: null,
                south: null,
                west: null,
                east: 2,
                img: "img/scenaries/laboratorio.png"
            },
            {
                id: 6,
                monsterProb: 0.3,
                isShop: false,
                name: "Salón",
                description: "Elegante salón púrpura bañado en luz lunar azul. Globos negros con caras de fantasmas flotan sobre el juego de té, creando un ambiente siniestro pero elegante.",
                north: null,
                south: null,
                west: 2,
                east: null,
                img: "img/scenaries/salon.png"
            },
            {
                id: 7,
                monsterProb: 0.75,
                isShop: false,
                name: "Sala de la Puerta Noble",
                description: "Dos armaduras imponentes custodian una misteriosa puerta iluminada. El aire vibra con una energía inquietante.",
                north: null,
                south: 5,
                west: null,
                east: null,
                img: "img/scenaries/sala-puerta-noble.png"
            }
        ],

        enemies: [
            {
                name: "Armoured greenie", // nombre del enemigo
                isBoss: false, // si el enemigo es un jefe
                health: 80, // salud del enemigo
                strength: 12, // fuerza del enemigo
                defence: 10, // defensa del enemigo
                img: "img/characters/armoured-greenie.png" // ruta de la imagen del enemigo
            },
            {
                name: "Gobber",
                isBoss: false,
                health: 40,
                strength: 6,
                defence: 3,
                img: "img/characters/gobber.png"
            },
            {
                name: "Goob",
                isBoss: false,
                health: 25,
                strength: 4,
                defence: 2,
                img: "img/characters/goob.png"
            },
            {
                name: "King Boo",
                isBoss: true,
                health: 220,
                strength: 25,
                defence: 15,
                img: "img/characters/King_boo.png"
            },
            {
                name: "Poltergeist",
                isBoss: false,
                health: 60,
                strength: 10,
                defence: 5,
                img: "img/characters/poltergeist.png"
            },
            {
                name: "Slammer",
                isBoss: false,
                health: 100,
                strength: 16,
                defence: 12,
                img: "img/characters/slammer.png"
            },
            {
                name: "Steward",
                isBoss: false,
                health: 55,
                strength: 9,
                defence: 4,
                img: "img/characters/steward.png"
            }
        ],
    }
}

// obtiene referencias a los elementos del DOM para mostrar la información del juego
let heroDiv = document.getElementById("heroDiv");
let salaDiv = document.getElementById("salaDiv");
let enemigoDin = document.getElementById("enemigoDiv");

// accede al objeto player dentro de defaultGameState para obtener las estadísticas
function mostrarHeroe(){
    let hero = defaultGameState.player;

    heroDiv.innerHTML = `
        <h2>${hero.name}</h2>
        <p>Salud: ${hero.health}</p>
        <p>Fuerza: ${hero.strength}</p>
        <p>Defensa: ${hero.defense}</p>
        <p>Cuarto actual: ${hero.currentRoom}</p>
        <p>Oro: ${hero.gold}</p>
        <p>Posiones: ${hero.potions}</p>
    `
}

// muestra la información de una sala aleatoria en la interfaz
function mostrarSala(){
    let rooms = defaultGameState.map.rooms;
    let randomRoom;

    // elige un índice aleatorio del array de salas
    randomRoom = rooms[Math.floor(Math.random() * rooms.length)];

    salaDiv.innerHTML = `
        <img src="${randomRoom.img}" alt="${randomRoom.name}">
        <h2>${randomRoom.name}</h2>
        <p>ID: ${randomRoom.id}</p>
        <p>Probabilidad de enemigo: ${randomRoom.monsterProb}</p>
        <p>Tienda: ${randomRoom.isShop}</p>
        <p>${randomRoom.description}</p>
        <p>Norte: ${randomRoom.north}</p>
        <p>Sur: ${randomRoom.south}</p>
        <p>Este: ${randomRoom.east}</p>
        <p>Oeste: ${randomRoom.west}</p>
    `;
}

// muestra la información de un enemigo aleatorio en la interfaz
function mostrarEnemigo(){
    let enemies = defaultGameState.map.enemies;
    let randomEnemy;

    
    // elige un índice aleatorio del array de enemigos
    randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    enemigoDiv.innerHTML = `
        <img src="${randomEnemy.img}" alt="${randomEnemy.name}">
        <h2>${randomEnemy.name}</h2>
        <p>Salud: ${randomEnemy.health}</p>
        <p>Fuerza: ${randomEnemy.strength}</p>
        <p>Defensa: ${randomEnemy.defence}</p>
    `;
}