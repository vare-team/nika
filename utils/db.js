import { models, sequelize } from '../models/index.js';

export async function initializeDbModels() {
	for (const model of Object.values(models)) if (typeof model.initialize === 'function') model.initialize(sequelize);
	for (const model of Object.values(models)) if (typeof model.setupScopes === 'function') model.setupScopes(models);
	for (const model of Object.values(models)) await model.sync({ alter: true });
	if (process.env.NODE_ENV !== 'test') console.log('models initialized');
}
