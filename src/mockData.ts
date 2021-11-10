/* eslint-disable @typescript-eslint/no-explicit-any */
import rawDividendMSFT from './assets/data/MSFTDividend.json';
import rawPriceMSFT from './assets/data/MSFTPrice.json';
import rawDividendXOM from './assets/data/XOMDividend.json';
import rawPriceXOM from './assets/data/XOMPrice.json';
import {DividendData, StockPriceData} from './types';

const getDividendData = (rawData: any): DividendData[] =>
	rawData.map((v: any) => ({
		timestamp: new Date(v.Date).getTime(),
		value: v.Dividends
	}));

const getPriceData = (rawData: any): StockPriceData[] =>
	rawData.map((v: any) => ({timestamp: new Date(v.Date).getTime(), value: v.Close}));

export default {
	msft: {
		price: getPriceData(rawPriceMSFT),
		dividend: getDividendData(rawDividendMSFT)
	},
	xom: {
		price: getPriceData(rawPriceXOM),
		dividend: getDividendData(rawDividendXOM)
	}
};
