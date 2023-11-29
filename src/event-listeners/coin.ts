import CoinData from "../interfaces/coin-data.js";
import Cache from "../Cache.js";
import * as bootstrap from "bootstrap";

const cache = Cache.getInstance();
const liveReports = [];

async function getCoinData(coinId: string): Promise<CoinData> {
    const cacheResponse = await cache.getData(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const coinData: CoinData = (cacheResponse) as CoinData;
    return coinData;
}

export async function coinsContainerClicked (e: MouseEvent){
    if(e.target instanceof HTMLElement){
        const element = e.target as HTMLElement;
        if(element.id.startsWith('more-info-')){
            const coinId = element.id.substring('more-info-'.length);
            const coinData = await getCoinData(coinId);
            console.log(coinData);
            document.getElementById(`data-container-${coinId}`).innerHTML = `
                <img src="${coinData.image.thumb}"> <br>
                usd: $${coinData.market_data.current_price.usd} <br>
                eur: €${coinData.market_data.current_price.eur} <br>
                nis: ₪${coinData.market_data.current_price.ils}
            `;
        }
    }
}

export async function addCoinToLiveReports (e: MouseEvent) {
    if(e.target instanceof HTMLElement){
        const element = e.target as HTMLInputElement;
        if(element.id.startsWith('flexSwitchCheckDefault-')){
            const coinId = element.id.substring('flexSwitchCheckDefault-'.length);
            const coinData = await getCoinData(coinId);
            if(element.checked){
                console.log('checked');
                if (liveReports.length < 5) {
                    liveReports.push(coinData);
                } else {
                    console.log('too many coins in array');
                    const myModal = new bootstrap.Modal('#myModal');
                    myModal.show();
                }
            } else{
                const indexToRemove = liveReports.indexOf(coinData);
                if (indexToRemove !== -1) {
                    liveReports.splice(indexToRemove, 1);
                };
            };
            console.log(liveReports);
        };
    };
    
};
