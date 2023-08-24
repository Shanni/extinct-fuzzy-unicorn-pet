import { get } from "http";
import GameScene from "../../scenes/gameScene";
import IMonster from "../interface/IMonster";

export default class Monster
  extends Phaser.Physics.Arcade.Sprite
  implements IMonster
{
  relationship: "pet" | "wild";
  currentHealth: number;
  maxHealth: number;
  attack: number;
  moveSpeed: number;
  attackCoolDown: number;
  attackRate: number;
  attackRadius: number;

  isAttacking: boolean = false;

  public target: Monster | undefined;

  constructor(
    scene: GameScene,
    x: number,
    y: number,
    relationship: "pet" | "wild",
    sprite: string,
    displayW: number,
    displayH: number,
    attack: number,
    maxHealth: number,
    moveSpeed: number
  ) {
    super(scene, x, y, sprite);

    //variables
    this.attack = attack;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.moveSpeed = moveSpeed;
    this.attackCoolDown = 0;
    this.attackRate = 1000;
    this.attackRadius = 50;

    //interface
    this.relationship = relationship;

    //initializing visual and physics
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDisplaySize(displayW, displayH);

    if (!this.body) throw new Error("body is undefined");
    this.setCircle(
      this.body.halfWidth / 2,
      this.body.halfWidth / 2,
      this.body.halfHeight / 2
    );

    if (this.relationship === "wild") {
      this.movingAround();
    }
  }

  update(...args: any[]): void {
    super.update(...args);
    this.attackCoolDown += args[1];

    if (!this.target?.active) {
      this.target = undefined;
    }

    if (this.isAttacking) {
      return;
    }

    if (this.relationship === "pet") {
      this.petBehavior();
    } else if (this.relationship === "wild") {
      this.wildBehavior();
    }
  }

  petBehavior() {
    if (!this.target) {
      this.followPlayer();
      this.detectNearbyWildMonsters();
    } else {
      const distance = this.getDisatanceToTarget();

      if (distance < this.attackRadius) {
        this.attackTarget();
      } else {
        this.chaseTarget();
      }
    }
  }

  wildBehavior() {
    if (!this.target) {
    } else {
      this.attackTarget();
    }
  }

  getHit(damage: number) {
    this.currentHealth -= damage;
    //turn red for a while
    this.setTint(0xff0000);

    setTimeout(() => {
      this.setTint(0xffffff);
    }, 100);

    if (this.currentHealth <= 0) {
      this.destroy();
    }
  }

  detectNearbyWildMonsters() {
    //detect nearby monsters
    const detectRadius = 100;
    const monsters = (
      this.scene as GameScene
    ).monsters?.getChildren() as Monster[];

    if (!monsters) throw new Error("monsters is undefined");

    for (let i = 0; i < monsters.length; i++) {
      const monster = monsters[i];
      if (monster.relationship === "wild") {
        const distance = Phaser.Math.Distance.Between(
          this.x,
          this.y,
          monster.x,
          monster.y
        );

        if (distance < detectRadius) {
          this.target = monster;
          if (!monster.target) {
            monster.target = this;
          }
          break;
        }
      }
    }
  }

  followPlayer() {
    //follow player if player distance is greater than certain amount
    const startFollowingDistance: number = 50;

    const player = (this.scene as GameScene).getPlayer();
    if (!player) throw new Error("player is undefined");

    const distance = this.getDistanceToPlayer();

    if (distance < startFollowingDistance) {
      this.setVelocity(0, 0);
    } else {
      const angle = this.getAngleToPlayer();

      this.setVelocity(
        Math.cos(angle) * this.moveSpeed,
        Math.sin(angle) * this.moveSpeed
      );
    }
  }

  async attackTarget() {
    //attack target if target is in range
    //back up a little and charge to hit target
    if (!this.target || !this.target.active) {
      this.isAttacking = false;
      return;
    }

    if (!this.target.target) {
      this.target.target = this;
    }

    if (this.attackCoolDown < this.attackRate) {
      return;
    } else {
      this.attackCoolDown = 0;
      //move back a little
      const angle = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.target.x,
        this.target.y
      );

      this.setVelocity(
        Math.cos(angle) * -this.moveSpeed,
        Math.sin(angle) * -this.moveSpeed
      );

      this.isAttacking = true;

      setTimeout(() => {
        this.attackCharge();
      }, 200);
    }
  }

  attackCharge() {
    if (!this.target || !this || !this.target.active) {
      this.isAttacking = false;
      return;
    }

    const angle = this.getAngleToTarget();

    this.setVelocity(
      Math.cos(angle) * this.moveSpeed,
      Math.sin(angle) * this.moveSpeed
    );

    setTimeout(() => {
      this.dealDamageToTarget();
    }, 200);
  }

  dealDamageToTarget() {
    if (!this.target || !this || !this.target.active) {
      this.isAttacking = false;
      return;
    }

    this.target.getHit(this.attack);

    this.isAttacking = false;
  }

  chaseTarget() {
    if (!this.target || !this || !this.target.active) {
      this.isAttacking = false;
      return;
    }

    const angle = this.getAngleToTarget();

    this.setVelocity(
      Math.cos(angle) * this.moveSpeed,
      Math.sin(angle) * this.moveSpeed
    );
  }

  movingAround() {
    if (this.target) return;
    //randomly move around, change direction every 2 seconds
    const changeDirectionTime = 2000;

    const randomNum = Math.floor(Math.random() * 2);

    switch (randomNum) {
      case 0:
        this.setVelocity(0, 0);
        break;
      case 1:
        this.setVelocity(
          (Math.random() * 2 - 1) * this.moveSpeed,
          (Math.random() * 2 - 1) * this.moveSpeed
        );
    }

    setTimeout(() => {
      this.movingAround();
    }, changeDirectionTime);
  }

  private getDisatanceToTarget() {
    if (!this.target) return 0;
    return Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
  }

  private getDistanceToPlayer() {
    const player = (this.scene as GameScene).getPlayer();
    if (!player) throw new Error("player is undefined");
    return Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
  }

  private getAngleToTarget() {
    if (!this.target) return 0;
    return Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.target.x,
      this.target.y
    );
  }

  private getAngleToPlayer() {
    const player = (this.scene as GameScene).getPlayer();
    if (!player) throw new Error("player is undefined");
    return Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
  }
}
