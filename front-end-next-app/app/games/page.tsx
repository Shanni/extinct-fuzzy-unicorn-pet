import Link from "next/link";

export default function Games() {
  return (
    <main className="max-w-[1024px] m-auto">
      <h1 className="page-title font-black text-5xl text-white text-center m-5">
        Unicorn World Games - Coming Soon
      </h1>
      <div className="max-w-[1024px] flex">
        <Link
          className="bg-green rounded p-2 m-2 text-white font-bold float-right"
          href="/games/monster-world"
        >
          monster-world
        </Link>
        <Link
          className="bg-green rounded p-2 m-2 text-white font-bold float-right"
          href="/games/monster-garden"
        >
          monster-garden
        </Link>
      </div>
    </main>
  );
}
