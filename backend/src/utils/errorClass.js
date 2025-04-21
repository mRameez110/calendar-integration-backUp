class AppError extends Error {
	constructor(message = "Internal Server Error", errorCode = 500) {
		super();
		this.message = message;
		this.errorCode = errorCode;
	}
}

class RouteNotFoundError extends AppError {
	constructor(message = "Route does't exist", errorCode = 404) {
		super(message, errorCode);
	}
}

class BadRequestError extends AppError {
	constructor(message = "Bad Request", errorCode = 400) {
		super(message, errorCode);
	}
}



class NotFoundError extends AppError {
	constructor(message = "No Records found", errorCode = 404) {
		super(message, errorCode);
	}
}


class InvalidCredentialError extends AppError {
	constructor(message = "Invalid Credential's", errorCode = 401) {
		super(message, errorCode);
	}
}



module.exports = {
	AppError,
	RouteNotFoundError,
	BadRequestError,
	NotFoundError,
	InvalidCredentialError,

};
