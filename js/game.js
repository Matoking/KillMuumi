var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser-game", {
    preload: preload,
    create: create,
    update: update,
    render: render
});

/*
 * Pelin tiedostot (kuvat, äänet, etc.) esiladataan tässä
 */
function preload() {
    
}

/*
 * Peli luodaan tiedostojen lataamisen jälkeen tässä
 */
function create() {
    game.state.backgroundColor = "#55FFAA";
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