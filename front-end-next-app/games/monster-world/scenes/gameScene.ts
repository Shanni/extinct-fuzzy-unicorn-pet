import "phaser";

//tilemap
import map from "@/games/monster-world/assets/tilemaps/starting-map.json";
import mapTile from "@/games/monster-world/assets/tilemaps/TestTileSet.png";

//images
import heartImage from "@/games/monster-world/assets/imgs/health-health.png";
import groundImage from "@/games/monster-world/assets/imgs/ground.png";
import redCircle from "@/games/monster-world/assets/imgs/red-circle.webp";
import blackCircle from "@/games/monster-world/assets/imgs/black-circle.png";
import greenCircle from "@/games/monster-world/assets/imgs/green-circle.png";
import grayCircle from "@/games/monster-world/assets/imgs/gray-circle.png";
import redCrystal from "@/games/monster-world/assets/imgs/red-crystal-spritesheet.png";
import unicornImage from "@/games/monster-world/assets/imgs/unicorn.png";
import Unicorn from "../scripts/Monsters/unicorn";

//prefabs
import Player from "../scripts/player";
import IMonster from "../scripts/interface/IMonster";

export default class GameScene extends Phaser.Scene {
  //assets
  private player:
    | Phaser.Physics.Arcade.Image
    | Phaser.Physics.Arcade.Sprite
    | undefined;

  //variables
  public monsters: Phaser.GameObjects.Group | undefined;
  public updateChildrenGroup: Phaser.GameObjects.Group | undefined;

  constructor() {
    super("monster-world");
  }

  preload() {
    this.load.image("heart", heartImage.src);
    this.load.image("ground", groundImage.src);
    this.load.image("red-circle", redCircle.src);
    this.load.image("black-circle", blackCircle.src);
    this.load.image("green-circle", greenCircle.src);
    this.load.image("gray-circle", grayCircle.src);
    this.load.image("unicorn", unicornImage.src);

    this.load.spritesheet("player", redCrystal.src, {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.tilemapTiledJSON("map", map);
    this.load.image("mapTile", mapTile.src);
  }

  create() {
    //groups
    this.monsters = this.physics.add.group();
    this.physics.add.collider(this.monsters, this.monsters);
    this.updateChildrenGroup = this.physics.add.group();
    this.updateChildrenGroup.runChildUpdate = true;

    //player
    this.player = new Player(this, 2275, 1220);
    this.updateChildrenGroup.add(this.player);

    //pet
    const unicorn = new Unicorn(this, 2275, 1220, "pet");
    this.updateChildrenGroup.add(unicorn);
    this.monsters.add(unicorn);

    const unicorn2 = new Unicorn(this, 2275, 1220, "pet");
    this.updateChildrenGroup.add(unicorn2);
    this.monsters.add(unicorn2);

    const unicorn3 = new Unicorn(this, 2275, 1220, "pet");
    this.updateChildrenGroup.add(unicorn3);
    this.monsters.add(unicorn3);

    //camera
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    //create tilemap
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 64,
      tileHeight: 64,
    });
    const tileset = map.addTilesetImage("tiles1", "mapTile");

    if (!tileset) throw new Error("tileset is undefined");
    const layer = map.createLayer("Tile Layer 1", tileset, 0, 0);
    if (!layer) throw new Error("layer is undefined");
    layer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, layer);
    this.physics.add.collider(this.monsters, layer);
    layer.setDepth(-1);

    //spawn max 10 wild monsters between 1740,1940 and 2760,2061
    const maxWildMonsters = 10;
    const wildMonsters: Unicorn[] = [];
    for (let i = 0; i < maxWildMonsters; i++) {
      const x = Phaser.Math.Between(1740, 2760);
      const y = Phaser.Math.Between(1940, 2061);
      const unicorn = new Unicorn(this, x, y, "wild");
      this.updateChildrenGroup.add(unicorn);
      wildMonsters.push(unicorn);
    }
    this.monsters.addMultiple(wildMonsters);
  }

  update() {
    //console.log(this.player?.x, this.player?.y);
  }

  getPlayer(): Player {
    return this.player as Player;
  }
}
