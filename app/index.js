let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.body,
    engine: engine
});

// create runner
let runner = Runner.create();
Runner.run(runner, engine);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);


(function(Body, Bodies) {
GameFactory = {
    _sqrt: function (x,y) {
        return Bodies.rectangle(x,y, 25, 25);
    },
    L: function(x,y) {
        return Body.create({ parts: [
            this._sqrt(x,y),
            this._sqrt(x+25,y),
            this._sqrt(x+50,y),
            this._sqrt(x+50,y+25),
        ]});
    },
    J: function(x,y) {
        return Body.create({ parts: [
            this._sqrt(x,y+25),
            this._sqrt(x,y),
            this._sqrt(x+25,y),
            this._sqrt(x+50,y),
        ]});
    },
    S: function(x,y) {
        return Body.create({ parts: [
            this._sqrt(x,y),
            this._sqrt(x+25,y),
            this._sqrt(x+25,y+25),
            this._sqrt(x+50,y+25),
        ]});
    },
    Z: function(x,y) {
        return Body.create({ parts: [
            this._sqrt(x,y+25),
            this._sqrt(x+25,y+25),
            this._sqrt(x+25,y),
            this._sqrt(x+50,y),
        ]});
    },
    T: function(x,y) {
        return Body.create({ parts: [
            this._sqrt(x,y),
            this._sqrt(x+25,y),
            this._sqrt(x+50,y),
            this._sqrt(x+25,y+25),
        ]});
    },
    O: function(x,y) {
        return Body.create({ parts: [
            this._sqrt(x,y),
            this._sqrt(x,y+25),
            this._sqrt(x+25,y),
            this._sqrt(x+25,y+25)
        ]});
    },
    I: function(x,y) {
        return Body.create({ parts: [
            this._sqrt(x,y),
            this._sqrt(x+25,y),
            this._sqrt(x+50,y),
            this._sqrt(x+75,y),
        ]});
    },

    rand: function(x,y) {
        let methods = ['L', 'J', 'S', 'Z', 'T', 'O', 'I'];
        let rand_index = Math.round((methods.length)*Math.random()-0.5000000000000001);
        let result = this[methods[rand_index]](x,y);
        result.frictionAir = .25;
        result.friction = .1;
        result.isStatic = true;
        result.density = .01;
        result.restitution = 0.01;
        return result;
    }
};
})(Body, Bodies);


// add all of the bodies to the world
let floor = Bodies.rectangle(200, 600, 300, 50.5, { isStatic: true });
let sensor_piece_out = Bodies.rectangle(400, 710, 850, 20, { isSensor: true, isStatic: true });
floor.friction = 10;
World.add(engine.world, [
    floor,
    sensor_piece_out
]);

// engine.gravity.y = 0;

let next_piece, piece;

function next() {
    if (piece) {
        piece.density = 0.95;
    }

    if (next_piece) {
        Body.setPosition(next_piece, {x: 100, y: 100 });
        next_piece.isStatic = false;
    }

    piece = next_piece;
    next_piece = GameFactory.rand(500, 150);

    World.add(engine.world, [next_piece]);
}


let count_piece_out = 0;
Matter.Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(pair=> {
        if (pair.bodyA === sensor_piece_out) {
            if (pair.bodyB.parent.out) return;

            pair.bodyB.parent.out = true;
            ++count_piece_out;
            count_piece_out === 3 && lose();
        }
        else if (pair.bodyB === sensor_piece_out) {
            if (pair.bodyA.parent.out) return;

            pair.bodyA.parent.out = true;
            ++count_piece_out;
            count_piece_out === 3 && lose();
        }
        if (pair.bodyA.parent === piece || pair.bodyB.parent === piece) {
            Body.setVelocity(piece, {x: 0, y:0});
            count_piece_out !== 3 && next()
        }

    })
});

function lose() {
    window.location.reload();
}

let down = [];
let down_interval = [];
function walk(left) {
    Body.setVelocity(piece, { x: left ? -5 : 5, y: piece.velocity.y });
}
function hit(left) {
    Body.setVelocity(piece, { x: left ? -15 : 15, y: piece.velocity.y });
}
document.addEventListener('keydown', function (event) {
    const code = event.keyCode;
    if (down[code] === 1) return;
    if (code === 39) {
        if (event.ctrlKey) return hit();
        walk();
        down_interval[code] = setInterval(() => walk(),100);
    } else if (code === 37) {
        if (event.ctrlKey) return hit(true);
        walk(true);
        down_interval[code] = setInterval(() => walk(true),100);
    } else if (code === 32) {
        piece.isStatic = !piece.isStatic;
    } else if (code === 81) {
        Body.setAngle(piece, piece.angle+Math.PI/2)
    } else if (code === 87) {
        Body.setAngle(piece, piece.angle-Math.PI/2)
    } else if (code === 40) {
        piece.frictionAir = 0.10;
    }
    down[code] = 1
});

document.addEventListener('keyup', function (event) {
    const code = event.keyCode;
    down[code] = 0;
    down_interval[code] && clearInterval(down_interval[code]);

    if (code === 40) {
        piece.frictionAir = 0.25;
    } else if (code === 39) {
        Body.setVelocity(piece, { x: 0, y: piece.velocity.y });
    } else if (code === 37) {
        Body.setVelocity(piece, { x: 0, y: piece.velocity.y });
    }
});

next();next();
