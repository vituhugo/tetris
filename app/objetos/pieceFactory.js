class PieceFactory {
    static smallSquart(x,y, options) {
        options = options || {};
        options = Object.assign(config.piece, options);
        return Bodies.rectangle(
            x,
            y,
            config.proportion,
            config.proportion,
            options
        );
    }

    static L (x,y, options) {

        let options = options || {};
        options.parts = [
                PieceFactory.smallSquart(x,y),
                PieceFactory.smallSquart(x+25,y),
                PieceFactory.smallSquart(x+50,y),
                PieceFactory.smallSquart(x+50,y+25),
            ];

        return Body.create(options);
    }
    static J (x,y, options) {

        let options = options || {};
        options.parts = [
                PieceFactory.smallSquart(x,y+25),
                PieceFactory.smallSquart(x,y),
                PieceFactory.smallSquart(x+25,y),
                PieceFactory.smallSquart(x+50,y),
            ];

        return Body.create(options);
    }
    static S (x,y, options) {

        let options = options || {};
        options.parts = [
            PieceFactory.smallSquart(x,y),
            PieceFactory.smallSquart(x+25,y),
            PieceFactory.smallSquart(x+25,y+25),
            PieceFactory.smallSquart(x+50,y+25),
        ];

        return Body.create(options);
    }
    static Z (x,y, options) {
        let options = options || {};
        options.parts = [
            PieceFactory.smallSquart(x,y+25),
            PieceFactory.smallSquart(x+25,y+25),
            PieceFactory.smallSquart(x+25,y),
            PieceFactory.smallSquart(x+50,y),
        ];

        return Body.create(options);
    }
    static T (x,y, options) {
        let options = options || {};
        options.parts = [
            PieceFactory.smallSquart(x,y),
            PieceFactory.smallSquart(x+25,y),
            PieceFactory.smallSquart(x+50,y),
            PieceFactory.smallSquart(x+25,y+25),
        ];

        return Body.create(options);
    }
    static O (x,y, options) {
        let options = options || {};
        options.parts = [
            PieceFactory.smallSquart(x,y),
            PieceFactory.smallSquart(x,y+25),
            PieceFactory.smallSquart(x+25,y),
            PieceFactory.smallSquart(x+25,y+25)
        ];

        return Body.create(options);
    }
    static I (x,y, options) {
        let options = options || {};
        options.parts = [
            PieceFactory.smallSquart(x,y),
            PieceFactory.smallSquart(x+25,y),
            PieceFactory.smallSquart(x+50,y),
            PieceFactory.smallSquart(x+75,y),
        ];

        return Body.create(options);
    }

    static random (x,y, options) {
        let method = ['L', 'J', 'S', 'Z', 'T', 'O', 'I'][Math.floor(methods.length*Math.random())];
        return Object.call(PieceFactory, method, arguments);
    }
}