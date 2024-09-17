interface Filter {
	// [key: string]: string | number | boolean | string[] | number[] | boolean[];
	[key: string]: string[];
}

export const queryFilter: Filter = {
	USA : ["usa", "united states", "united states of america", "new york"],
	Europe : ["europe", "germany", "france", "spain", "italy", "greece", "uk", "england", "poland", "belgium"],
	// Spain : ["spain", "madrid", "barcelona"],
	// France : ["france", "paris", "strasbourg"],
	// Germany : ["germany", "berlin", "munich"],
	// Italy : ["italy", "italia", "rome", "milan"],
	// UnitedKingdom : ["united kingdom", "london", "england"],
	// China : ["china", "beijing", "shanghai"],
	// Japan : ["japan", "tokyo", "osaka"],
	// SouthKorea : ["south korea", "seoul"],
	// India : ["india", "delhi", "mumbai"],
};