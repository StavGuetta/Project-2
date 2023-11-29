export default interface CoinData {
    image: {
        thumb: string;
        small: string;
    };
    market_data: {
        current_price: {
            usd: number;
            eur: number;
            ils: number;
    }}
}