import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/app/components/Navbar/navigationData";
import unicorn_logo from "@/public/images/Logo/unicorn_logo.png";

interface Social {
  imgsrc: string;
  href: string;
}

const socialLinks: Social[] = [
  { imgsrc: "/images/Footer/insta.svg", href: "https://instagram.com/" },
  { imgsrc: "/images/Footer/dribble.svg", href: "https://dribble.com/" },
  { imgsrc: "/images/Footer/twitter.svg", href: "https://twitter.com/" },
  { imgsrc: "/images/Footer/youtube.svg", href: "https://youtube.com/" },
];

const footer = () => {
  return (
    <div className=" relative">
      <div className="radial-bg hidden lg:block"></div>
      <div className="mx-auto max-w-2xl mt-64 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* COLUMN-1 */}

          <div className="col-span-6">
            <img
              className="block h-12 w-20px mb-4"
              src={unicorn_logo.src}
              alt="Crypto-Logo"
            />
            <h3 className="text-lightblue text-sm font-normal leading-9 mb-4 lg:mb-16">
              {" "}
              Extinct-fuzzy-unicorn-pet is a collection of countless cute
              monsters. Each monster is unique and has its own characteristics.
              You can collect, trade, and play with your monsters in our game
              world.
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((items, i) => (
                <Link href={items.href} key={i}>
                  <img
                    src={items.imgsrc}
                    alt={items.imgsrc}
                    className="footer-icons"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* CLOUMN-2/3 */}

          <div key={1} className="group relative col-span-2">
            <p className="text-white text-xl font-medium mb-9">Useful Links</p>
            <ul>
              {navigation.map((items) => (
                <li key={items.name} className="mb-5">
                  <Link
                    href={items.href}
                    className="text-offwhite  text-sm font-normal mb-6 space-links"
                  >
                    {items.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4">
            <h3 className="text-white text-xl font-medium mb-9">Contact Us</h3>
            <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2">
              <Image
                src={"/images/Footer/number.svg"}
                alt="number-icon"
                width={20}
                height={20}
              />
              (778) 861-1008
            </h4>
            <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2">
              <Image
                src={"/images/Footer/email.svg"}
                alt="email-icon"
                width={20}
                height={20}
              />
              qz154772610@gmail.com
            </h4>
            <h4 className="text-offwhite text-sm font-normal mb-6 flex gap-2">
              <Image
                src={"/images/Footer/address.svg"}
                alt="address-icon"
                width={20}
                height={20}
              />
              8200 Jones Rd, Richmond, BC, Canada
            </h4>
          </div>
        </div>
      </div>

      {/* All Rights Reserved */}

      <div className="py-8 px-4 border-t border-t-lightblue">
        <h3 className="text-center text-offwhite">
          @2023 - All Rights Reserved by{" "}
          <Link href="/"> Extinct-fuzzy-unicorn-pet.com</Link>
        </h3>
      </div>
    </div>
  );
};

export default footer;
