import rawDividend from './assets/data/MSFTDividend.json';
import rawPrice from './assets/data/MSFTPrice.json';
import {DividendData, StockPriceData} from './types';

const dividend: Array<DividendData> = rawDividend.map((v) => ({
	timestamp: new Date(v.Date).getTime(),
	value: v.Dividends
}));
const price: Array<StockPriceData> = rawPrice.map((v) => ({timestamp: new Date(v.Date).getTime(), value: v.Close}));

export default {
	price,
	dividend
};
