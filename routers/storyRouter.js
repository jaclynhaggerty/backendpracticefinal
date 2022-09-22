const { Router } = require('express');
const story = require('../models').story

const router = new Router();

// gets all stories
router.get("/", async (request, response, next) => {
    try {
        const stories = await story.findAll();
        response.send(stories);
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
        if (!name || !content || !imageUrl) {
            return res.status(400).send("Please provide all fields");
        } else {
            const newStory = await story.create({
                name, content, imageUrl
            })
            res.json(newStory);
        }
    } catch (e) {
        next(e);
    }
});











module.exports = router;