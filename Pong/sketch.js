var joueur = {
    x: 20,
    y: 250,
    yspeed: 5
};

var bot = {
    x: 980,
    y: 250,
    yspeed: 5
};

var balle = {
    x: 500,
    y: 300,
    xspeed: -4,
    yspeed: 0,
    ycontrain: 5
};

var score = {
    joueur: 0,
    bot: 0
};

function setup() {
    createCanvas(1000, 600);

    balle.x = width / 2;
    balle.y = height / 2;
    balle.yspeed = random(-2.4, 2.4);

    joueur.y = height / 2 - 50;

    bot.x = width - 20;
    bot.y = height / 2 - 50;
}

function draw() {
    background(52);

    // Affichage du score
    fill(255);
    textSize(30);
    text(score.joueur, 90, 40);
    text(score.bot, width - 110, 40);

    // Joueur
    fill(0);
    noStroke();
    rect(joueur.x, joueur.y, 5, 100);

    // Mouvement joueur
    joueur.y = constrain(joueur.y, 7.5, height - 107.5);
    if (keyIsPressed === true) {
        if (keyCode === UP_ARROW) {
            joueur.y = joueur.y - joueur.yspeed;
        } else if (keyCode === DOWN_ARROW) {
            joueur.y = joueur.y + joueur.yspeed;
        }
    }

    // Bot
    noStroke();
    rect(bot.x, bot.y, 5, 100);

    // Mouvement bot
    bot.y = constrain(bot.y, 7.5, height - 107.5);

    if (bot.y + 25 > balle.y) {
        bot.y = bot.y - bot.yspeed;
    } else if (bot.y + 75 < balle.y) {
        bot.y = bot.y + bot.yspeed;;
    }


    // Balle 
    noStroke();
    fill(255);
    ellipse(balle.x, balle.y, 15, 15);

    balle.x = constrain(balle.x, 7.5, width - 7.5);
    balle.y = constrain(balle.y, 7.5, height - 7.5);

    balle.yspeed = constrain(balle.yspeed, balle.ycontrain * (-1), balle.ycontrain);

    balle.x = balle.x + balle.xspeed;
    balle.y = balle.y + balle.yspeed;

    // Score
    if (balle.x > width - 8) {
        joueur.y = height / 2 - 50;
        bot.y = height / 2 - 50;

        score.joueur = score.joueur + 1;

        balle.x = 500;
        balle.y = 300;
        balle.yspeed = random(-2.4, 2.4);
        balle.xspeed = 4;
        balle.ycontrain = 5;
    }

    if (balle.x < 8) {
        joueur.y = height / 2 - 50;
        bot.y = height / 2 - 50;

        score.bot = score.bot + 1;

        balle.x = 500;
        balle.y = 300;
        balle.yspeed = random(-2.4, 2.4);
        balle.xspeed = -4;
        balle.ycontrain = 5;
    }

    // Collision de la balle avec le joueur
    hitJoueur = collideRectCircle(joueur.x, joueur.y, 5, 100, balle.x, balle.y, 15);
    if (hitJoueur) {
        trajectoireBalle(joueur);
    }

    // Collision de la balle avec le bot
    hitBot = collideRectCircle(bot.x, bot.y, 5, 100, balle.x, balle.y, 15);
    if (hitBot) {
        trajectoireBalle(bot);
    }

    // Collision avec les murs
    if (balle.y < 10) {
        balle.yspeed = balle.yspeed * (-1);
    }
    if (balle.y > height - 10) {
        balle.yspeed = balle.yspeed * (-1);
    }
}

// Trajectoire de la balle après être revoyé par le joueur ou le bot
function trajectoireBalle(elementTouche) {
    if (balle.y < elementTouche.y + 20) {
        if (balle.yspeed >= 0) {
            balle.yspeed = (balle.yspeed / 4) - 0.5;
        } else if (balle.yspeed < 0) {
            balle.yspeed = balle.yspeed * 4;
        }
    } else if (balle.y >= elementTouche.y + 25 && balle.y < elementTouche.y + 50) {
        if (balle.yspeed >= 0) {
            balle.yspeed = (balle.yspeed / 2) - 0.25;
        } else if (balle.yspeed < 0) {
            balle.yspeed = balle.yspeed * 2;
        }
    } else if (balle.y >= elementTouche.y + 50 && balle.y < elementTouche.y + 75) {
        if (balle.yspeed > 0) {
            balle.yspeed = balle.yspeed * 2;
        } else if (balle.yspeed <= 0) {
            balle.yspeed = (balle.yspeed / 2) + 0.25;
        }
    } else if (balle.y >= elementTouche.y + 80) {
        if (balle.yspeed > 0) {
            balle.yspeed = balle.yspeed * 4;
        } else if (balle.yspeed <= 0) {
            balle.yspeed = (balle.yspeed / 4) + 0.5;
        }
    }
    balle.xspeed = balle.xspeed * (-1);
    if (balle.xspeed > 0) {
        balle.xspeed = balle.xspeed + 0.5;
    } else if (balle.xspeed < 0) {
        balle.xspeed = balle.xspeed - 0.5;
    }
    balle.ycontrain = balle.ycontrain + 0.25;
}
