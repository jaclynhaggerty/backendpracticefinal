const {Router} = require ('express');
const space = require('../models').space


const router = new Router ()


// gets space by Id
router.get("/:spaceId", async(req, res) => {
    const spaceById = await space.findByPk(req.params.spaceId)
    res.json(spaceById)
})

// get all spaces
router.get("/", async (request, response, next) => {
    try {
        const spaces = await spaces.findAll();
        response.send(spaces);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;