const {Router} = require ('express');
const space = require('../models').space


const router = new Router ()


// gets space by Id
router.get("/:spaceId", async(req, res) => {
    const spaceById = await space.findByPk(req.params.spaceId)
    res.json(spaceById)
})


module.exports = router;