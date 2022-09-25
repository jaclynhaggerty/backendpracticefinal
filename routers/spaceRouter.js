const {Router} = require ('express');
const space = require('../models').space
const story = require('../models').story;


const router = new Router ()


// gets space by Id
router.get("/:spaceId", async(req, res) => {
    const spaceById = await space.findByPk(req.params.spaceId, {
        include: story,
        order: [
            [story, 'createdAt', 'DESC']
        ]
    })
    res.json(spaceById)
})

// get all spaces
router.get("/", async (request, response, next) => {
    try {
        const spaces = await space.findAll();
        response.json(spaces);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;