import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getWarns from '../controllers/get-warns.js';
import setWarns from '../controllers/set-warns.js';
import getBlacklisted from '../controllers/get-blacklisted.js';

const router = new Router();

router.route('/').get(asyncRoute(getWarns)).post(asyncRoute(setWarns));
router.route('/count').get(asyncRoute(getBlacklisted));

export default router;
