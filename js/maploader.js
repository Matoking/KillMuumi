function MapLoader() {

}

MapLoader.prototype = {
    loadMap: function (mapName) {
        var state = game.state.getCurrentState();
        state.map = game.add.tilemap(mapName);
        state.map.addTilesetImage("tiles");

        state.map.setCollision([0, 1, 2, 3, 4, 8, 11, 13, 14, 16, 17, 18]);

        state.mapLayer = state.map.createLayer("Tile Layer 1");
        state.mapLayer.resizeWorld();

        // Load objects
        console.log(state.map.objects);

        var objectLayer = state.map.objects["Object Layer 1"];

        console.log(objectLayer);

        for (var i = 0; i < objectLayer.length; i++) {
            var gameObject = objectLayer[i];
            console.log(gameObject);

            var objectX = gameObject.x - (gameObject.x % 32);
            var objectY = gameObject.y - (gameObject.y % 32);

            switch (gameObject.type) {
                case "kello":
                    var kello = game.make.sprite(objectX, objectY, "kello");

                    kello.animations.add("idle", [0, 1, 2, 3, 4, 5], 8, true);
                    kello.animations.play("idle");

                    var clock = game.make.sprite(objectX, objectY, "kello");

                    clock.animations.add("idle", [0, 1, 2, 3, 4, 5], 8, true);
                    clock.animations.add("idle", [0, 1, 2, 3, 4, 5], 8, true);
                    clock.animations.play("idle");

                    state.levelObstacles.add(kello);

                    kello.body.allowGravity = false;
                    kello.body.immovable = true;

                    kello.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };


                    console.log("Clock created at " + objectX + "x" + objectY);
                    break;

                case "hella":
                    var hella = game.make.sprite(objectX, objectY, "hella");

                    state.levelObstacles.add(hella);

                    hella.body.allowGravity = false;
                    hella.body.immovable = true;

                    hella.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };

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

                case "pesukone":
                    var pesukone = game.make.sprite(objectX, objectY, "pesukone");

                    state.levelObstacles.add(pesukone);

                    pesukone.body.allowGravity = false;
                    pesukone.body.immovable = true;

                    pesukone.body.checkCollision = {
                        up: true,
                        left: false,
                        right: false,
                        down: false
                    };
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


                case "sanky":
                    var sanky = game.make.sprite(objectX, objectY, "sanky");

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


                case "player":
                    state.player = new Player(objectX, objectY);
                    break;
            }
        }
    }
};






