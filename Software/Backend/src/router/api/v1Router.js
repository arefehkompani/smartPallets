const express = require('express')
const router = express.Router()

const project = require('src/controller/projectController')

router.get('/project', project.index)
router.post('/project/store', project.store)
router.post('/project/delete', project.delete)
router.post('/project/update', project.update)
router.post('/project/work', project.update_work)
router.get('/project/:id_project', project.show)

router.get('/countdown', project.countDown_check)


module.exports = router;