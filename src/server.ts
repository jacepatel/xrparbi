import * as prices from "./services/prices";

async function go(displayCoin, getPrice, coin, currency) {
  let currentCoinPrice = await getPrice(coin, currency);
  console.log(`The current ${displayCoin} price is `, currentCoinPrice);
}

// EXAMPLE PRICE CALLS.
go('Ripple', prices.getPrices, 'XRP', 'AUD');
go('Bitcoin', prices.getPrices, 'BTC', 'AUD');
go('Ripple to BTC', prices.getPrices, 'XRP', 'BTC');


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