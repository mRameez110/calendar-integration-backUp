const jwt = require('jsonwebtoken');
const { InvalidCredentialError } = require('../utils/errorClass');

const googleAuthService = async (user) => {
	if (!user) {
		throw new InvalidCredentialError("User not found", 404);
	}

	const token = jwt.sign(
		{ userId: user.id, email: user.email },
		process.env.JWT_SECRET,
		{ expiresIn: '2h' }
	);

	return `http://localhost:3000/home?auth_token=${token}`;
}
module.exports = { googleAuthService };
