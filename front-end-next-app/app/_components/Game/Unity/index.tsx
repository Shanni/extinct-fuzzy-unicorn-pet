"use client";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function UnityGame() {
  //console log header.host
  const host = window.location.host;
  const loaderUrl =
    "http://" + host + "/game/builds/monster-garden/build/build.loader.js";
  const dataUrl =
    "http://" + host + "/game/builds/monster-garden/build/build.data";
  const frameworkUrl =
    "http://" + host + "/game/builds/monster-garden/build/build.framework.js";
  const codeUrl =
    "http://" + host + "/game/builds/monster-garden/build/build.wasm";

  const web3NetworkUrl =
    "http://" + host + "/game/builds/monster-garden/network.js";
  const web3ScriptUrl =
    "http://" + host + "/game/builds/monster-garden/web3/index.js";
  const web3ModelUrl =
    "http://" + host + "/game/builds/monster-garden/web3/lib/web3modal.js";
  const web3MinUrl =
    "http://" + host + "/game/builds/monster-garden/web3/lib/web3.min.js";

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
