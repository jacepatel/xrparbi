// This file details the current orders in BTCM

// This file details the current prices on BTCM

import * as config from "config"
import * as rp from "request-promise"
import { OrderInformation } from "../models/orderInformation"; 

const API_KEY = config.get("BTCMarkets.apiKey")
const SECRET_KEY = config.get("BTCMarkets.secretKey")
const BASE_URL = config.get("BTCMarkets.url")
const MINIMUM_AUD_BUY_VALUE = config.get("minimumBuyValue")

var options = {
    uri: "",
    method: "GET",
    json: true
};

export async function getOrders(coin, currency) {
	let requestOptions = options;
	requestOptions.uri = `${BASE_URL}/market/${coin}/${currency}/orderBook`;
    let currentOrderInformation: OrderInformation = await rp(options)
    // ASKS = PEOPLE SELLING
    let averageCostOfMinimimAudBuyValue;
    let calculatedAsks = 0;
    let listOfViableOrders = [];
    currentOrderInformation.asks.forEach((ask) => {
        if (calculatedAsks < MINIMUM_AUD_BUY_VALUE) {
            const askPrice = ask[0];
            const askQuantity = ask[1];
            const orderValue = askPrice * askQuantity;
            if (orderValue < MINIMUM_AUD_BUY_VALUE) {
                calculatedAsks += orderValue;
                listOfViableOrders.push([askPrice, askQuantity])
            } else {
                averageCostOfMinimimAudBuyValue = askPrice;
                return;
            }
            // if our orderValue is less than minimum_buy_value
            // push that to the array for calculating average price
            // else push the whole value
        }
        console.log("END");
        return;
    })
    // .asks.forEach((ask) => {
    //     ask.
    // })
	return currentPriceInformation;
}