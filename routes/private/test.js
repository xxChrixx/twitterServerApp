const router = require('express').Router();
const verify = require('../verifyToken')

router.post('/test', verify, (req, res) => {
    res.send('ciaod')
})


module.exports = router;