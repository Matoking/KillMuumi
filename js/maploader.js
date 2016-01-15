function MapLoader() {
    
}

MapLoader.prototype = {
    loadMap: function(mapName) {
        var state = game.state.getCurrentState();
        state.map = game.add.tilemap(mapName);
        state.map.addTilesetImage("tiles");
        
        state.map.setCollisionBetween(0, 2);
        
        state.mapLayer = state.map.createLayer("Tile Layer 1");
        state.mapLayer.resizeWorld();
    }
};