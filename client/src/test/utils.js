const fetchRequest = async (api) => {
	try {
		const data = await api();
		if (data.error) throw new Error(data.error);
		return data;
	} catch (err) {
		return error;
	}
};

export default fetchRequest;
