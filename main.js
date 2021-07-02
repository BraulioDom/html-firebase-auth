const loggedOut = document.querySelector('.logged-out')
const loggedIn = document.querySelector('.logged-in')

const loginCheck = user =>{
    if(user){
        loggedIn.style.display = 'none'
        loggedOut.style.display = 'block'
    } else {
        loggedIn.style.display = 'block'
        loggedOut.style.display = 'none'
    }
}

// login
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    // auth.createUserWithEmailAndPassword(email, password).then(
    //     userCredential => {
    //         loginForm.reset();
    //         document.querySelector('#login-close').click()
    //     }
    // )

    auth.signInWithEmailAndPassword(email, password).then(
        userCredential => {
            loginForm.reset();
            document.querySelector('#login-close').click()
        }
    )
})

// logout
const logout = document.querySelector('#logout')
 
logout.addEventListener('click', e => {
    e.preventDefault()
    auth.signOut()
})

// google
const googleBtn = document.querySelector('#googleLogin')
googleBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider();
    // const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        console.log('google signin');
        loginForm.reset();
        document.querySelector('#login-close').click()
    }).catch(error => {
        console.log(error);
    })

})

// posts
const posts = document.querySelector('.posts')
const setupPosts = data => {
    if(data.length) {
        let html = ''
        data.forEach(doc => {
            const post = doc.data()
            const li = `
            <li class="list-group-item list-group-item-action">
                <h5>${post.title}</h5>
                <p>${post.description}</p>
            </li>
            `
            html += li
        });
        posts.innerHTML = html
    } else {
        posts.innerHTML = '<p>Login to see posts</p>'
    }
}


// events
auth.onAuthStateChanged(user => {
    if(user) {
        fs.collection('posts').get().then((snapshot) => {
            setupPosts(snapshot.docs)
            loginCheck(user)
        })
    } else {
        setupPosts([])
        loginCheck(user)
    }
})

