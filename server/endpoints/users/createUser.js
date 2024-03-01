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

	//validating password
	if (!validator.isStrongPassword(password)) {
		// errors.push({
		// 	passwordError:
		// 		'Make sure your password is at least 8 characters long. Contains at least one lowercase letter. Contains at least one uppercase letter. Contains at least one digit. Contains at least one special character',
		// });

		let passwordErrors;

		switch (true) {
			case password.length < 8:
				passwordErrors =
					'Make sure your password is at least 8 characters long';

				break;

			case !/[a-z]/.test(password):
				passwordErrors =
					'Password should contain at least one lowercase letter';

				break;

			case !/[A-Z]/.test(password):
				passwordErrors =
					'Password should contain at least one uppercase letter';

				break;

			case !/\d/.test(password):
				passwordErrors = 'Password should contain at least one digit.';

				break;

			case !/[!@#$%^&*(),.?":{}|<>]/.test(password):
				passwordErrors =
					'Password should contain at least one special character.';

				break;

			default:
				break;
		}

		errors.push({
			passwordError: passwordErrors,
		});
	}

	//hashing password

	if (errors.length > 0) {
		return res.status(400).json({ errors });
	} else {
		async function hashPassword(password) {
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);

			return hashedPassword;
		}

		hashPassword(password).then((hashedPassword) => {
			console.log(hashedPassword);
			newUser.password = hashedPassword;
			console.log(newUser);
		});

		try {
			await client.connect();
			const db = await client.db('livechat');

			const existingUser = await db.collection('users').findOne({
				$or: [{ fName: newUser.fName }, { email: newUser.email }],
			});
			console.log(existingUser);

			if (existingUser) {
				res
					.status(409)
					.json({ status: 409, message: 'user or email already taken' });
			} else {
				const result = await db
					.collection('users')
					.insertOne({ _id: new ObjectId(), ...newUser });

				res.status(200).json({ status: 200, data: result });
			}
		} catch (err) {
			res.status(500).json({ status: 500, message: err.message });
		} finally {
			client.close();
		}
	}
};

module.exports = createUser;
