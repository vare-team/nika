export default class Warns {
	/**
	 *
	 * @param id {string}
	 * @param type {string}
	 * @param warns {number}
	 */
	constructor({ id, type, warns }) {
		this.id = id;
		this.type = type;
		this.warns = warns;
	}
}
