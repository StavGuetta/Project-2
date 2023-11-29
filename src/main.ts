import CoinData from './interfaces/coin-data.js';
import Coin from './interfaces/coin.js';
import reduceCoins from './reducers/coins.js';
import Cache from './Cache.js';
import { coinsContainerClicked, addCoinToLiveReports } from './event-listeners/coin.js';

const cache = Cache.getInstance();

async function getCoins(): Promise<Coin[]> {
    // const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    // const response = await fetch('coins.json');
    // const coins: Coin[] = await response.json();
    // const cacheResponse = await cache.getData('https://api.coingecko.com/api/v3/coins/list')
    const cacheResponse = await cache.getData('coins.json')

    const coins: Coin[] = (cacheResponse) as Coin[];
    console.log(cacheResponse);
    return coins;
}

(async () => {
    // init
    document.getElementById('coins-container').addEventListener('click', coinsContainerClicked);
    document.getElementById('coins-container').addEventListener('click', addCoinToLiveReports);

    // get data
    const coins = await getCoins();

    // prepare data

    // cut list to 100 coins
    const shortList = coins.slice(0, 100);


    // reduce to create the HTML string of the cards
    const html = reduceCoins(shortList);
    // display
    document.getElementById('coins-container').innerHTML = html;

})();