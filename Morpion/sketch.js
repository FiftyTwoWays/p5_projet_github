var tour = 0;
var fin = 0;
var count = 0;
var nombreParties = 1;
var score = {
    rond: 0,
    croix: 0,
    egalite: 0
};
var cases = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0
};
var winCondition = {
    // Lignes
    1: 0,
    2: 0,
    3: 0,
    // Colones
    4: 0,
    5: 0,
    6: 0,
    // Diagonales
    7: 0,
    8: 0,
    // Autre
    danger: 0,
    victoire: 0
};

function setup() {
    createCanvas(800, 900);
    background(52);
    // Quadrillage
    noFill();
    stroke(255);
    strokeWeight(4);
    line(width / 3, 0, width / 3, height - 100);
    line(width / 3 * 2, 0, width / 3 * 2, height - 100);
    line(0, (height - 100) / 3, width, (height - 100) / 3);
    line(0, (height - 100) / 3 * 2, width, (height - 100) / 3 * 2);
    line(0, height - 100, width, height - 100);
    // Affichage score
    // Croix
    fill(255);
    stroke(255, 0, 0);
    line(width / 20, height - 70, width / 20 + 40, height - 30);
    line(width / 20 + 40, height - 70, width / 20, height - 30);
    textSize(60);
    noStroke();
    text(":", 90, height - 35);
    text(score.croix, 115, height - 30);
    // Rond
    stroke(0, 0, 255);
    noFill();
    ellipse(width / 3 * 2 + 90, height - 50, 52, 52);
    textSize(60);
    fill(255);
    noStroke();
    text(":", width / 3 * 2 + 130, height - 35);
    text(score.rond, width / 3 * 2 + 155, height - 30);
    // Egalitée
    fill(0, 153, 0);
    text("Draw", width / 3 + 20, height - 31);
    fill(255);
    text(":", width / 3 + 170, height - 35);
    text(score.egalite, width / 3 + 195, height - 30);
    // Reset variables
    cases = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0
    };
    winCondition = {
        // Lignes
        1: 0,
        2: 0,
        3: 0,
        // Colones
        4: 0,
        5: 0,
        6: 0,
        // Diagonales
        7: 0,
        8: 0,
        // Autre
        danger: 0,
        victoire: 0
    };
    nombreParties++;
    tour = 0;
    fin = 0;
    count = 0;
}

function draw() {
    // Victoire bot ou joueur (MDR) ou égalité
    for (i = 1; i <= 8; i++) {
        if (winCondition[i] === 12) {
            textSize(60);
            textAlign(CENTER);
            noStroke();
            fill(0);
            text("PERDU !", width / 2, height / 2);
            fin = 1;
            count++;
            if (count == 180) {
                score.rond++;
                setup();
            }
        } else if (winCondition[i] === 3) {
            textSize(20);
            textAlign(CENTER);
            noStroke();
            fill(0);
            text("Cheater ... ok c'est bon t'as le droit à un bonbon :)", width / 2, height / 2);
            fin = 1;
            count++;
            if (count == 180) {
                score.croix++;
                setup();
            }
        } else if (tour === 9) {
            textSize(50);
            textAlign(CENTER);
            noStroke();
            fill(0);
            text("EGALITE !", width / 2, height / 2);
            fin = 1;
            count++;
            if (count == 1440) {
                score.egalite++;
                setup();
            }
        }
    }
    // Bot
    if (nombreParties % 2 === 0) {
        if (tour % 2 === 1) {
            if (tour === 1) {
                if (cases.e === 0) {
                    affichageRond(1, 1);
                    cases.e = 2;
                    winConditionQuatre(2, 5, 7, 8);
                } else {
                    affichageRond(0, 0);
                    cases.a = 2;
                    winConditionTrois(1, 4, 7);
                }
            } else if (tour === 3) {
                paterrnBot();
            } else if (tour === 5) {
                paterrnBot();
            } else if (tour === 7) {
                paterrnBot();
            }
        }
    } else {
        if (tour % 2 === 0) {
            if (tour === 0) {
                if (cases.e === 0) {
                    affichageRond(1, 1);
                    cases.e = 2;
                    winConditionQuatre(2, 5, 7, 8);
                } else {
                    affichageRond(0, 0);
                    cases.a = 2;
                    winConditionTrois(1, 4, 7);
                }
            } else if (tour === 2) {
                paterrnBot();
            } else if (tour === 4) {
                paterrnBot();
            } else if (tour === 6) {
                paterrnBot();
            } else if (tour === 8) {
                paterrnBot();
            }
        }
    }
}

