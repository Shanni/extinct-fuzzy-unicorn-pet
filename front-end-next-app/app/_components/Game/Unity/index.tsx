"use client";
import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Script from "next/script";

const CDN_URL = "https://pub-9c776bf7a5e7476f81a686c2ef2769fd.r2.dev";

export default function UnityGame() {
  //check if in development or production
  const loaderUrl = `${CDN_URL}/Build/build.loader.js`;
  const dataUrl = `${CDN_URL}/Build/build.data`;
  const frameworkUrl = `${CDN_URL}/Build/build.framework.js`;
  const codeUrl = `${CDN_URL}/Build/build.wasm`;

  //urls for unity web3 files to manually load
  //for connecting to web3 wallet
  const web3NetworkUrl = `${CDN_URL}/network.js`;
  const web3ScriptUrl = `${CDN_URL}/web3/index.js`;
  const web3ModelUrl = `${CDN_URL}/web3/lib/web3modal.js`;
  const web3MinUrl = `${CDN_URL}/web3/lib/web3.min.js`;

  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: loaderUrl,
    dataUrl: dataUrl,
    frameworkUrl: frameworkUrl,
    codeUrl: codeUrl,
  });

  return (
    <>
      <div
        className="w-full flex content-center justify-center "
        id="game-content"
        key="game-content"
      >
        <Script src={web3ScriptUrl}></Script>
        <Script src={web3ModelUrl}></Script>
        <Script src={web3MinUrl}></Script>
        <Script src={web3NetworkUrl}></Script>
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={window.devicePixelRatio}
          matchWebGLToCanvasSize={true}
          className="w-full"
        />
      </div>

      <button
        className="bg-green rounded p-2 m-2 text-white font-bold float-right"
        onClick={() => {
          requestFullscreen(true);
        }}
      >
        Full Screen
      </button>
    </>
  );
}
