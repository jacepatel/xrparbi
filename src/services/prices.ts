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

export async function getBtcAudPrice() {
    let requestOptions = options;
    requestOptions.uri = `${BASE_URL}/market/BTC/AUD/tick`;
    let currentPriceInformation = await rp(options)
    return currentPriceInformation;
}

export async function getXrpBtcPrice() {}

export async function getXrpAudPrice() {}