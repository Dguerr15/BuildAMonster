class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.smileVisible = false;
        this.fangsVisible = false;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");
        my.sprite.leg1 = this.add.sprite(this.bodyX+50, this.bodyY+150, "monsterParts", "leg_greenA.png")
        my.sprite.leg2 = this.add.sprite(this.bodyX - 50, this.bodyY +120, "monsterParts", "leg_redE.png");
        my.sprite.leg2.flipX = true;

        my.sprite.arm1 = this.add.sprite(this.bodyX + 100, this.bodyY + 20, "monsterParts", "arm_greenC.png");
        my.sprite.arm2 = this.add.sprite(this.bodyX - 100, this.bodyY + 20, "monsterParts", "arm_darkA.png");
        my.sprite.arm2.flipX = true;

        my.sprite.eye1 = this.add.sprite(this.bodyX - 20, this.bodyY - 50, "monsterParts", "eye_psycho_dark.png");
        my.sprite.eye2 = this.add.sprite(this.bodyX + 20, this.bodyY - 50, "monsterParts", "eye_cute_light.png");

        my.sprite.mouth = this.add.sprite(this.bodyX, this.bodyY+10, "monsterParts", "mouth_closed_happy.png");

        my.sprite.antennae1 = this.add.sprite(this.bodyX - 30, this.bodyY - 100, "monsterParts", "detail_yellow_antenna_large.png");
        my.sprite.antennae2 = this.add.sprite(this.bodyX + 40, this.bodyY - 90, "monsterParts", "detail_blue_horn_small.png");


        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        this.input.keyboard.on('keyup', this.handleKeyUp, this);
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>';
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if (this.moveLeft){
            for (let part in my.sprite){
                my.sprite[part].x -= 1;
            }
        }
        else if (this.moveRight){
            for (let part in my.sprite){
                my.sprite[part].x +=1;
            }
        }
        if (this.smileVisible) {
            my.sprite.mouth.setTexture("monsterParts", "mouth_closed_happy.png");
        } else if (this.fangsVisible) {
            my.sprite.mouth.setTexture("monsterParts", "mouth_closed_fangs.png");
        }
    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'a':
            case 'A':
                this.moveLeft = true;
                break;
            case 'd':
            case 'D':
                this.moveRight = true;
                break;
            case 's':
            case 'S':
                this.smileVisible = true;
                this.fangsVisible = false;
                break;
            case 'f':
            case 'F':
                this.fangsVisible = true;
                this.smileVisible = false;
                break;
            default:
                break;
        }
    }
    handleKeyUp(event) {
        switch (event.key) {
            case 'a':
            case 'A':
                this.moveLeft = false;
                break;
            case 'd':
            case 'D':
                this.moveRight = false;
                break;
            default:
                break;
        }
    }

}