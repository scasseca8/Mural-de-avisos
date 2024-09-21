const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('../model/posts');

const router = express.Router();


const options = {
    origin: "http://localhost:3000"
}

router.use(cors(options));

//Rota para mostrar os posts
router.get("/all", (req, res) => {

    res.json(JSON.stringify(posts.getAll()))
});


// Rota para adicionar novos Posts
router.post("/new", bodyParser.json(), (req, res) => {

    let title = req.body.title;
    let description = req.body.description;

    posts.newPost(title, description)


    res.send("Post adicionado")
});


// Rota para deletar um Post
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    posts.deletePost(id);
    res.send("Post deletado");
});

// Rota para editar um Post
router.put("/:id", bodyParser.json(), (req, res) => {
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    posts.editPost(id, title, description);
    res.send("Post editado");
});


module.exports = router;