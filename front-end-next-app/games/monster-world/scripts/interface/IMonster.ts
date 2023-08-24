import { type } from "os";

type monsterRelationship = "pet" | "wild";

interface IMonster {
  relationship: monsterRelationship;
  currentHealth: number;
  maxHealth: number;
  attack: number;
}

export default IMonster;
