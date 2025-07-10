const router = require('express').Router();
const authenticate = require('../middleware/auth');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');

router.get('/', authenticate, getProjects);
router.get('/:id', authenticate, getProjectById);
router.post('/', authenticate, createProject);
router.put('/:id', authenticate, updateProject);
router.delete('/:id', authenticate, deleteProject);


module.exports = router;
