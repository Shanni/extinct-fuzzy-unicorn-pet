import MongooDBConn from "../libs/mongodb";

const walletAddress = "0x1234567890123456789012345678901234567890";
const walletAddress2 = "0x3334567890123456789012345678901234567890";

async function getUserInfoByWallet() {
  const dbConn = await MongooDBConn();
  const db = dbConn.db("test");
  const collection = db.collection("User");
  const result = await collection
    .find({ wallet_address: walletAddress2 })
    .toArray();
  return result;
}

export default getUserInfoByWallet;
