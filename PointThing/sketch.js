var pointContain = [];
var pointContainVitesse = [];
var pointContainAcceleration = [];
var differencexa = 0;
var differencexb = 0;
var differenceya = 0;
var differenceyb = 0;
var nombrePointActuelle = 150;
var nombrePoint = 150;
var distanceLigne = 60;
var vitessePoint = 0.02;

function setup() {
    clear();
    pointContain = [];
    pointContainVitesse = [];
    pointContainAcceleration = [];
    createCanvas(windowWidth, windowHeight - 4);
    
    gui = createGui('Panel de valeur');
    sliderRange(10, 500, 10);
    gui.addGlobals('nombrePoint');
    sliderRange(10, 100, 5);
    gui.addGlobals('distanceLigne');
    sliderRange(0.005, 0.1, 0.005);
    gui.addGlobals('vitessePoint');
    
    fill(255);
    stroke(255);
    for (var i = 0; i < nombrePoint; i++) {
        pointContain[i] = createVector(random(width), random(height));
        pointContainVitesse[i] = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    }
    nombrePointActuelle = nombrePoint;
}

function draw() {
    if(nombrePointActuelle != nombrePoint){
        setup();
    }
    
    background(52);

    for (var i = 0; i < pointContain.length; i++) {

        if (pointContain[i].x < 0) {
            pointContain[i].x = width;
        } else if (pointContain[i].x > width) {
            pointContain[i].x = 0;
        }

        if (pointContain[i].y < 0) {
            pointContain[i].y = height;
        } else if (pointContain[i].y > height) {
            pointContain[i].y = 0;
        }

        pointContainAcceleration[i] = createVector(random(-vitessePoint, vitessePoint), random(-vitessePoint, vitessePoint));

        ellipse(pointContain[i].x, pointContain[i].y, 2, 2);

        pointContain[i].x += pointContainVitesse[i].x;
        pointContain[i].y += pointContainVitesse[i].y;
        pointContainVitesse[i].x += pointContainAcceleration[i].x;
        pointContainVitesse[i].y += pointContainAcceleration[i].y;


        for (var j = 0; j < pointContain.length; j++) {

            differencexa = pointContain[i].x - pointContain[j].x;
            differenceya = pointContain[i].y - pointContain[j].y;
            differencexb = pointContain[j].x - pointContain[i].x;
            differenceyb = pointContain[j].y - pointContain[i].y;

            if (differencexa < distanceLigne && differencexa > 0 || differencexb < distanceLigne && differencexb > 0) {
                if (differenceya < distanceLigne && differenceya > 0 || differenceyb < distanceLigne && differenceyb > 0) {
                    line(pointContain[i].x, pointContain[i].y, pointContain[j].x, pointContain[j].y)
                }
            }
        }

    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
}
