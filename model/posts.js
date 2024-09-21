module.exports = {

    posts: [
        {
            id: "ljkahdkahd",
            title: "teste do mural",
            description: "Descrição teste"
        }
    ],

    getAll(){
        return this.posts;
    },

    newPost(title, description){

        this.posts.push({ id: generateID(), title, description });
    },

    deletePost(id){
        this.posts = this.posts.filter(post => post.id !== id);
    },

    editPost(id, title, description){
        let post = this.posts.find(post => post.id === id);
        if (post) {
            post.title = title;
            post.description = description;
        }
    }
}

function generateID() {
    return Math.random().toString(36).substring(2, 9)
}