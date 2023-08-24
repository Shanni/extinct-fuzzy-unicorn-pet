"use client";
import { useEffect, useState } from "react";
import gameConfig from "@/games/monster-world/scripts/gameConfig";
import Phaser from "phaser";

// pages/index.js
import dynamic from 'next/dynamic'
 

export default function Game(props: { userData: string }) {
  const [game, setGame] = useState<Phaser.Game | null>(null);

  useEffect(() => {
    async function loadGame() {
      if (game) return;
      // //lazy load phaser and game
      // await import("phaser");

      const newGame = new Phaser.Game(gameConfig);

      newGame.scene.start("monster-world", { userData: props.userData });

      setGame(newGame);
    }
    loadGame();
  }, [game, props.userData]);

  return (
    <div
      className="w-full flex content-center justify-center"
      id="game-content"
      key="game-content"
    >
      {/** this is where game will be going */}
    </div>
  );
}
