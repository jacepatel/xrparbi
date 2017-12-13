// This file details the current orders in BTCM

// This file details the current prices on BTCM

import * as config from "config"
import * as rp from "request-promise"
import { OrderInformation } from "../models/orderInformation"; 

const API_KEY = config.get("BTCMarkets.apiKey")
const SECRET_KEY = config.get("BTCMarkets.secretKey")
const BASE_URL = config.get("BTCMarkets.url")
let MINIMUM_AUD_BUY_VALUE = config.get("minimumAudBuyValue")

var options = {
    uri: "",
    method: "GET",
    json: true
};


// This returns the average price of buying MINIMUM_AUD_BUY_VALUE
export async function getAveragePriceOfBuyingMinimum(coin, currency) {
	let requestOptions = options;
    requestOptions.uri = `${BASE_URL}/market/${coin}/${currency}/orderbook`;
    let currentOrderInformation: OrderInformation = await rp(options)
    let calculatedAsks = 0;
    let listOfViableOrdersValues = [];
    const minimumBuyValue: number = Number(MINIMUM_AUD_BUY_VALUE);
    currentOrderInformation.asks.forEach((ask) => {
        if (calculatedAsks < MINIMUM_AUD_BUY_VALUE) {
            const orderPrice = ask[0];
            const askQuantity = ask[1];
            const orderValue = orderPrice * askQuantity;
            let orderWeight = 0;
            if ( ( calculatedAsks + orderValue ) > MINIMUM_AUD_BUY_VALUE) {
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