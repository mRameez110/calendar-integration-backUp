const { getUserAccountsService, removeUserAccountService } = require('../services/userService');

const getUserAccounts = async (req, res, next) => {
	try {
		const accounts = await getUserAccountsService(req.user);
		res.json(accounts);
	} catch (error) {
		next(error);
	}
};

const removeUserAccount = async (req, res, next) => {
	try {
		const message = await removeUserAccountService(req.user, req.params.accountId);
		res.json({ message });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getUserAccounts,
	removeUserAccount
};
