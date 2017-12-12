// This file details the current prices on BTCM

import * as config from "config"
import * as rp from "request-promise"

const API_KEY = config.get("BTCMarkets.apiKey")
const SECRET_KEY = config.get("BTCMarkets.secretKey")
const BASE_URL = config.get("BTCMarkets.url")

var options = {
    uri: "",
    method: "GET",
    json: true
};

export async function getPrices(coin, currency) {
	let requestOptions = options;
	requestOptions.uri = `${BASE_URL}/market/${coin}/${currency}/tick`;
	let currentPriceInformation = await rp(options)
	return currentPriceInformation;
}