import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getGuild from '../controllers/get-guild.js';
import setGuild from '../controllers/set-guild.js';
import deleteGuild from '../controllers/delete-guild.js';

const router = new Router();

router.route('/').get(asyncRoute(getGuild)).post(asyncRoute(setGuild)).delete(asyncRoute(deleteGuild));

export default router;
