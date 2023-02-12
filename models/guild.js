import { DataTypes, Model } from 'sequelize';

export default class Guild extends Model {
	static initialize(sequelize) {
		Guild.init(
			{
				id: { type: DataTypes.STRING, primaryKey: true },

				language: { type: DataTypes.STRING, allowNull: false },
				level: { type: DataTypes.STRING, allowNull: false, defaultValue: 'medium' },

				role: { type: DataTypes.STRING },
				channel: { type: DataTypes.STRING },
			},
			{
				sequelize,
				modelName: 'Guild',
				tableName: 'guilds',
			}
		);
	}
}
