import * as prices from "./services/prices";
import * as orders from "./services/orders";
import * as config from "config";

const MINIMUM_AUD_BUY_VALUE = config.get("minimumAudBuyValue")

async function logCurrentPrice(displayCoin, getPrice, coin, currency) {
  let currentCoinPrice = await getPrice(coin, currency);
  console.log(`The current ${displayCoin} price is `, currentCoinPrice);
}

async function logOrderBuyPrice(displayCoin, getOrderPrice, coin, currency) {
  let currentOrderPrice = await getOrderPrice(coin, currency);
  console.log(`The current average price ${displayCoin} to purchase ${MINIMUM_AUD_BUY_VALUE}${currency} is `, currentOrderPrice);
}

async function logOrderSellPrice(displayCoin, getOrderPrice, coin, currency) {
  let currentOrderPrice = await getOrderPrice(coin, currency);
  console.log(`The current average price ${displayCoin} to sell ${MINIMUM_AUD_BUY_VALUE}${currency} is `, currentOrderPrice);
}

// EXAMPLE PRICE CALLS.
async function listPrices() {
  await logCurrentPrice('XRP', prices.getPrices, 'XRP', 'AUD');
  await logOrderBuyPrice('XRP', orders.getAveragePriceOfBuyingMinimum, 'XRP', 'AUD');
  await logOrderSellPrice('XRP', orders.getAveragePriceOfSellingMinimum, 'XRP', 'AUD');

  await logCurrentPrice('BTC', prices.getPrices, 'BTC', 'AUD');
  await logOrderBuyPrice('BTC', orders.getAveragePriceOfBuyingMinimum, 'BTC', 'AUD');
  await logOrderSellPrice('BTC', orders.getAveragePriceOfSellingMinimum, 'BTC', 'AUD');
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