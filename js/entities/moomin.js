function Moomin(x, y, type) {
    type = typeof type !== 'undefined' ? type : 0;
    
    var state = game.state.getCurrentState();
    
    this.sprite = game.make.sprite(x, y, "player", type);
    
    state.moomins.add(this.sprite);
    
    this.gunTimer = 0;
}

Moomin.prototype = {
    update: function() {
        var state = game.state.getCurrentState();
        
        if (game.time.now > this.gunTimer + 200) {
            var bullet = game.make.sprite(this.sprite.x, this.sprite.y, "bullets", 0);
            
            state.enemyBullets.add(bullet);
            
            bullet.body.allowGravity = false;
            bullet.angle = game.math.angleBetween(50, 500, 0, 0);
            bullet.body.velocity = game.physics.arcade.velocityFromAngle(bullet.angle, 400);
            
            console.log(bullet.body.velocity);
            
            this.gunTimer = game.time.now;
        }
    }
};