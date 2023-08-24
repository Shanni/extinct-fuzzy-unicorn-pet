import Game from "@/app/components/Game";
import getUserInfoByWallet from "@/api/test/dummyApiCaller";

export default async function MonsterWorld() {
  const userData = JSON.stringify(await getUserInfoByWallet());
  return (
    <main className="max-w-[1024px] m-auto">
      <h1 className="page-title font-black text-5xl text-white text-center m-5">
        Monster World
      </h1>
      <Game userData={userData} />
    </main>
  );
}
