const { Router } = require('express');
const story = require('../models').story

const router = new Router();

// gets all stories
router.get("/", async (req, res, next) => {
    try {
        const stories = await story.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.json(stories);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.get("/storiesBySpace/:spaceId", async (req, res, next) => {
    const spaceId = req.params.spaceId;
    if (!spaceId) {
        return res.status(400).send("Must specify a Space ID!");
    }

    try {
        // Find all stories belonging to space with ID: spaceId
        const stories = await story.findAll({
            where: { spaceId },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.json(stories);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

//   get story by id
router.get("/:storyId", async (req, res) => {
    const storyById = await story.findByPk(req.params.storyId)
    res.json(storyById)
})

// post for stories
router.post("/", async (req, res, next) => {
    try {
        const name = req.body.name;
        const content = req.body.content;
        const imageUrl = req.body.imageUrl;
        const spaceId = req.body.spaceId;
        if (!name || !content || !imageUrl || !spaceId) {
            return res.status(400).send("Please provide all fields");
        } else {
            const newStory = await story.create({
                name, content, imageUrl, spaceId
            })
            res.json(newStory);
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/:storyId", async (req, res, next) => {
    try {
        const storyId = req.params.storyId;
        await story.destroy({
            where: {
                id: storyId
            }
        })
        res.status(200).send("Deleted Story");
    } catch (e) {
        console.log(e);
        res.status(500);
    }
})











module.exports = router;