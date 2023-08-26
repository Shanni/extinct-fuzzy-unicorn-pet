"use client";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Script from "next/script";

export default function UnityGame() {
  //check if in development or production
  let httpPrefix = "https://";
  const env = process.env.NODE_ENV;
  if (env == "development") {
    httpPrefix = "http://";
  } else if (env == "production") {
    httpPrefix = "https://";
  }

  //urls to the public folder for game files
  const host = window.location.host;
  const loaderUrl =
    httpPrefix + host + "/game/builds/monster-garden/build/build.loader.js";
  const dataUrl =
    httpPrefix + host + "/game/builds/monster-garden/build/build.data";
  const frameworkUrl =
    httpPrefix + host + "/game/builds/monster-garden/build/build.framework.js";
  const codeUrl =
    httpPrefix + host + "/game/builds/monster-garden/build/build.wasm";

  //urls to the public folder for unity web3 files to manually load
  //for connecting to web3 wallet
  const web3NetworkUrl =
    httpPrefix + host + "/game/builds/monster-garden/network.js";
  const web3ScriptUrl =
    httpPrefix + host + "/game/builds/monster-garden/web3/index.js";
  const web3ModelUrl =
    httpPrefix + host + "/game/builds/monster-garden/web3/lib/web3modal.js";
  const web3MinUrl =
    httpPrefix + host + "/game/builds/monster-garden/web3/lib/web3.min.js";

  const { unityProvider } = useUnityContext({
    loaderUrl: loaderUrl,
    dataUrl: dataUrl,
    frameworkUrl: frameworkUrl,
    codeUrl: codeUrl,
  });

  return (
    <div
      className="w-full flex content-center justify-center"
      id="game-content"
      key="game-content"
    >
      <Script src={web3ScriptUrl}></Script>
      <Script src={web3NetworkUrl}></Script>
      <Script src={web3ModelUrl}></Script>
      <Script src={web3MinUrl}></Script>
      <Unity
        unityProvider={unityProvider}
        matchWebGLToCanvasSize={false}
        className="w-full"
      />
    </div>
  );
}
