// This file details the current prices on BTC
import * as config from "config";
import * as rp from "request-promise";
import { OrderInformation } from "../models/orderInformation"; 

const API_KEY = config.get("BTCMarkets.apiKey");
const SECRET_KEY = config.get("BTCMarkets.secretKey");
const BASE_URL = config.get("BTCMarkets.url");

var options = {
    uri: "",
    method: "GET",
    json: true
};

// This takes three arguments, (coin1 and coin2) which are the traing pair, 
// and the tradeCapital, which is the total amount of coin2 you will use to BUY coin1.
// It returns the average price of buying tradeCapital worth of coin1.
// E.g. getAveragePriceOfBuyingMinimum(XRP, AUD, 5000) might return:
//      The current average XRP/AUD BID price using 5000AUD  is  1.47
export async function getAveragePriceOfBuyingMinimum(coin1, coin2, tradeCapital) {
    let requestOptions = options;
    requestOptions.uri = `${BASE_URL}/market/${coin1}/${coin2}/orderbook`;
    let currentOrderInformation: OrderInformation = await rp(options)
    let calculatedAsks = 0;
    let listOfViableOrdersValues = [];
    const minimumBuyValue: number = Number(tradeCapital);
    // console.log(currentOrderInformation)
    currentOrderInformation.asks.forEach((ask) => {
        if (calculatedAsks < tradeCapital) {
            const orderPrice = ask[0];
            const askQuantity = ask[1];
            const orderValue = orderPrice * askQuantity;
            let orderWeight = 0;
            if ( ( calculatedAsks + orderValue ) > tradeCapital) {
                orderWeight = ( minimumBuyValue - calculatedAsks ) / minimumBuyValue
            }
            else {
                orderWeight = orderValue / minimumBuyValue;
            }
            calculatedAsks += orderValue;
            listOfViableOrdersValues.push({
                orderWeight,
                orderPrice,
            })
        }
        return;
    })
    
    let averagePrice = 0;
    listOfViableOrdersValues.forEach((order) => {
        averagePrice += order.orderWeight * order.orderPrice;
    })

    return averagePrice;
}


// This takes three arguments, (coin1 and coin2) which are the traing pair, 
// and the tradeCapital, which is the total amount of coin1 you will SELL to buy coin2.
// It returns the average price of selling tradeCapital worth of coin1.
// E.g. getAveragePriceOfSellingMinimum(XRP, AUD, 5000) might return:
//      The current average XRP/AUD ASK price 5000XRP is  1.4504053188051997
export async function getAveragePriceOfSellingMinimum(coin1, coin2, tradeCapital) {
	let requestOptions = options;
    requestOptions.uri = `${BASE_URL}/market/${coin1}/${coin2}/orderbook`;
    let currentOrderInformation: OrderInformation = await rp(options)
    let calculatedBids = 0;
    let listOfViableOrdersValues = [];
    const minimumBuyValue: number = Number(tradeCapital);
    currentOrderInformation.bids.forEach((bid) => {
        if (calculatedBids < tradeCapital) {
            const orderPrice = bid[0];
            const bidQuantity = bid[1];
            const orderValue = orderPrice * bidQuantity;
            let orderWeight = 0;
            if ( ( calculatedBids + orderValue ) > tradeCapital) {
                orderWeight = ( minimumBuyValue - calculatedBids ) / minimumBuyValue
            }
            else {
                orderWeight = orderValue / minimumBuyValue;
            }
            calculatedBids += orderValue;
            listOfViableOrdersValues.push({
                orderWeight,
                orderPrice,
            })
        }
        return;
    })
    
    let averagePrice = 0;
    listOfViableOrdersValues.forEach((order) => {
        averagePrice += order.orderWeight * order.orderPrice;
    })

	return averagePrice;
}