function mousePressed() {
    if (fin === 0) {
        // Joueur
        if (nombreParties % 2 === 0) {
            mouvementJoueur(0);
        } else {
            mouvementJoueur(1);
        }
    }
}

function mouvementJoueur(x) {
    if (tour % 2 === x) {
        if (mouseX < width / 3 && mouseY < (height - 100) / 3 && cases.a === 0) {
            cases.a++;
            winCondition[1]++;
            winCondition[4]++;
            winCondition[7]++;
            affichageCroix(0, 0);
        } else if (mouseX > width / 3 && mouseX < width / 3 * 2 && mouseY < (height - 100) / 3 && cases.b === 0) {
            cases.b++;
            winCondition[1]++;
            winCondition[5]++;
            affichageCroix(1, 0);
        } else if (mouseX > width / 3 * 2 && mouseY < (height - 100) / 3 && cases.c === 0) {
            cases.c++;
            winCondition[1]++;
            winCondition[6]++;
            winCondition[8]++;
            affichageCroix(2, 0);
        } else if (mouseX < width / 3 && mouseY > (height - 100) / 3 && mouseY < (height - 100) / 3 * 2 && cases.d === 0) {
            cases.d++;
            winCondition[2]++;
            winCondition[4]++;
            affichageCroix(0, 1);
        } else if (mouseX > width / 3 && mouseX < width / 3 * 2 && mouseY > (height - 100) / 3 && mouseY < (height - 100) / 3 * 2 && cases.e === 0) {
            cases.e++;
            winCondition[2]++;
            winCondition[5]++;
            winCondition[7]++;
            winCondition[8]++;
            affichageCroix(1, 1);
        } else if (mouseX > width / 3 * 2 && mouseY > (height - 100) / 3 && mouseY < (height - 100) / 3 * 2 && cases.f === 0) {
            cases.f++;
            winCondition[2]++;
            winCondition[6]++;
            affichageCroix(2, 1);
        } else if (mouseX < width / 3 && mouseY > (height - 100) / 3 * 2 && mouseY < height - 100 && cases.g === 0) {
            cases.g++;
            winCondition[3]++;
            winCondition[4]++;
            winCondition[8]++;
            affichageCroix(0, 2);
        } else if (mouseX > width / 3 && mouseX < width / 3 * 2 && mouseY > (height - 100) / 3 * 2 && mouseY < height - 100 && cases.h === 0) {
            cases.h++;
            winCondition[3]++;
            winCondition[5]++;
            affichageCroix(1, 2);
        } else if (mouseX > width / 3 * 2 && mouseY > (height - 100) / 3 * 2 && mouseY < height - 100 && cases.i === 0) {
            cases.i++;
            winCondition[3]++;
            winCondition[6]++;
            winCondition[7]++;
            affichageCroix(2, 2);
        }
    }
}

function affichageCroix(x, y) {
    stroke(255, 0, 0);
    line(width * (x / 3) + width / 3 / 6, (height - 100) * (y / 3) + (height - 100) / 3 / 6, width / 3 * (x + 1) - width / 3 / 6, (height - 100) / 3 * (y + 1) - (height - 100) / 3 / 6);
    line(width / 3 * (x + 1) - width / 3 / 6, (height - 100) * (y / 3) + (height - 100) / 3 / 6, width * (x / 3) + width / 3 / 6, (height - 100) / 3 * (y + 1) - (height - 100) / 3 / 6);
    tour++;
}

