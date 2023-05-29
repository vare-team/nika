import { Router } from 'express';
import { asyncRoute } from '../utils/errors.js';
import getWarns from '../controllers/get-warns.js';
import setWarns from '../controllers/set-warns.js';
import getBlacklisted from '../controllers/get-blacklisted.js';

const router = new Router();

router.route('/').get(asyncRoute(getBlacklisted));

router.route('/:entityId').get(asyncRoute(getWarns)).put(asyncRoute(setWarns));

export default router;
