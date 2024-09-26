export const generateDummyData = (numberOfRows) => {
	const dummyData = [];
	for (let i = 0; i < numberOfRows; i++) {
		dummyData.push({
			id: Date.now() + i, // Add a unique id
			rank: i + 1,
			token: {
				tokenName: `Token Name ${i + 1}`,
				tokenSymbol: `TKN${i + 1}`,
				imgSrc: undefined,
				blockchain: 'ETH',
				blockchainId: 'ethereum'
			},
			price: (Math.random() * 0.01).toFixed(6), // Random price between 0 and 0.01
			age: Math.floor(Math.random() * 30), // Random age between 0 and 30 days
			txns: Math.floor(Math.random() * 100000), // Random transaction count up to 100,000
			volume: (Math.random() * 500000).toFixed(0), // Random volume up to $500K
			makers: Math.floor(Math.random() * 100000), // Random maker count up to 100,000
			'5m': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -1% and 1%
			'6h': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -1% and 1%
			'1h': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -1% and 1%
			'24h': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -5% and 5%
			liquidity: (Math.random() * 500000).toFixed(0), // Random liquidity up to $500K
			mcap: (Math.random() * 1000000).toFixed(0) // Random market cap up to $1M
		});
	}
	return dummyData;
};

export const generateDummyDataSingle = () => {
	const i = parseInt(Math.random() * 100);
	const data = {
		id: Date.now(), // Add a unique id
		rank: i,
		token: {
			tokenName: `Token Name ${Math.floor(Math.random() * 101)}`,
			tokenSymbol: `TKN${i + 1}`,
			imgSrc: undefined,
			blockchain: 'ETH',
			blockchainId: 'ethereum'
		},
		price: (Math.random() * 0.01).toFixed(6), // Random price between 0 and 0.01
		age: Math.floor(Math.random() * 30), // Random age between 0 and 30 days
		txns: Math.floor(Math.random() * 100000), // Random transaction count up to 100,000
		volume: (Math.random() * 500000).toFixed(0), // Random volume up to $500K
		makers: Math.floor(Math.random() * 100000), // Random maker count up to 100,000
		'5m': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -1% and 1%
		'6h': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -1% and 1%
		'1h': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -1% and 1%
		'24h': (1000 * (Math.random() * 2 - 1)).toFixed(2), // Random percentage between -5% and 5%
		liquidity: (Math.random() * 500000).toFixed(0), // Random liquidity up to $500K
		mcap: (Math.random() * 1000000).toFixed(0) // Random market cap up to $1M
	};
	return data;
};
