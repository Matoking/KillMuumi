function MapLoader() {
    
}

MapLoader.prototype = {
    loadMap: function(imageFile) {
        var state = game.state.getCurrentState();
        state.map = game.add.tilemap(null, 32, 32, 32, 32);
        state.map.addTilesetImage("tiles");
        
        var mapImage = game.make.sprite(0,0, imageFile);
        
        var bitmapData = game.add.bitmapData(32, 32);
        bitmapData.draw(mapImage);
        bitmapData.update();
        
        var mapWidth = bitmapData.width * 32;
        var mapHeight = bitmapData.height * 32;
        
        for (var x= 0; x < bitmapData.width; x++) {
            for (var y = 0; y < bitmapData.height; y++) {
                var pixel = bitmapData.getPixelRGB(x, y);
                
                if (pixel.r === 0 && pixel.g === 0 && pixel.b === 0) {
                    var tile = game.make.sprite(mapWidth - (x*32)-32, mapHeight - (y*32)-32, "testiKuva");
                    
                    state.levelObstacles.add(tile);
                    tile.body.allowGravity = false;
                    tile.body.immovable = true;
                }
            }
        }
    }
};