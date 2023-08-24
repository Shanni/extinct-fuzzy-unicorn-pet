import GameScene from "../scenes/gameScene";
import IMonster from "./interface/IMonster";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private moveSpeed: number = 100;
  private displayW = 50;
  private displayH = 50;

  private pets: IMonster[] = [];

  private keyW: Phaser.Input.Keyboard.Key | undefined;
  private keyA: Phaser.Input.Keyboard.Key | undefined;
  private keyS: Phaser.Input.Keyboard.Key | undefined;
  private keyD: Phaser.Input.Keyboard.Key | undefined;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, "player");

    //initializing visual and physics
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDisplaySize(this.displayW, this.displayH);

    if (!this.body) throw new Error("body is undefined");
    this.setCircle(
      this.body.halfWidth / 2,
      this.body.halfWidth / 2,
      this.body.halfHeight / 2
    );

    //-animations
    scene.anims.create({
      key: "player-idle",
      frames: scene.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.play("player-idle");

    //initializing keyboard
    this.keyW = this.scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.keyA = this.scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.keyS = this.scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.keyD = this.scene.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
  }

  update(...args: any[]): void {
    super.update(...args);
    this.moving();
  }

  moving() {
    //player movement
    this.setVelocity(0);

    if (this.keyW?.isDown) {
      this.setVelocityY(-this.moveSpeed);
    } else if (this.keyS?.isDown) {
      this.setVelocityY(this.moveSpeed);
    }

    if (this.keyA?.isDown) {
      this.setVelocityX(-this.moveSpeed);
    } else if (this.keyD?.isDown) {
      this.setVelocityX(this.moveSpeed);
    }
  }
}
