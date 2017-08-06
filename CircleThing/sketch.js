var arcStorage = [];
var a = 0;
var storageActuel;
var arcColor;
var image;

function preload(){
    img = loadImage("bg1.png");
}

function setup() {
    createCanvas(700, 700);
    frameRate(60);
    strokeWeight(4);
    angleMode(DEGREES);
    colorMode(HSB, 100);
}

function draw() {
    background(img);
    noFill();
    translate(width / 2, height / 2);
    
    if (frameCount % 60 === 1) {
        arcColor = color(random(100), 100, 80);
        storageActuel = a;
        for (var i = 0; i < 4; i++) {
            arcStorage[storageActuel + i] = new ColoredArc(arcColor);
            a++;
        }
    }
    for (var i = 0; i < arcStorage.length; i++) {
        if (arcStorage[i].x < 975) {
            arcStorage[i].allInOne();
        }
    }

}

function ColoredArc(arcColor) {
    this.taille = random(1, 4);
    this.x = 0;
    this.y = 0;
    this.colorArc = arcColor;
    this.z = random(90);
    this.vitesseRotation = random(-0.45, 0.45);
    this.debutRotation = random(360);
    this.finRotation = random(20, 120);

    this.allInOne = function () {
        push();
        this.x += 0.75;
        this.y += 0.75;
        this.z += this.vitesseRotation;

        rotate(this.z)

        stroke(this.colorArc);
        arc(0, 0, this.x, this.y, this.debutRotation, this.debutRotation + this.finRotation);
        pop();
    }
}