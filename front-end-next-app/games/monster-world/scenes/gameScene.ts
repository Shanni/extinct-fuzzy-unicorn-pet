import "phaser";

//tilemap
import map from "@/games/monster-world/assets/tilemaps/starting-map.json";
import mapTile from "@/games/monster-world/assets/tilemaps/TestTileSet.png";
import wildFire from "@/games/monster-world/assets/tilemaps/wild-fire.png";

//images
import heartImage from "@/games/monster-world/assets/imgs/health-health.png";
import groundImage from "@/games/monster-world/assets/imgs/ground.png";
import redCircle from "@/games/monster-world/assets/imgs/red-circle.webp";
import blackCircle from "@/games/monster-world/assets/imgs/black-circle.png";
import greenCircle from "@/games/monster-world/assets/imgs/green-circle.png";
import grayCircle from "@/games/monster-world/assets/imgs/gray-circle.png";
import redCrystal from "@/games/monster-world/assets/imgs/red-crystal-spritesheet.png";
import unicornImage from "@/games/monster-world/assets/imgs/unicorn.png";
import petsButton from "@/games/monster-world/assets/imgs/pets-button.png";
import Unicorn from "../scripts/Monsters/unicorn";

//-test-monsters
import RandomMonster, {
  ramdomMonsterImage,
} from "../scripts/Monsters/random-monster";

//prefabs
import Player from "../scripts/player";
import Monster from "../scripts/Monsters/monster";
import MonsterWithName from "../scripts/Monsters/monsterWithName";

export default class GameScene extends Phaser.Scene {
  //user data
  private userData: any;

  //assets
  private player:
    | Phaser.Physics.Arcade.Image
    | Phaser.Physics.Arcade.Sprite
    | undefined;

  //variables
  public monsters: Phaser.GameObjects.Group | undefined;
  public updateChildrenGroup: Phaser.GameObjects.Group | undefined;

  //plugins
  private rexUI: any;

  constructor() {
    super("monster-world");
  }

  init(data: any) {
    this.userData = JSON.parse(data.userData);
    console.log(this.userData[0].collected_monster);
  }

