import { Router } from 'express';
import { getGithubProfile, getGithubContributions, getGithubActivity } from '../controllers/github.controller';

const router = Router();

router.get('/:username', getGithubProfile);
router.get('/:username/contributions', getGithubContributions);
router.get('/:username/activity', getGithubActivity);

export default router;
