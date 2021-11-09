import rawDividend from './assets/data/MSFTDividend.json';
import rawPrice from './assets/data/MSFTPrice.json';
import {DividendData, StockPriceData} from './types';

const dividend: Array<DividendData> = rawDividend.map((v) => ({timestamp: new Date(v.Date), value: v.Dividends}));
const price: Array<StockPriceData> = rawPrice.map((v) => ({timestamp: new Date(v.Date), value: v.Close}));

export default () => {
	console.log(dividend);
	console.log(price);
};
