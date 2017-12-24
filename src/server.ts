import * as prices from "./services/prices";
import * as orders from "./services/orders";
import * as config from "config";

const MINIMUM_AUD_BUY_VALUE = config.get("minimumAudBuyValue")

async function logCurrentPrice(getPrice, coin1, coin2) {
  let currentCoinPrice = await getPrice(coin1, coin2);
  console.log(`The current ${coin1}/${coin2} price is `, currentCoinPrice);
}

async function logOrderBuyPrice(getOrderPrice, coin1, coin2, tradeCapital) {
  let currentOrderPrice = await getOrderPrice(coin1, coin2, tradeCapital);
  console.log(`The current average ${coin1}/${coin2} BID price using ${tradeCapital}${coin2}  is `, currentOrderPrice);
}

async function logOrderSellPrice(getOrderPrice, coin1, coin2, tradeCapital) {
  let currentOrderPrice = await getOrderPrice(coin1, coin2, tradeCapital);
  console.log(`The current average ${coin1}/${coin2} ASK price using ${tradeCapital}${coin1} is `, currentOrderPrice);
}

async function totalBuyQuantity(getOrderPrice, coin1, coin2, tradeCapital) {
  let currentOrderPrice = await getOrderPrice(coin1, coin2, tradeCapital);
  // const minimumBuyValue: number = Number(MINIMUM_AUD_BUY_VALUE);
  let coinQuantity = tradeCapital / currentOrderPrice
  console.log(`The total ${coin1} we can purchase for ${tradeCapital}${coin2} is `, coinQuantity)
}

async function totalSellQuantity(getOrderPrice, coin1, coin2, tradeCapital) {
  let currentOrderPrice = await getOrderPrice(coin1, coin2, tradeCapital);
  // const minimumBuyValue: number = Number(MINIMUM_AUD_BUY_VALUE);
  let coinQuantity = tradeCapital * currentOrderPrice
  console.log(`The total ${coin2} we can purchase for ${tradeCapital}${coin1} is `, coinQuantity)
}

// EXAMPLE PRICE CALLS.
async function listPrices() {
  // Use starting AUD amount as totalCapital here.
  await logCurrentPrice(prices.getPrices, 'BTC', 'AUD');
  await logOrderBuyPrice(orders.getAveragePriceOfBuyingMinimum, 'BTC', 'AUD', MINIMUM_AUD_BUY_VALUE);
  await totalBuyQuantity(orders.getAveragePriceOfBuyingMinimum, 'BTC', 'AUD', MINIMUM_AUD_BUY_VALUE);

  // Use total BTC purchased as totalCapital here.
  await logCurrentPrice(prices.getPrices, 'XRP', 'BTC');
  await logOrderBuyPrice(orders.getAveragePriceOfBuyingMinimum, 'XRP', 'BTC', 0.24217942721564958);
  await totalBuyQuantity(orders.getAveragePriceOfBuyingMinimum, 'XRP', 'BTC', 0.24217942721564958);

  // Use total XRP purchased as totalCapital here.
  await logCurrentPrice(prices.getPrices, 'XRP', 'AUD');
  await logOrderSellPrice(orders.getAveragePriceOfSellingMinimum, 'XRP', 'AUD', 3345.4817960443374);
  await totalSellQuantity(orders.getAveragePriceOfSellingMinimum, 'XRP', 'AUD', 3345.4817960443374);
}

listPrices();


// General gist
// If you have AUD in Balance without orders then enter the buy cycle

// SELL CYCLE
// Sell XRP at top of channel if you have XRP available
// If XRP > BTC > AUD is more than the middle of buy / sell then sell via that

// BUY CYCLE
// Set the buy / sell channel ie buy at 33, sell at 34
// If external price dips then sell at buy price
// If external price rises then hedge and cancel half, dollar cost average on the way up if it goes
// If AUD > BTC > XRP + 0.52% is less than the middle of buy / sell then buy