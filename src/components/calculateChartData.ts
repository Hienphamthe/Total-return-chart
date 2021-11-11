import {DividendData, StockPriceData} from '@/types';

export default (
	initialCapital: number,
	mockData: {price: StockPriceData[]; dividend: DividendData[]}
): {capitalGainChartData: number[][]; totalReturnChartData: number[][]} => {
	const calculateGain = (currentPrice: number, numberOfShare: number, remainCapital: number) =>
		((currentPrice * numberOfShare + remainCapital) / initialCapital - 1) * 100;

	const capitalGainChartData = () => {
		const numberOfShare = Math.floor(initialCapital / mockData.price[0].value);
		const remainCapital = initialCapital % mockData.price[0].value;

		return mockData.price.map((v, i) => [
			v.timestamp,
			i === 0 ? 0 : calculateGain(v.value, numberOfShare, remainCapital)
		]);
	};

	const totalReturnChartData = () => {
		let numberOfShare = Math.floor(initialCapital / mockData.price[0].value);
		let remainCapital = initialCapital % mockData.price[0].value;
		const chartData: number[][] = [];
		let exDivDate = 0;

		mockData.price.forEach((priceData, i) => {
			mockData.dividend.some((dividendData) => {
				const isReinvestingDividend =
					priceData.timestamp >= dividendData.timestamp &&
					Math.min(priceData.timestamp, dividendData.timestamp) > exDivDate;

				if (isReinvestingDividend) {
					const returnOnDividend = numberOfShare * dividendData.value;
					numberOfShare = numberOfShare + Math.floor((returnOnDividend + remainCapital) / priceData.value);
					remainCapital = (returnOnDividend + remainCapital) % priceData.value;
					exDivDate = dividendData.timestamp;
					return true;
				}
			});
			chartData.push([priceData.timestamp, i === 0 ? 0 : calculateGain(priceData.value, numberOfShare, remainCapital)]);
		});

		return chartData;
	};

	return {
		capitalGainChartData: capitalGainChartData(),
		totalReturnChartData: totalReturnChartData()
	};
};