  preload() {
    this.load.image("heart", heartImage.src);
    this.load.image("ground", groundImage.src);
    this.load.image("red-circle", redCircle.src);
    this.load.image("black-circle", blackCircle.src);
    this.load.image("green-circle", greenCircle.src);
    this.load.image("gray-circle", grayCircle.src);
    this.load.image("unicorn", unicornImage.src);
    this.load.image("pets-button", petsButton.src);

    //test-monsters
    ramdomMonsterImage.forEach((value, key) => {
      this.load.image(key, value);
    });

    this.load.spritesheet("player", redCrystal.src, {
      frameWidth: 64,
      frameHeight: 64,
    });

    //tilemap
    this.load.tilemapTiledJSON("map", map);
    this.load.image("mapTile", mapTile.src);
    this.load.image("wildFire", wildFire.src);

    this.rexUI = this.load.scenePlugin({
      key: "rexuiplugin",
      url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
  }

  create() {
    //groups
    this.monsters = this.physics.add.group();
    this.physics.add.collider(this.monsters, this.monsters);
    this.updateChildrenGroup = this.physics.add.group();
    this.updateChildrenGroup.runChildUpdate = true;
    if (!this.monsters || !this.updateChildrenGroup)
      throw new Error("group is undefined");

    //player
    this.player = new Player(this, 2275, 1220);
    this.updateChildrenGroup.add(this.player);

    //pet
    for (const monster in this.userData[0].collected_monster) {
      if (!this.player) throw new Error("player is undefined");

      const pet = new MonsterWithName(
        this,
        this.player.x,
        this.player.y,
        "pet",
        this.userData[0].collected_monster[monster].monster_name
      );
      console.log(this.userData[0].collected_monster[monster].monster_name);

      if (!this.monsters || !this.updateChildrenGroup)
        throw new Error("group is undefined");

      this.updateChildrenGroup.add(pet);
      this.monsters.add(pet);
    }

    //camera
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    //create tilemap
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 64,
      tileHeight: 64,
    });
    const tileset = map.addTilesetImage("tiles1", "mapTile");
    const tileset2 = map.addTilesetImage("wild-fire", "wildFire");

    if (!tileset || !tileset2) throw new Error("tileset is undefined");
    const layer = map.createLayer("Tile Layer 1", tileset, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", tileset2, 0, 0);
    if (!layer || !layer2) throw new Error("layer is undefined");
    layer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, layer);
    this.physics.add.collider(this.monsters, layer);
    layer.setDepth(-2);
    layer2.setDepth(5);

    //spawn max 10 wild monsters between 1740,1940 and 2760,2061
    const maxWildMonsters = 10;
    const wildMonsters: Monster[] = [];
    for (let i = 0; i < maxWildMonsters; i++) {
      const x = Phaser.Math.Between(1740, 2760);
      const y = Phaser.Math.Between(1940, 2061);
      const randomMonster = new RandomMonster(this, x, y, "wild");
      this.updateChildrenGroup.add(randomMonster);
      wildMonsters.push(randomMonster);
    }
    this.monsters.addMultiple(wildMonsters);

    //ui
    const petsButton = this.add.image(
      this.cameras.main.width - 50,
      this.cameras.main.height - 50,
      "pets-button"
    );
    petsButton.setScrollFactor(0);
    petsButton.setDepth(20);
    petsButton.setDisplaySize(50, 50);
    petsButton.setInteractive();

    //-pets grid
    const petsGrid = this.rexUI.add.gridTable({
      x: this.cameras.main.width / 2,
      y: this.cameras.main.height / 2,
      width: 550,
      height: 500,

      scrollMode: 0,

      background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x0f0b1cff),

      table: {
        cellWidth: 150,
        cellHeight: 100,
        columns: 3,
        mask: {
          padding: 2,
        },
        reuseCellContainer: true,
      },

      slider: {
        track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x0c0a0cff),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x3a3838ff),
      },

      space: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
        table: 20,
      },

      mouseWheelScroller: {
        focus: false,
        speed: 0.1,
      },

      createCellContainerCallback: function (cell: any, cellContainer: any) {
        var scene = cell.scene,
          width = cell.width,
          height = cell.height,
          item = cell.item,
          index = cell.index;
        if (cellContainer === null) {
          cellContainer = scene.rexUI.add.label({
            width: width,
            height: height,

            orientation: 0,
            background: scene.rexUI.add
              .roundRectangle(0, 0, 100, 100, 0)
              .setStrokeStyle(2, "black"),
            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
            text: scene.add.text(0, 0, ""),

            space: {
              icon: 10,
              left: 15,
              top: 0,
            },
          });
          console.log(cell.index + ": create new cell-container");
        } else {
          console.log(cell.index + ": reuse cell-container");
        }

        // Set properties from item value
        cellContainer.setMinSize(width, height); // Size might changed in this demo
        cellContainer.getElement("text").setText(item.id); // Set text of text object
        cellContainer.getElement("icon").setFillStyle(item.color); // Set fill color of round rectangle object
        cellContainer
          .getElement("background")
          .setStrokeStyle(2, "black")
          .setDepth(25);
        return cellContainer;
      },

      items: this.CreateItems(),
    });
    petsGrid.layout();
    petsGrid.setScrollFactor(0);
    petsGrid.setDepth(20);
    petsGrid.setVisible(false);

    petsButton.on("pointerdown", () => {
      petsGrid.setVisible(!petsGrid.visible);
    });
  }

  CreateItems() {
    var data = [];
    for (const monster in this.userData[0].collected_monster) {
      data.push({
        id: this.userData[0].collected_monster[monster].monster_name,
        color: "red",
      });
    }

    return data;
  }

  update() {
    //console.log(this.player?.x, this.player?.y);
  }

  getPlayer(): Player {
    return this.player as Player;
  }
}
