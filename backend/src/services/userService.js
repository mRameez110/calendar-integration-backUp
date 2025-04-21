const { NotFoundError } = require('../utils/errorClass');

const getUserAccountsService = async (user) => {
   if (!user) {
      throw new NotFoundError("User not found");
   }
   return user.googleAccounts;
};

const removeUserAccountService = async (user, accountId) => {
   if (!user) {
      throw new NotFoundError("User not found");
   }

   const accountExists = user.googleAccounts.some(
      acc => acc._id.toString() === accountId
   );

   if (!accountExists) {
      throw new NotFoundError("Account not found");
   }

   user.googleAccounts = user.googleAccounts.filter(
      acc => acc._id.toString() !== accountId
   );
   await user.save();

   return "Account removed successfully";
};

module.exports = {
   getUserAccountsService,
   removeUserAccountService
};
