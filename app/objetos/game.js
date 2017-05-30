window.Engine = Matter.Engine;
window.Render = Matter.Render;
window.Runner = Matter.Runner;
window.Body = Matter.Body;
window.Constraint = Matter.Constraint;
window.MouseConstraint = Matter.MouseConstraint;
window.Mouse = Matter.Mouse;
window.World = Matter.World;
window.Bodies = Matter.Bodies;

class Game {
    constructor(element) {

        // create an engine
        this.engine = Engine.create();

        // create a renderer
        this.engine = Render.create({
            element: element,
            engine: this.engine,
            options: {
                width: Math.min(element.clientWidth, 800),
                height: Math.min(element.clientHeight, 600)
            }
        });
        // create runner
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);

        // run the engine
        Engine.run(this.engine);

        // run the renderer
        Render.run(this.render);
    }
}