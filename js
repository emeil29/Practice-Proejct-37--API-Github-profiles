const APIURL = 'https://api.github.com/users/'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


async function getUser(username){
    try{
   const {data} = await axios(APIURL + username)
    createUserCard(data)
    getRepos(username)
    } catch(err){
        if(err.response.status == 404){
        createErrorCard("Not found")
        }
    }
}

 async function getRepos(username){
    try{
        const {data} = await axios(APIURL + username +`/repos?sort=created`)
         addReposToCard(data)
         } catch(err){ 
             createErrorCard("Problem fetching repos")
             }
         }

function createUserCard (user){
    const cardHTML = `<div class="card">
    <img src="${user.avatar_url}" class="avatar" alt="${user.name}">
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
        <ul>
          <li>${user.follower} <strong> followers</strong></li>
          <li>${user.following} <strong> following</strong></li>
          <li>3${user.public_repos}<strong> Repos
          </strong></li>
         </ul>
         <div id="repos"></div>      
    </div>
    </div>
    `
    main.innerHTML = cardHTML
}

function createErrorCard(msg){
    const cardHTML =`
    <div class ="card">
    <h1>${msg}</h1>
    </div>
    `
    main.innerHTML= cardHTML
}
function addReposToCard(repos){
    const reposEl = document.getElementById('repos')
    
    repos.slice(0, 10).forEach(repo =>{
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repo.html_url
        repoEl.target = '_blank'
        repoEl.innerHTML = repo.name
        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const user = search.value
    if (user){
        getUser(user)
        search.value = ''
    }
})
