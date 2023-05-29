import toSnakeCase from './to-snake-case.js';

const errorCodes = {
	RateLimitExceeded: {
		errNum: 100,
		errCode: 'RateLimitExceeded',
		message: 'Rate limit exceeded',
	},

	NotExist: {
		errNum: 201,
		errCode: 'NotExist',
		message: "Something parameter doesn't exist",
	},
	AlreadyExists: {
		errNum: 202,
		errCode: 'OrderAlreadyExists',
		message: 'Something parameter already exists',
	},
	Missing: {
		errNum: 203,
		errCode: 'Missing',
		message: 'Something parameter are missing',
	},
	Invalid: {
		errNum: 204,
		errCode: 'Invalid',
		message: 'Some parameter is invalid',
	},
	Duplicate: {
		errNum: 205,
		errCode: 'Duplicate',
		message: 'Some field is not unique',
	},
	NoFileUploaded: {
		errNum: 300,
		errCode: 'NoFileUploaded',
		message: 'No file uploaded',
		key: 'no_file_uploaded',
	},
	FileExtensionNotAllowed: {
		errNum: 301,
		errCode: 'FileExtensionNotAllowed',
		message: 'File extension is not allowed',
		key: 'file_extension_not_allowed',
	},
	FileTooLarge: {
		errNum: 302,
		errCode: 'FileTooLarge',
		message: 'File too large',
		key: 'file_too_large',
	},
};

const errorStatuses = {
	[errorCodes.RateLimitExceeded.errNum]: 429,

	[errorCodes.NotExist.errNum]: 404,
	[errorCodes.AlreadyExists.errNum]: 409,
	[errorCodes.Missing.errNum]: 400,
	[errorCodes.Invalid.errNum]: 400,
	[errorCodes.Duplicate.errNum]: 409,

	[errorCodes.NoFileUploaded.errNum]: 400,
};

// errors for application ui
class AppError extends Error {
	constructor(obj, status = null) {
		super(obj.message);

		this.errNum = obj.errNum;
		this.errCode = obj.errCode;
		this.field = obj.field;

		this.key = obj.key ?? 'APP_ERROR';

		this.status = status ?? errorStatuses[obj.errNum] ?? 400;
	}

	toJSON() {
		return {
			errNum: this.errNum,
			errCode: this.errCode,
			message: this.message,
			field: this.field,
			key: this.key,
		};
	}
}

class AppErrorMissing extends AppError {
	constructor(parameter = 'Some', status, key) {
		super(
			{
				...errorCodes.Missing,
				message: `${parameter} parameter is missing`,

				key: key ?? `MISSING_${toSnakeCase(parameter).toUpperCase()}`,
			},
			status
		);
	}
}

class AppErrorInvalid extends AppError {
	constructor(parameter = 'Some', status, key) {
		super(
			{
				...errorCodes.Invalid,
				message: `${parameter} parameter is invalid`,

				key: key ?? `INVALID_${toSnakeCase(parameter).toUpperCase()}`,
			},
			status
		);
	}
}

class AppErrorInvalidReplaceMessage extends AppError {
	constructor(message = errorCodes.Invalid.message, status, key) {
		super(
			{
				...errorCodes.Invalid,
				message,

				key: key ?? toSnakeCase(message).toUpperCase(),
			},
			status
		);
	}
}

class AppErrorAlreadyExists extends AppError {
	constructor(parameter = 'Some', status, key) {
		super(
			{
				...errorCodes.AlreadyExists,
				message: `${parameter} entity already exists`,

				key: key ?? `EXISTS_${toSnakeCase(parameter).toUpperCase()}`,
			},
			status
		);
	}
}

class AppErrorNotExist extends AppError {
	constructor(parameter = 'Some', status, key) {
		super(
			{
				...errorCodes.NotExist,
				message: `${parameter} entity not exist`,

				key: key ?? `DOES_NOT_EXIST_${toSnakeCase(parameter).toUpperCase()}`,
			},
			status
		);
	}
}

class AppErrorDuplicate extends AppError {
	constructor(field = null, status, key) {
		super(
			{
				...errorCodes.Duplicate,
				field,

				key: key ?? `DUPLICATE_${toSnakeCase(field ?? 'some').toUpperCase()}`,
			},
			status
		);
	}
}

class AppErrorForbiddenAction extends AppError {
	constructor(status, key) {
		super(
			{
				errCode: 'Forbidden',
				message: 'You do not have access to this action',
				key: key ?? 'FORBIDDEN_ACTION',
			},
			status ?? 403
		);
	}
}

class AppErrorRateLimitExceeded extends AppError {
	constructor() {
		super(
			{
				...errorCodes.RateLimitExceeded,

				key: 'RATE_LIMIT_EXCEEDED',
			},
			429
		);
	}
}

// error for developer
class SystemError extends Error {
	constructor(status, err) {
		super(err);

		this.status = status ?? 400;
	}

	toJSON() {
		return {
			message: this.message,

			key: 'SYSTEM_ERROR',
		};
	}
}

function asyncRoute(route) {
	// eslint-disable-next-line no-console
	return (req, res, next = console.error) => {
		return Promise.resolve(route(req, res, next)).catch(e => next(e));
	};
}

export {
	asyncRoute,
	errorCodes,
	AppError,
	SystemError,
	AppErrorMissing,
	AppErrorInvalid,
	AppErrorInvalidReplaceMessage,
	AppErrorAlreadyExists,
	AppErrorNotExist,
	AppErrorDuplicate,
	AppErrorForbiddenAction,
	AppErrorRateLimitExceeded,
};
