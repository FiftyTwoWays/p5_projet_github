var densitySlider;
var colorSlider;
var couche = 0;
var premiereRotation = true;
var rotationActuel = 1;
var rotationSuivante;
var yPos;
var sizeCanvas;
var frameConteur = 0;
var densitySliderValue;

var Vitesse_Defilement_Couleur = 1;
var Densite_de_la_rosace = 0;
var Defilement_couleur = true;
var Type_de_rosace = 0;
var gui;


function setup() {
    frameRate(10);
    createCanvas(windowWidth, windowHeight - 4);
    colorMode(HSB, 100);
    noFill();
    angleMode(DEGREES);
    sizeCanvas = height / 2 - 100;

    gui = createGui('Panel de valeur');
    sliderRange(0.1, 3, 0.1);
    gui.addGlobals('Defilement_couleur', 'Vitesse_Defilement_Couleur');
    sliderRange(0, 6, 1);
    gui.addGlobals('Densite_de_la_rosace');
    sliderRange(0, 1, 0);
    gui.addGlobals('Type_de_rosace');
}

function draw() {
    if (Defilement_couleur) {
        if (frameConteur > 100) {
            frameConteur -= 100;
        }
        stroke(frameConteur, 100, 70);
        frameConteur += Vitesse_Defilement_Couleur;
    } else {
        stroke(255);
    }

    translate(width / 2, height / 2);
    background(20);
    yPos = sqrt(3) / 2 * sizeCanvas;

    ellipse(0, 0, sizeCanvas * 2, sizeCanvas * 2);

    if (Type_de_rosace === 0) {
        // Arc
        showArc();

        while (couche < Densite_de_la_rosace) {
            for (var i = 0; i < pow(2, couche); i++) {
                if (premiereRotation === true) {
                    rotate(90 / rotationActuel);
                    rotationSuivante = rotationActuel * 1.5;
                    rotationActuel = rotationActuel * 2;
                    premiereRotation = false;
                } else {
                    rotate(90 / rotationSuivante);
                }
                showArc();
            }
            couche++;
            premiereRotation = true;
        }
        rotationActuel = 1;
        rotationSuivante = 0;
        couche = 0;
    } else if (Type_de_rosace === 1) {
        // Circle
        showCircle();

        while (couche < Densite_de_la_rosace) {
            for (var i = 0; i < pow(2, couche); i++) {
                if (premiereRotation === true) {

                    rotate(rotation);
                    premiereRotation = false;
                } else {
                    rotate(rotation * 2);
                }
                showCircle();
            }
            rotation = rotation / 2;
            couche++;
            premiereRotation = true;
        }
        rotation = 45;
        couche = 0;
    }
}

function showCircle() {
    ellipse(sizeCanvas / 2, 0, sizeCanvas, sizeCanvas);
    ellipse(-sizeCanvas / 2, 0, sizeCanvas, sizeCanvas);
    ellipse(0, -sizeCanvas / 2, sizeCanvas, sizeCanvas);
    ellipse(0, sizeCanvas / 2, sizeCanvas, sizeCanvas);
}


function showArc() {
    arc(sizeCanvas, 0, sizeCanvas * 2, sizeCanvas * 2, 2 / 3 * 180, 4 / 3 * 180);
    arc(sizeCanvas / 2, -yPos, sizeCanvas * 2, sizeCanvas * 2, 1 / 3 * 180, 180);
    arc(-sizeCanvas / 2, -yPos, sizeCanvas * 2, sizeCanvas * 2, 0, 2 / 3 * 180);
    arc(-sizeCanvas, 0, sizeCanvas * 2, sizeCanvas * 2, -1 / 3 * 180, 1 / 3 * 180);
    arc(-sizeCanvas / 2, yPos, sizeCanvas * 2, sizeCanvas * 2, -2 / 3 * 180, 0);
    arc(sizeCanvas / 2, yPos, sizeCanvas * 2, sizeCanvas * 2, 180, -1 / 3 * 180);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight - 4);
}
