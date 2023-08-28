"use client";
import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Script from "next/script";

export default function UnityGame() {
  //check if in development or production

  // useEffect(() => {
  //   const makeCall = async () => {
  //     await fetch("/api/getScript", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json", query: "monster-world" },
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   };

  //   makeCall();
  // }, []);
  //urls for unity game
  const loaderUrl =
    "/api/getScript?fileName=monster-garden/build/build.loader.js";
  const dataUrl = "/api/getScript?fileName=monster-garden/build/build.data";
  const frameworkUrl =
    "/api/getScript?fileName=monster-garden/build/build.framework.js";
  const codeUrl = "/api/getScript?fileName=monster-garden/build/build.wasm";

  //urls for unity web3 files to manually load
  //for connecting to web3 wallet
  const web3NetworkUrl = "/api/getScript?fileName=monster-garden/network.js";
  const web3ScriptUrl = "/api/getScript?fileName=monster-garden/web3/index.js";
  const web3ModelUrl =
    "/api/getScript?fileName=monster-garden/web3/lib/web3modal.js";
  const web3MinUrl =
    "/api/getScript?fileName=monster-garden/web3/lib/web3.min.js";

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
