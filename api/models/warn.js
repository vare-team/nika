import { DataTypes, Model } from 'sequelize';
import toSnakeCase from '../utils/to-snake-case.js';

export default class Warn extends Model {
	static getDefault(id) {
		return {
			id: id,
			type: 'user',
			warns: 0,
		};
	}
	static initialize(sequelize) {
		Warn.init(
			{
				id: { type: DataTypes.STRING, primaryKey: true },

				type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' },
				warns: { type: DataTypes.TINYINT, allowNull: false },
			},
			{
				sequelize,
				modelName: this.name,
				tableName: toSnakeCase(`${this.name}s`),
			}
		);
	}
}
