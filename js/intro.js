KillMuumi.IntroState = function() {};

KillMuumi.IntroState.prototype = {
    /*
     * Peli luodaan tiedostojen lataamisen jälkeen tässä
     */
    create: function() {
        this.text = this.add.text(this.world.centerX, 
                                  this.world.centerY, 
                                  "KillMuumi\nVuosisadan Muumitapposimulaattori",
                                {
                                    font: "24px",
                                    align: "center",
                                    color: "white"
                                });
    },

    /*
     * Peliä päivitetään n. 60 kertaa sekunnissa tässä
     */
    update: function() {
        if (this.input.keyboard.isDown(Phaser.KeyCode.X)) {
            startGame();
        }
    }
};