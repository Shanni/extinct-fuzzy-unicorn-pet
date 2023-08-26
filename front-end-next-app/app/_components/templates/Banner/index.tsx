"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const Banner = () => {
  const [isOpen, setOpen] = useState(false);

  function toGamePage() {
    window.location.href = "/games/monster-world";
  }

  return (
    <div className="bg-image relative" id="home-section">
      <div className="arrowOne"></div>
      <div className="radial-banner hidden lg:block"></div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="1YyAzVmP9xQ"
        onClose={() => setOpen(false)}
      />

      <div className="mx-auto max-w-7xl pt-16 lg:pt-40 sm:pb-24 px-6">
        <div className="height-work">
          <div className="grid grid-cols-1 lg:grid-cols-12 my-16">
            <div className="arrowTwo"></div>
            <div className="col-span-7">
              <h1 className="text-4xl lg:text-7xl font-bold mb-5 text-white md:4px md:text-start text-center">
                Collect & Trade <br /> Lil cute monsters
              </h1>
              <p className="text-white md:text-lg font-normal mb-10 md:text-start text-center">
                Collecting different monsters with unicorn <br /> play around
                with your monsters in our game world <br /> and trade them with
                other players
              </p>
              <div className="flex align-middle justify-center md:justify-start">
                <Link href={"#"} prefetch={false} onClick={toGamePage}>
                  <button className="text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton mr-6">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            <div className="max-w-[100%] col-span-5">
              <div className="arrowThree"></div>
              <div className="arrowFour"></div>
              <div className="arrowFive"></div>
              <div className="h-full max-w-[100%] flex justify-center content-center justify-items-center items-center mx-auto">
                <img src="/images/Banner/cartoon_unicorn.png" alt="nothing" />
              </div>
              <div className="arrowSix"></div>
              <div className="arrowSeven"></div>
              <div className="arrowEight"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
