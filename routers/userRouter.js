const {Router} = require ('express');
const user = require('../models').user

const router = new Router ()

// gets user by Id
router.get("/:userId", async(req, res) => {
    const userById = await user.findByPk(req.params.userId)
    res.json(userById)
})


module.exports = router;