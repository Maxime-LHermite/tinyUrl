export type Theme = {
	name: string;
	colors: {
		typoMax: string;
		typoHigh: string;
		typoMedium: string;
		typoLow: string;
	};
	fontSizes: {
		XXL: number;
		M: number;
	};
	spacing: {
		None: 0;
		XXS: number;
		XS: number;
		S: number;
		M: number;
		L: number;
		XL: number;
		XXL: number;
	};
};

export const defaultTheme: Theme = {
	name: 'default',
	colors: {
		typoMax: '#000000',
		typoHigh: '#000000DE',
		typoMedium: '#0000009A',
		typoLow: '#00000061',
	},
	fontSizes: {
		XXL: 1.69,
		M: 1.06,
	},
	spacing: {
		None: 0,
		XXS: 4,
		XS: 8,
		S: 16,
		M: 24,
		L: 40,
		XL: 60,
		XXL: 100,
	},
};
