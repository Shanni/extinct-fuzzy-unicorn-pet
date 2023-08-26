"use client";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Script from "next/script";

export default function UnityGame() {
  //check if in development or production
  const env = process.env.NODE_ENV;

  const host = window.location.host;
  let loaderUrl = "";
  let dataUrl = "";
  let frameworkUrl = "";
  let codeUrl = "";

  //urls to the public folder for unity web3 files to manually load
  //for connecting to web3 wallet
  let web3NetworkUrl = "";
  let web3ScriptUrl = "";
  let web3ModelUrl = "";
  let web3MinUrl = "";

  if (env == "development") {
    let httpPrefix = "http://";

    //urls to the public folder for game files
    const host = window.location.host;
    loaderUrl =
      httpPrefix + host + "/game/builds/monster-garden/build/build.loader.js";
    dataUrl =
      httpPrefix + host + "/game/builds/monster-garden/build/build.data";
    frameworkUrl =
      httpPrefix +
      host +
      "/game/builds/monster-garden/build/build.framework.js";
    codeUrl =
      httpPrefix + host + "/game/builds/monster-garden/build/build.wasm";

    //urls to the public folder for unity web3 files to manually load
    //for connecting to web3 wallet
    web3NetworkUrl =
      httpPrefix + host + "/game/builds/monster-garden/network.js";
    web3ScriptUrl =
      httpPrefix + host + "/game/builds/monster-garden/web3/index.js";
    web3ModelUrl =
      httpPrefix + host + "/game/builds/monster-garden/web3/lib/web3modal.js";
    web3MinUrl =
      httpPrefix + host + "/game/builds/monster-garden/web3/lib/web3.min.js";
  } else if (env == "production") {
    //urls to the public folder for game files
    const host = window.location.host;
    loaderUrl = "/game/builds/monster-garden/build/build.loader.js";
    dataUrl = "/game/builds/monster-garden/build/build.data";
    frameworkUrl = "/game/builds/monster-garden/build/build.framework.js";
    codeUrl = "/game/builds/monster-garden/build/build.wasm";

    //urls to the public folder for unity web3 files to manually load
    //for connecting to web3 wallet
    web3NetworkUrl = "/game/builds/monster-garden/network.js";
    web3ScriptUrl = "/game/builds/monster-garden/web3/index.js";
    web3ModelUrl = "/game/builds/monster-garden/web3/lib/web3modal.js";
    web3MinUrl = "/game/builds/monster-garden/web3/lib/web3.min.js";
  }

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
      <Script src={web3ModelUrl}></Script>
      <Script src={web3MinUrl}></Script>
      <Script src={web3NetworkUrl}></Script>
      <Unity
        unityProvider={unityProvider}
        matchWebGLToCanvasSize={false}
        className="w-full"
      />
    </div>
  );
}
