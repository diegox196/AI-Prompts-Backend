const app = require('express');
const tagRouter = app.Router();

const  {tagGet, tagPost, tagPatch, tagDelete} = require('../controllers/tagController');

tagRouter.get('/api/tag', tagGet);
tagRouter.post('/api/tag', tagPost);
tagRouter.patch('/api/tag', tagPatch);
tagRouter.delete('/api/tag', tagDelete);

module.exports = tagRouter;