function affichageRond(x, y) {
    stroke(0, 0, 255);
    noFill();
    ellipse(width / 6 * (1 + x * 2), (height - 100) / 6 * (1 + y * 2), width / 4, (height - 100) / 4);
    tour++;
}

function paterrnBot() {
    for (var i = 1; i <= 8; i++) {
        if (winCondition[i] === 8) {
            winCondition.victoire = i;
        } else if (winCondition[i] === 2) {
            winCondition.danger = i;
        }
    }
    if (winCondition.victoire !== 0) {
        if (winCondition.victoire === 1) {
            if (cases.a === 0) {
                affichageRond(0, 0);
                winCondition[1] += 4;
            } else if (cases.b === 0) {
                affichageRond(1, 0);
                winCondition[1] += 4;
            } else if (cases.c === 0) {
                affichageRond(2, 0);
                winCondition[1] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6, (height - 100) / 6, width / 6 * 5, (height - 100) / 6);
        } else if (winCondition.victoire === 2) {
            if (cases.d === 0) {
                affichageRond(0, 1);
                winCondition[2] += 4;
            } else if (cases.e === 0) {
                affichageRond(1, 1);
                winCondition[2] += 4;
            } else if (cases.f === 0) {
                affichageRond(2, 1);
                winCondition[2] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6, (height - 100) / 6 * 3, width / 6 * 5, (height - 100) / 6 * 3);
        } else if (winCondition.victoire === 3) {
            if (cases.g === 0) {
                affichageRond(0, 2);
                winCondition[3] += 4;
            } else if (cases.h === 0) {
                affichageRond(1, 2);
                winCondition[3] += 4;
            } else if (cases.i === 0) {
                affichageRond(2, 2);
                winCondition[3] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6, (height - 100) / 6 * 5, width / 6 * 5, (height - 100) / 6 * 5);
        } else if (winCondition.victoire === 4) {
            if (cases.a === 0) {
                affichageRond(0, 0);
                winCondition[4] += 4;
            } else if (cases.d === 0) {
                affichageRond(0, 1);
                winCondition[4] += 4;
            } else if (cases.g === 0) {
                affichageRond(0, 2);
                winCondition[4] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6, (height - 100) / 6, width / 6, (height - 100) / 6 * 5);
        } else if (winCondition.victoire === 5) {
            if (cases.b === 0) {
                affichageRond(1, 0);
                winCondition[5] += 4;
            } else if (cases.e === 0) {
                affichageRond(1, 1);
                winCondition[5] += 4;
            } else if (cases.h === 0) {
                affichageRond(1, 2);
                winCondition[5] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6 * 3, (height - 100) / 6, width / 6 * 3, (height - 100) / 6 * 5);
        } else if (winCondition.victoire === 6) {
            if (cases.c === 0) {
                affichageRond(2, 0);
                winCondition[6] += 4;
            } else if (cases.f === 0) {
                affichageRond(2, 1);
                winCondition[6] += 4;
            } else if (cases.i === 0) {
                affichageRond(2, 2);
                winCondition[6] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6 * 5, (height - 100) / 6, width / 6 * 5, (height - 100) / 6 * 5);
        } else if (winCondition.victoire === 7) {
            if (cases.a === 0) {
                affichageRond(0, 0);
                winCondition[7] += 4;
            } else if (cases.e === 0) {
                affichageRond(1, 1);
                winCondition[7] += 4;
            } else if (cases.i === 0) {
                affichageRond(2, 2);
                winCondition[7] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6, (height - 100) / 6, width / 6 * 5, (height - 100) / 6 * 5);
        } else if (winCondition.victoire === 8) {
            if (cases.c === 0) {
                affichageRond(2, 0);
                winCondition[8] += 4;
            } else if (cases.e === 0) {
                affichageRond(1, 1);
                winCondition[8] += 4;
            } else if (cases.g === 0) {
                affichageRond(0, 2);
                winCondition[8] += 4;
            }
            stroke(255, 150);
            strokeWeight(20);
            line(width / 6, (height - 100) / 6 * 5, width / 6 * 5, (height - 100) / 6);
        }
    } else if (winCondition.danger === 0) {
        if (winCondition[1] === 1 && winCondition[4] === 1 && winCondition[7] === 4 && winCondition[8] === 4){
            affichageRond(0, 0);
            cases.a++;
            winConditionTrois(1, 4, 7);
        } else if (winCondition[1] === 1 && winCondition[6] === 1 && winCondition[7] === 4 && winCondition[8] === 4){
            affichageRond(2, 0);
            cases.c++;
            winConditionTrois(1, 6, 8);
        } else if (winCondition[3] === 1 && winCondition[6] === 1 && winCondition[7] === 4 && winCondition[8] === 4){
            affichageRond(2, 2);
            cases.i++;
            winConditionTrois(3, 6, 7);
        } else if (winCondition[3] === 1 && winCondition[4] === 1 && winCondition[7] === 4 && winCondition[8] === 4){
            affichageRond(0, 2);
            cases.g++;
            winConditionTrois(3, 4, 8);
        } else if (winCondition[2] === 4 && winCondition[4] === 4) {
            affichageRond(0, 1);
            cases.d++;
            winConditionDeux(2, 4);
        } else if (winCondition[1] === 4 && winCondition[4] === 4) {
            affichageRond(1, 0);
            cases.b++;
            winConditionDeux(1, 5);
        } else if (winCondition[2] === 4 && winCondition[6] === 4) {
            affichageRond(2, 1);
            cases.f++;
            winConditionDeux(2, 6);
        } else if (winCondition[3] === 4 && winCondition[5] === 4) {
            affichageRond(1, 2);
            cases.h++;
            winConditionDeux(3, 5);
        } else if (winCondition[1] === 0 && winCondition[4] === 0) {
            affichageRond(0, 0);
            cases.a++;
            winConditionTrois(1, 4, 7);
        } else if (winCondition[3] === 0 && winCondition[6] === 0) {
            affichageRond(2, 2);
            cases.i++;
            winConditionTrois(3, 6, 7);
        } else if (winCondition[1] === 0 && winCondition[6] === 0) {
            affichageRond(2, 0);
            cases.c++;
            winConditionTrois(1, 6, 8);
        } else if (winCondition[3] === 0 && winCondition[4] === 0) {
            affichageRond(0, 2);
            cases.g++;
            winConditionTrois(3, 4, 8);
        } else if (winCondition[1] === 0) {
            affichageRond(1, 0);
            cases.b++;
            winConditionDeux(1, 5);
        } else if (winCondition[3] === 0) {
            affichageRond(1, 2);
            cases.h++;
            winConditionDeux(3, 5);
        } else if (winCondition[4] === 0) {
            affichageRond(0, 1);
            cases.d++;
            winConditionDeux(2, 4);
        } else if (winCondition[6] === 0) {
            affichageRond(2, 1);
            cases.f++;
            winConditionDeux(2, 6);
        } else {
            if (cases.a === 0) {
                affichageRond(0, 0);
                cases.a++;
                winConditionTrois(1, 4, 7);
            } else if (cases.b === 0) {
                affichageRond(1, 0);
                cases.b++;
                winConditionDeux(1, 5);
            } else if (cases.c === 0) {
                affichageRond(2, 0);
                cases.c++;
                winConditionTrois(1, 6, 8);
            } else if (cases.d === 0) {
                affichageRond(0, 1);
                cases.d++;
                winConditionDeux(2, 4);
            } else if (cases.e === 0) {
                affichageRond(1, 1);
                cases.e++;
                winConditionQuatre(2, 5, 7, 8);
            } else if (cases.f === 0) {
                affichageRond(2, 1);
                cases.f++;
                winConditionDeux(2, 6);
            } else if (cases.g === 0) {
                affichageRond(0, 2);
                cases.g++;
                winConditionTrois(3, 4, 8);
            } else if (cases.h === 0) {
                affichageRond(1, 2);
                cases.h++;
                winConditionDeux(3, 5);
            } else if (cases.i === 0) {
                affichageRond(2, 2);
                cases.i++;
                winConditionTrois(3, 6, 7);
            }
        }
    } else if (winCondition.danger === 1) {
        if (cases.a === 0) {
            affichageRond(0, 0);
            cases.a++;
            winConditionTrois(1, 4, 7);
        } else if (cases.b === 0) {
            affichageRond(1, 0);
            cases.b++;
            winConditionDeux(1, 5);
        } else if (cases.c === 0) {
            affichageRond(2, 0);
            cases.c++;
            winConditionTrois(1, 6, 8);
        }
    } else if (winCondition.danger === 2) {
        if (cases.d === 0) {
            affichageRond(0, 1);
            cases.d++;
            winConditionDeux(2, 4);
        } else if (cases.e === 0) {
            affichageRond(1, 1);
            cases.e++;
            winConditionQuatre(2, 5, 7, 8);
        } else if (cases.f === 0) {
            affichageRond(2, 1);
            cases.f++;
            winConditionDeux(2, 6);
        }
    } else if (winCondition.danger === 3) {
        if (cases.g === 0) {
            affichageRond(0, 2);
            cases.g++;
            winConditionTrois(3, 4, 8);
        } else if (cases.h === 0) {
            affichageRond(1, 2);
            cases.h++;
            winConditionDeux(3, 5);
        } else if (cases.i === 0) {
            affichageRond(2, 2);
            cases.i++;
            winConditionTrois(3, 6, 7);
        }
    } else if (winCondition.danger === 4) {
        if (cases.a === 0) {
            affichageRond(0, 0);
            cases.a++;
            winConditionTrois(1, 4, 7);
        } else if (cases.d === 0) {
            affichageRond(0, 1);
            cases.d++;
            winConditionDeux(2, 4);
        } else if (cases.g === 0) {
            affichageRond(0, 2);
            cases.g++;
            winConditionTrois(3, 4, 8);
        }
    } else if (winCondition.danger === 5) {
        if (cases.b === 0) {
            affichageRond(1, 0);
            cases.b++;
            winConditionDeux(1, 5);
        } else if (cases.e === 0) {
            affichageRond(1, 1);
            cases.e++;
            winConditionQuatre(2, 5, 7, 8);
        } else if (cases.h === 0) {
            affichageRond(1, 2);
            cases.h++;
            winConditionDeux(3, 5);
        }
    } else if (winCondition.danger === 6) {
        if (cases.c === 0) {
            affichageRond(2, 0);
            cases.c++;
            winConditionTrois(1, 6, 8);
        } else if (cases.f === 0) {
            affichageRond(2, 1);
            cases.f++;
            winConditionDeux(2, 6);
        } else if (cases.i === 0) {
            affichageRond(2, 2);
            cases.i++;
            winConditionTrois(3, 6, 7);
        }
    } else if (winCondition.danger === 8) {
        if (cases.c === 0) {
            affichageRond(2, 0);
            cases.c++;
            winConditionTrois(1, 6, 8);
        } else if (cases.e === 0) {
            affichageRond(1, 1);
            cases.e++;
            winConditionQuatre(2, 5, 7, 8);
        } else if (cases.g === 0) {
            affichageRond(0, 2);
            cases.g++;
            winConditionTrois(3, 4, 8);
        }
    }
}

function winConditionDeux(a, b) {
    winCondition[a] += 4;
    winCondition[b] += 4;
    winCondition.danger = 0;
}

function winConditionTrois(a, b, c) {
    winCondition[a] += 4;
    winCondition[b] += 4;
    winCondition[c] += 4;
    winCondition.danger = 0;
}

function winConditionQuatre(a, b, c, d) {
    winCondition[a] += 4;
    winCondition[b] += 4;
    winCondition[c] += 4;
    winCondition[d] += 4;
    winCondition.danger = 0;
}
