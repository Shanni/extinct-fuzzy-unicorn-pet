"use client";
import { useEffect, useState } from "react";
import gameConfig from "@/games/monster-world/scripts/gameConfig";

export default function MonsterWorld() {
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    async function loadGame() {
      //lazy load phaser and game
      await import("phaser");

      //destroy old game canvas
      const oldCanvas = document.querySelector("canvas");
      if (oldCanvas) {
        oldCanvas.remove();
      }

      game?.destroy(true, true);

      setGame(new Phaser.Game(gameConfig));
    }

    loadGame();
  }, []);

  return (
    <main className="max-w-[1024px] m-auto">
      <h1 className="page-title font-black text-5xl text-white text-center m-5">
        Monster World
      </h1>
      <div
        className="w-full flex content-center justify-center"
        id="game-content"
        key="game-content"
      >
        {/** this is where game will be going */}
      </div>
    </main>
  );
}
