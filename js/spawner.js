function Spawner() {
    this.powerupPoints = [];
    this.moominPoints = [];
    
    this.nextSpawn = 0;
    this.totalTime = 0;
}

Spawner.prototype = {
    update: function() {
        this.totalTime += game.time.elapsed;
        
        if (this.totalTime > this.nextSpawn) {
            var state = game.state.getCurrentState();
            
            this.nextSpawn = this.totalTime + 2400 + (Math.random() * 1220) - (Math.min(2000, state.moominsKilled * 90));
            
            var state = game.state.getCurrentState();
            
            if (Math.ceil(Math.random() * 4) <= 3) {
                // Spawn enemy
                var point = Phaser.ArrayUtils.getRandomItem(this.moominPoints);
                
                var moomin = state.moomins.getFirstExists(false);
                
                if (state.moomins.countLiving() >= 50) {
                    return;
                }
                        
                if (moomin === null) {
                    moomin = new Moomin(point.x, point.y);
                    state.moomins.add(moomin);
                } else {
                    moomin.revive();
                    moomin.resetMoomin(point.x, point.y);
                }
                
                console.log("Spawned moomin at " + point.x + "x" + point.y);
            } else {
                var powerupRand = Math.ceil(Math.random() * 12);
                var point = Phaser.ArrayUtils.getRandomItem(this.powerupPoints);
                
                // Check that no powerup exists at this point
                if (state.powerups.filter(function(child, index, children) {
                    return (child.x === point.x && child.y === point.y) ? true : false;
                }, true).list.length > 0) {
                    console.log("Powerup already exists at " + point.x + "x" + point.y);
                    return;
                }
                
                if (powerupRand >= 1 && powerupRand <= 4) {
                    // burana
                    var burana = new Burana(point.x, point.y);
                    state.powerups.add(burana);
                } else if (powerupRand >= 5 && powerupRand <= 7) {
                    // minigun
                    var minigun = new Minigun(point.x, point.y);
                    state.powerups.add(minigun);
                } else if (powerupRand >= 8 && powerupRand <= 11) {
                    // shotgun
                    var shotgun = new Shotgun(point.x, point.y);
                    state.powerups.add(shotgun);
                } else {
                    // A NUKE
                    var nuke = new Nuke(point.x, point.y);
                    state.powerups.add(nuke);
                }
            }
        }
    }
}