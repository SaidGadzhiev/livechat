const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const validator = require('validator');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
	const client = new MongoClient(MONGO_URI);

	const { fName, lName, email, password } = req.body;

	const newUser = req.body;

	console.log(newUser);

	const errors = [];

	//validating First Name
	const isValidFirstName = (fName) => {
		return typeof fName === 'string' && fName.length >= 2 && fName.length <= 15;
	};

	if (!isValidFirstName(fName)) {
		console.log(fName);
		errors.push({
			userError:
				'Make sure your first name is not smaller than 2 letters and not bigger than 15',
		});
	}

	//validating Lirst Name
	const isValidLastName = (lName) => {
		return typeof lName === 'string' && lName.length >= 2 && lName.length <= 15;
	};

	if (!isValidLastName(lName)) {
		console.log(lName);
		errors.push({
			userError:
				'Make sure your last name is not smaller than 2 letters and not bigger than 15',
		});
	}

	//validating email
	if (!validator.isEmail(email)) {
		console.log(!validator.isEmail(email));
		errors.push({
			emailError: 'Make sure to include @ and . in your email!',
		});
	}

	console.log(errors);

	try {
		await client.connect();
		const db = await client.db('livechat');

		// const result = await db
		// 	.collection('users')
		// 	.insertOne({ _id: new ObjectId(), data });
		// if (result) {
		// 	res.status(200).json({ status: 200, data: result });
		// }
	} catch (err) {
		res.status(500).json({ status: 500, message: err.message });
	} finally {
		client.close();
	}
};

module.exports = createUser;
