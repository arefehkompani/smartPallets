const express = require('express')
const router = express.Router()

const api_v1 = require('src/router/api/v1Router')

router.use('/api/v1' , api_v1)

module.exports = router;