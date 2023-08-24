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

//prefabs
import Player from "../scripts/player";

export default class GameScene extends Phaser.Scene {
  //assets
  private player:
    | Phaser.Physics.Arcade.Image
    | Phaser.Physics.Arcade.Sprite
    | undefined;

  //variables
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


    this.load.tilemapTiledJSON("map", map);
    this.load.image("mapTile", mapTile.src);
  }

  create() {
    this.updateChildrenGroup = this.physics.add.group();
    this.updateChildrenGroup.runChildUpdate = true;

    //enemy group collision with self
    this.player = new Player(this, 400, 300);
    this.updateChildrenGroup.add(this.player);

    //camera
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    //create tilemap
    const map = this.make.tilemap({ key: "map" , tileWidth: 64, tileHeight: 64});
    const tileset = map.addTilesetImage("testTile", "mapTile");
  }

  update() {}
}
