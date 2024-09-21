document.addEventListener('DOMContentLoaded', () => {
    updatePosts();
})

function updatePosts() {
    fetch("http://192.168.1.110:3000/api/all").then(res => res.json()).then(json => {
        let postElements = '';

        let posts = JSON.parse(json);
        posts.forEach((post) => {
            let postElement = `
                <div id="${post.id}" class="card">
                    <div class="card-header">
                        <h5 class="card-title">${post.title}</h5>
                    </div>
                    <div class="card-body">
                        <div class="card-text">${post.description}</div>
                        <div class="card-buttons">
                            <button class="btn edit-btn" onclick="startEditPost('${post.id}', '${post.title}', '${post.description}')">
                                <i class="fas fa-edit"></i> 
                            </button>
                            <button class="btn delete-btn" onclick="deletePost('${post.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
            postElements += postElement;
        });
        document.getElementById("posts").innerHTML = postElements;
    });
}

function newPost() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;

    let post = { title, description };

    const options = {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(post)
    };

    fetch("http://192.168.1.110:3000/api/new", options).then(res => {
        console.log(res);
        updatePosts();
        document.getElementById("title").value = "";
        document.getElementById("desc").value = "";
    });
}

function deletePost(id) {
    const options = {
        method: "DELETE",
    };

    fetch(`http://192.168.1.110:3000/api/${id}`, options).then(res => {
        console.log(res);
        let card = document.getElementById(id);
        card.classList.add('fade-out');
        setTimeout(() => {
            card.remove();
        }, 500);
    });
}

function startEditPost(id, currentTitle, currentDescription) {
    let card = document.getElementById(id);
    card.innerHTML = `
        <div class="card-header">
            <input type="text" id="edit-title-${id}" value="${currentTitle}" class="edit-input">
        </div>
        <div class="card-body">
            <textarea id="edit-description-${id}" class="edit-input">${currentDescription}</textarea>
            <div class="card-buttons">
                <button class="btn save-btn" onclick="saveEditPost('${id}')">
                    <i class="fas fa-save"></i> 
                </button>
                <button class="btn cancel-btn" onclick="cancelEditPost('${id}', '${currentTitle}', '${currentDescription}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>`;
}

function saveEditPost(id) {
    let newTitle = document.getElementById(`edit-title-${id}`).value;
    let newDescription = document.getElementById(`edit-description-${id}`).value;

    let post = { title: newTitle, description: newDescription };

    const options = {
        method: "PUT",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(post)
    };

    fetch(`http://192.168.1.110:3000/api/${id}`, options).then(res => {
        console.log(res);
        updatePosts();
    });
}

function cancelEditPost(id, originalTitle, originalDescription) {
    let card = document.getElementById(id);
    card.innerHTML = `
        <div class="card-header">
            <h5 class="card-title">${originalTitle}</h5>
        </div>
        <div class="card-body">
            <div class="card-text">${originalDescription}</div>
            <div class="card-buttons">
                <button class="btn edit-btn" onclick="startEditPost('${id}', '${originalTitle}', '${originalDescription}')">
                    <i class="fas fa-edit"></i> 
                </button>
                <button class="btn delete-btn" onclick="deletePost('${id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
}
