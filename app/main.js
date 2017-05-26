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
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

function getSquart(x,y) {
    return Bodies.rectangle(x,y, 25, 25);
}

function getBodyL(x,y) {
    return Body.create({ parts: [
        getSquart(x+25, y+25),
        getSquart(x+50, y+25),
        getSquart(x+75, y+25),
        getSquart(x+75, y+50),
    ]});
}

function getBodyT(x,y) {
    return Body.create({ parts: [
        getSquart(x+25, y+25),
        getSquart(x+50, y+25),
        getSquart(x+75, y+25),
        getSquart(x+50, y+50),
    ]});
}

function getBodyI(x,y) {
    return Body.create({ parts: [
        getSquart(x+25, y+25),
        getSquart(x+50, y+25),
        getSquart(x+75, y+25),
        getSquart(x+100, y+25),
    ]});
}
function getBodyZ(x,y) {
    return Body.create({ parts: [
        getSquart(x+50, y+25),
        getSquart(x+50, y+50),
        getSquart(x+25, y+50),
        getSquart(x+25, y+75),
    ]});
}
function getBodyZReverse(x,y) {
    return Body.create({ parts: [
        getSquart(x+25, y+25),
        getSquart(x+25, y+50),
        getSquart(x+50, y+50),
        getSquart(x+50, y+75),
    ]});
}

function getBodyLReverse(x,y) {
    return Body.create({ parts: [
        getSquart(x+25, y+25),
        getSquart(x+50, y+25),
        getSquart(x+75, y+25),
        getSquart(x+75, y+0),
    ]});
}

function getBodyBigSquart(x,y) {
    return Body.create({ parts: [
        getSquart(x+25, y+25),
        getSquart(x+50, y+25),
        getSquart(x+25, y+50),
        getSquart(x+50, y+50),
    ]});
}

let L = getBodyL(0,0);

// add all of the bodies to the world
World.add(engine.world, [
    L,
    getBodyT(100,0),
    getBodyI(200,0),
    getBodyLReverse(350,0),
    getBodyBigSquart(450,0),
    getBodyZ(525, 0),
    getBodyZReverse(625, 0),
    Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true })
]);

engine.gravity.y = 0;
L.angle
// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
