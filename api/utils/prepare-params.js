import { AppErrorInvalid, AppErrorInvalidReplaceMessage } from './errors.js';

/**
 *
 * @param options
 * @param options.page {number}
 * @param options.limit {number}
 * @param options.search {string}
 * @param options.sort {string}
 * @param options.rest {Object.<string, string>}
 * @param allowedFilters {Array.<string> | Object.<string, function>}
 * @param allowedSortFields {Object.<string, function>}
 * @param defaultPage {number}
 * @param defaultLimit {number}
 * @returns {{search: string, limit: number, page: number, sort: Array|{ type: string, field: string }, filters: null}}
 */
export default (
	{ page, limit, search, sort, ...rest },
	{ allowedFilters = null, allowedSortFields = null, defaultPage = 1, defaultLimit = 25 } = {}
) => {
	let sortRules = undefined;

	if (sort) {
		if (allowedSortFields) {
			const requestedSortFields = sort.trim().split(',');

			const resultSortRules = [];

			for (const requestedField of requestedSortFields) {
				const result = /^([-+]?)(\w+)$/.exec(requestedField);

				if (!result) {
					throw new AppErrorInvalid('sort format');
				}

				const [, dir, field] = result;

				if (!allowedSortFields[field]) {
					throw new AppErrorInvalidReplaceMessage(`Sorting by ${field} is not allowed`, null, 'INVALID_SORTING_FIELD');
				}

				resultSortRules.push(...allowedSortFields[field](dir === '-' ? 'DESC' : 'ASC'));
			}

			if (resultSortRules.length) {
				sortRules = resultSortRules;
			}
		} else {
			try {
				sortRules = JSON.parse(sort);
				// eslint-disable-next-line no-empty
			} catch (e) {}
		}
	}

	let filters = null;

	if (allowedFilters) {
		filters = {};

		if (allowedFilters instanceof Array) {
			// if allowedFilters is array of allowed param names
			for (const key of allowedFilters) {
				if (rest[key] !== undefined) {
					filters[key] = rest[key];
				}
			}
		} else {
			// if allowedFilters is an object where keys are allowed param names and values are the corresponding parser functions
			const filterEntries = Object.entries(allowedFilters);

			for (const [key, parser] of filterEntries) {
				if (rest[key] !== undefined) {
					filters[key] = parser ? parser(rest[key]) : rest[key];
				}
			}
		}
	}

	if (limit == null) limit = defaultLimit;
	if (page == null) page = defaultPage;

	limit = +limit;
	page = +page;

	if (isNaN(page) || page < 1) throw new AppErrorInvalid('page');
	if (isNaN(limit) || 1 > limit || limit > 100) throw new AppErrorInvalid('limit');

	return { page, limit, search, sort: sortRules, filters };
};
