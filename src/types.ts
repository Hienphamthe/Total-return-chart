export interface StockPriceData {
	timestamp: number;
	value: number;
}
export interface DividendData {
	timestamp: number;
	value: number;
}

export interface MockData {
	price: StockPriceData[];
	dividend: DividendData[];
}
