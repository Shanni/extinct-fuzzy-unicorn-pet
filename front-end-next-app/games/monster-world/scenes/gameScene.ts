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
  }

  update() {
    //console.log(this.player?.x, this.player?.y);
  }

  getPlayer(): Player {
    return this.player as Player;
  }
}
