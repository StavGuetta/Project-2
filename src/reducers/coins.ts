import Coin from "../interfaces/coin.js";

export default function reduceCoins(coins: Coin[]): string {
    return coins.map(coin => `
    <div class="col-sm-6 col-md-3">
        <div class="card">
            <div class="card-body">
                <div class="switch-title-container">
                    <h5 class="card-title">${coin.name}</h5>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault-${coin.id}">
                    </div>
                </div>
                <p class="card-text">${coin.symbol}</p>
                <a href="#" id="more-info-${coin.id}" class="btn btn-primary" id="" data-bs-toggle="collapse"
                    data-bs-target="#collapse-${coin.id}">More Info</a>
                <div class="collapse" id="collapse-${coin.id}">
                    <div class="card card-body" id="data-container-${coin.id}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `).reduce((acc, curr) => acc + curr, '');
}