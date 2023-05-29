import { DataTypes, Model } from 'sequelize';
import toSnakeCase from '../utils/to-snake-case.js';
import languages from '../configs/languages.js';

export default class Guild extends Model {
	static getDefault(id, language) {
		return { id: id, level: 'medium', language: language };
	}
	static initialize(sequelize) {
		Guild.init(
			{
				id: { type: DataTypes.STRING, primaryKey: true },

				language: { type: DataTypes.STRING, allowNull: false, validate: { isIn: [languages] } },
				level: { type: DataTypes.STRING, allowNull: false, defaultValue: 'medium' },

				role: { type: DataTypes.STRING },
				channel: { type: DataTypes.STRING },
			},
			{
				sequelize,
				modelName: this.name,
				tableName: toSnakeCase(`${this.name}s`),
			}
		);
	}
}
