export default function formatMoney(amount = 0) {
	const options = {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	};

	// check if its a clean amount
	// if (amount % 100 === 0) {
	//   options.minimumFractionDigits = 0;
	// }

	const formatter = Intl.NumberFormat('us', options);

	// return formatter.format(amount / 100);
	return formatter.format(amount);
}
