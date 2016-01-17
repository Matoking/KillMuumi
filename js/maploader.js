function MapLoader() {

}

MapLoader.prototype = {
    loadMap: function (mapName) {
        var state = game.state.getCurrentState();
        state.map = game.add.tilemap(mapName);
        state.map.addTilesetImage("tiles");

        state.backgroundLayer = state.map.createLayer("Background Layer");

        state.mapLayer = state.map.createLayer("Main Layer");
        state.mapLayer.resizeWorld();
        
        state.levelObstacles = game.add.physicsGroup();
        
        state.doors = game.add.physicsGroup();

        state.map.setCollision([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], true, "Main Layer");

        // Load objects
        console.log(state.map.objects);

        var objectLayer = state.map.objects["Object Layer 1"];

        console.log(objectLayer);

        for (var i = 0; i < objectLayer.length; i++) {
            var gameObject = objectLayer[i];
            
            var objectX = gameObject.x - (gameObject.x % 32);
            var objectY = gameObject.y - (gameObject.y % 32);

            switch (gameObject.type) {
                case "kello":
                    var kello = game.make.sprite(objectX, objectY, "kello");

                    kello.animations.add("idle", [0, 1, 2, 3, 4, 5], 8, true);
                    kello.animations.play("idle");

                    state.levelObstacles.add(kello);

                    kello.body.allowGravity = false;
                    kello.body.immovable = true;

                    kello.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "takka":
                    var takka = game.make.sprite(objectX + 8, objectY + 6, "takka");

                    takka.animations.add("idle", [0, 1, 2, 3, 4, 5, 6, 7, 8], 8, true);
                    takka.animations.play("idle");

                    state.levelObstacles.add(takka);

                    takka.body.allowGravity = false;
                    takka.body.immovable = true;

                    takka.body.checkCollision = {
                        up: false,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;
                
                case "teevee":
                    var teevee = game.make.sprite(objectX, objectY, "teevee");

                    teevee.animations.add("idle", [0, 1, 2, 3, 4, 5], 8, true);
                    teevee.animations.play("idle");

                    state.levelObstacles.add(teevee);

                    teevee.body.allowGravity = false;
                    teevee.body.immovable = true;

                    teevee.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;
                    
                case "hella":
                    var hella = game.make.sprite(objectX, objectY + 8, "hella");

                    state.levelObstacles.add(hella);

                    hella.body.allowGravity = false;
                    hella.body.immovable = true;

                    hella.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "amme":
                    var amme = game.make.sprite(objectX, objectY, "amme");

                    state.levelObstacles.add(amme);

                    amme.body.allowGravity = false;
                    amme.body.immovable = true;

                    amme.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "keittiokaappi":
                    var keittiokaappi = game.make.sprite(objectX, objectY, "keittiokaappi");

                    state.levelObstacles.add(keittiokaappi);

                    keittiokaappi.body.allowGravity = false;
                    keittiokaappi.body.immovable = true;

                    keittiokaappi.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "kirjahylly":
                    var kirjahylly = game.make.sprite(objectX, objectY, "kirjahylly");

                    state.levelObstacles.add(kirjahylly);

                    kirjahylly.body.allowGravity = false;
                    kirjahylly.body.immovable = true;

                    kirjahylly.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "laatikko":
                    var laatikko = game.make.sprite(objectX, objectY, "laatikko");

                    state.levelObstacles.add(kirjahylly);

                    laatikko.body.allowGravity = false;
                    laatikko.body.immovable = true;

                    laatikko.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "pesukone":
                    var pesukone = game.make.sprite(objectX + 14, objectY + 13, "pesukone");

                    state.levelObstacles.add(pesukone);

                    pesukone.body.allowGravity = false;
                    pesukone.body.immovable = true;

                    pesukone.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;
                    
                case "poyta":
                    var poyta = game.make.sprite(objectX, objectY, "poyta");

                    state.levelObstacles.add(poyta);

                    poyta.body.allowGravity = false;
                    poyta.body.immovable = true;

                    poyta.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;


                case "sanky":
                    var sanky = game.make.sprite(objectX, objectY + 17, "sanky");

                    state.levelObstacles.add(sanky);

                    sanky.body.allowGravity = false;
                    sanky.body.immovable = true;

                    sanky.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "taululaiva":
                    var taululaiva = game.make.sprite(objectX, objectY, "taululaiva");

                    state.levelObstacles.add(taululaiva);

                    taululaiva.body.allowGravity = false;
                    taululaiva.body.immovable = true;

                    taululaiva.body.checkCollision = {
                        up: false,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;


                case "taulumetsa":
                    var taulumetsa = game.make.sprite(objectX, objectY, "taulumetsa");

                    state.levelObstacles.add(taulumetsa);

                    taulumetsa.body.allowGravity = false;
                    taulumetsa.body.immovable = true;

                    taulumetsa.body.checkCollision = {
                        up: false,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "tietokonepoyta":
                    var tietokonepoyta = game.make.sprite(objectX, objectY, "tietokonepoyta");

                    state.levelObstacles.add(tietokonepoyta);

                    tietokonepoyta.body.allowGravity = false;
                    tietokonepoyta.body.immovable = true;

                    tietokonepoyta.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "tuoli":
                    var tuoli = game.make.sprite(objectX, objectY, "tuoli");

                    state.levelObstacles.add(tuoli);

                    tuoli.body.allowGravity = false;
                    tuoli.body.immovable = true;

                    tuoli.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;
                    
                case "vaatekaappi":
                    var vaatekaappi = game.make.sprite(objectX, objectY, "vaatekaappi");

                    state.levelObstacles.add(vaatekaappi);

                    vaatekaappi.body.allowGravity = false;
                    vaatekaappi.body.immovable = true;

                    vaatekaappi.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "wc":
                    var wc = game.make.sprite(objectX, objectY, "wc");

                    state.levelObstacles.add(wc);

                    wc.body.allowGravity = false;
                    wc.body.immovable = true;

                    wc.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;

                case "wcpeili":
                    var wcpeili = game.make.sprite(objectX, objectY, "wcpeili");

                    state.levelObstacles.add(wcpeili);

                    wcpeili.body.allowGravity = false;
                    wcpeili.body.immovable = true;

                    wcpeili.body.checkCollision = {
                        up: false,
                        left: false,
                        right: false,
                        down: false
                    };
                    break;


                case "player":
                    state.player = new Player(objectX, objectY);
                    break;
                    
                case "ovi":
                    var ovi = new Door(objectX, objectY);
                    state.doors.add(ovi);
                    break;
                    
                case "powerup_spawn":
                    state.spawner.powerupPoints.push({x: objectX,
                                                      y: objectY});
                    break;
                    
                case "enemy_spawn":
                    state.spawner.moominPoints.push({x: objectX,
                                                     y: objectY});
                    break;
            }
        }
    }
};






