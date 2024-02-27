const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

const createUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	console.log(req.body);

	const data = req.body;

	try {
		await client.connect();
		const db = await client.db('livechat');

		const result = await db
			.collection('users')
			.insertOne({ _id: new ObjectId(), data });
		if (result) {
			res.status(200).json({ status: 200, data: result });
		}
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = createUser;
