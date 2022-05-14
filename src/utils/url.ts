export const createSeachParams = (values: Record<string, any>): URLSearchParams => {
	let result = new URLSearchParams()
	for (const key in values) {
        if (!values[key]) continue
		result.append(key, values[key])
	}
	return result;
};
