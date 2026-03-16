function preload() {
    /**
    Handles the preloading of all game assets and initial configuration for the Maze Escapist game.
    */

    // set mapIndex by query param, default to 0
    const urlParams = new URLSearchParams(window.location.search);
    const levelParam = urlParams.get("level");
    if (levelParam !== null) {
        const parsedLevel = parseInt(levelParam);
        if (!isNaN(parsedLevel)) {
        mapIndex = parsedLevel - 1;
        }
    }

    // load death msgs by death-msgs.json
    loadJSON("data/death-msgs.json", (data) => {
        deathMsgs = data;
    });

    // load map by maps.json
    loadJSON("data/maps.json", (data) => {
        maps = data;
        map = maps[mapIndex].map;
        blockSize = mapSize / map.length;

        reset();
    });
    charDir = 0;

    // load imgs here
    images = {};
    images.laser = loadImage("images/laser.png");
    images.char = loadImage("images/character.png");
    images.knight = loadImage("images/knight.png");
    images.dirt = loadImage("images/dirt.jpg");
    images.stone = loadImage("images/stone.png");
    images.cannon = loadImage("images/cannon.webp");
    images.roundshot = loadImage("images/roundshot.png");
    images.door = loadImage("images/door.jpg");
    images.nuke = loadImage("images/nuke.jpg");
    images.bubble = loadImage("images/bubble.png");
    images.hammer = loadImage("images/hammer.png");
    images.rock = loadImage("images/rock.webp");

    // load sounds here
    sounds = {};
    sounds.move = loadSound("sounds/move.mp3");
    sounds.knight = loadSound("sounds/knight-sound.mp3");
    sounds.chomp = loadSound("sounds/chomp.mp3");
    sounds.cannon = loadSound("sounds/cannon.mp3");
    sounds.death = loadSound("sounds/villager.mp3");
    sounds.laserDeath = loadSound("sounds/death.mp3");
    sounds.nuke = loadSound("sounds/nuke.mp3");
    sounds.nukeExplosion = loadSound("sounds/cannon.mp3");
    sounds.nukeExplosion.rate(0.3);
    sounds.rockBreak = loadSound("sounds/rock-break.mp3");
    sounds.rockBreak.rate(1.25);

    // needed to prevent audio-related performance issues
    sounds.move.playMode("restart");
    sounds.knight.playMode("restart");
    sounds.chomp.playMode("restart");
    sounds.cannon.playMode("restart");
    sounds.death.playMode("restart");
    sounds.laserDeath.playMode("restart");
    sounds.nuke.playMode("restart");
    sounds.rockBreak.playMode("restart");
}