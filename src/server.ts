import * as prices from "./services/prices";

async function go() {
  let currentBitcoinPrice = await prices.getBtcAudPrice();
  console.log("The current bitcoin price is ", currentBitcoinPrice);
}

go();