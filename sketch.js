let penColor = "white";
let traceMode = false;
let nameToTrace = "";
let letterIndex = 0;
let tracing = false;
let userTracing = false;
let tracedPoints = [];

function setup() {
    let canvas = createCanvas(710, 400);
    canvas.parent("canvas-container");
    background("#2E8B57"); // Chalkboard background color
    textFont("Ink Free");
    textSize(72);
    textAlign(CENTER, CENTER);
    noLoop();
}

function draw() {
    if (traceMode) {
        background("#2E8B57");
        fill(255);
        noFill();
        stroke(penColor);

        let letterSpacing = width / (nameToTrace.length + 1);
        for (let i = 0; i <= letterIndex; i++) {
            text(nameToTrace[i], letterSpacing * (i + 1), height / 2);
        }
    }

    if (userTracing && mouseIsPressed) {
        stroke(penColor);
        line(mouseX, mouseY, pmouseX, pmouseY);
        tracedPoints.push({ x: mouseX, y: mouseY });
        checkIfTracedCorrectly();
    }
}

function traceName() {
    let input = document.getElementById("name-input").value.trim();
    if (input) {
        nameToTrace = input;
        traceMode = true;
        letterIndex = 0;
        tracing = true;
        tracedPoints = [];
        redraw();
        startTracingAnimation();
    }
}

function startTracingAnimation() {
    if (tracing && letterIndex < nameToTrace.length) {
        setTimeout(() => {
            letterIndex++;
            redraw();
            startTracingAnimation();
        }, 300);
    } else {
        tracing = false;
    }
}

function enableDrawing() {
    traceMode = false;
    tracing = false;
    userTracing = true;
    tracedPoints = [];
    loop();
}

function resetCanvas() {
    background("#2E8B57");
    noLoop();
    document.getElementById("congrats-message").style.display = "none";
    userTracing = false;
}

function changePenColor(color) {
    penColor = color;
}

function checkIfTracedCorrectly() {
    let letterSpacing = width / (nameToTrace.length + 1);
    let correct = true;

    for (let i = 0; i < nameToTrace.length; i++) {
        let letterX = letterSpacing * (i + 1);
        let letterY = height / 2;
        let letterArea = {
            x1: letterX - 36,
            x2: letterX + 36,
            y1: letterY - 36,
            y2: letterY + 36
        };

        if (!tracedPoints.some(pt => pt.x >= letterArea.x1 && pt.x <= letterArea.x2 && pt.y >= letterArea.y1 && pt.y <= letterArea.y2)) {
            correct = false;
            break;
        }
    }

    if (correct) {
        document.getElementById("congrats-message").style.display = "block";
        document.getElementById("applause-sound").play();
        noLoop();
    }
}
