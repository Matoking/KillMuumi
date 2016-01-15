var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var player;

/*
 * Pelin tiedostot (kuvat, äänet, etc.) esiladataan tässä
 */
function preload() {
    game.load.image('testiKuva', 'assets/img/shite.png');
}

/*
 * Peli luodaan tiedostojen lataamisen jälkeen tässä
 */
function create() {
    game.state.backgroundColor = "#55FFAA";
    
    player = game.add.sprite(40, 40, "testiKuva");
}

/*
 * Peliä päivitetään n. 60 kertaa sekunnissa tässä
 */
function update() {
    
}

/*
 * Ylimääräiset renderöinnit tähän
 */
function render() {
    
}