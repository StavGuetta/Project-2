var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cache from "../Cache.js";
const cache = Cache.getInstance();
const liveReports = [];
function getCoinData(coinId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cacheResponse = yield cache.getData(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        const coinData = (cacheResponse);
        return coinData;
    });
}
export function coinsContainerClicked(e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (e.target instanceof HTMLElement) {
            const element = e.target;
            if (element.id.startsWith('more-info-')) {
                const coinId = element.id.substring('more-info-'.length);
                const coinData = yield getCoinData(coinId);
                console.log(coinData);
                document.getElementById(`data-container-${coinId}`).innerHTML = `
                <img src="${coinData.image.thumb}"> <br>
                usd: $${coinData.market_data.current_price.usd} <br>
                eur: €${coinData.market_data.current_price.eur} <br>
                nis: ₪${coinData.market_data.current_price.ils}
            `;
            }
        }
    });
}
export function addCoinToLiveReports(e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (e.target instanceof HTMLElement) {
            const element = e.target;
            if (element.id.startsWith('flexSwitchCheckDefault-')) {
                const coinId = element.id.substring('flexSwitchCheckDefault-'.length);
                const coinData = yield getCoinData(coinId);
                if (element.checked) {
                    console.log('checked');
                    if (liveReports.length < 5) {
                        liveReports.push(coinData);
                    }
                    else {
                        console.log('too many coins in array');
                        alert('123');
                        // const myModal = new bootstrap.Modal('#myModal')
                        // myModal.show();
                    }
                }
                else {
                    const indexToRemove = liveReports.indexOf(coinData);
                    if (indexToRemove !== -1) {
                        liveReports.splice(indexToRemove, 1);
                    }
                    ;
                }
                ;
                console.log(liveReports);
            }
            ;
        }
        ;
    });
}
;
