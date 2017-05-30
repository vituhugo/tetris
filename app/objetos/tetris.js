config = {};

config.piece.airFriction = .25;
config.piece.acelerateAirFriction = .15;
config.proportion = 25;
config.piece.density = .5;
config.piece.friction =


class Tetris extends Game {

    init() {
        this.renderMap();
    }

    matchStart() {
        this.brick_preview = PieceFactory.random();
        this.nextBrick();
    }

    renderMap() {
        let floor = Bodies.rectangle(200, 600, 300, 50.5, { isStatic: true });
        let sensor_piece_out = Bodies.rectangle(400, 710, 850, 20, { isSensor: true, isStatic: true });
        floor.friction = config.piece.friction*20;
        World.add(this.engine.world, [
            floor,
            sensor_piece_out
        ]);
    }

    nextBrick() {
        this.brick = this.brick_preview;
        this.brick.isStatic = false;

        this.brick_preview = PieceFactory.random();
        World.add(this.engine.world, [this.brick_preview]);
    }
}