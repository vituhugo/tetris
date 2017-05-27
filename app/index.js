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
        result.density = .1;
        result.frictionAir = .25;
        result.friction = .6;
        result.mass = 10;
        result.isStatic = true;
        result.restitution = .5;
        return result;
    }
};
})(Body, Bodies);


// add all of the bodies to the world
World.add(engine.world, [
    Bodies.rectangle(200, 600, 300, 50.5, { isStatic: true })
]);

// engine.gravity.y = 0;

let next_piece, piece, py;

function next() {

    if (next_piece) {
        Body.setPosition(next_piece, {x: 100, y: 100 });
        next_piece.isStatic = false;
    }

    piece = next_piece;
    next_piece = GameFactory.rand(500, 150);

    World.add(engine.world, [next_piece]);
}

Matter.Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(pair=> {
            if (pair.bodyA.parent === piece || pair.bodyB.parent === piece) {
                next()
            }
        }
    )
});

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
    console.log(code);
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
    }
});

next();next();
