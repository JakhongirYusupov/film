let API_KEY1 = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let API_KEY2 = 'b971c2f0de8767f08d2bb84160ba24b7'

const list = document.querySelector('.append')
const pageName = document.querySelector('.title')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const btns = document.querySelectorAll('.btns')
const btn = document.querySelector('.btn')
const search = document.querySelector('#search')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const score = document.querySelector('#score')
let totalPage = 0
let page = 1

let Api = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY1}&page=${page}`


async function getData(API) {
    let upcoming = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY1}&page=${page}`
    if (API) {
        upcoming = API
    }
    let data = await fetch(upcoming)
    addMovie(await data.json())
}
getData()

function createElements(...arr) {
    return arr.map((el) => {
        return document.createElement(el)
    })
}

function addMovie(data) {
    list.innerHTML = null
    totalPage = data.total_pages
    data.results.forEach(element => {
        let [div] = createElements('div')
        let node = `<div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="${element.title}">

       <div class="movie-info">
           <h3>${element.title}</h3>
           <span class="orange">${element.vote_average}</span>
        </div>
        <span class="date">${element.release_date}</span>
    </div>`

        div.innerHTML = node
        list.append(div)
    });
}

next.addEventListener('click', () => {
    if (totalPage != page) {
        page = +pageName.textContent + 1
        pageName.textContent = page
        getData()
    }
})

prev.addEventListener('click', () => {
    if (pageName.textContent != 1) {
        page = +pageName.textContent - 1
        pageName.textContent = page
        getData()
    }
})

for (let i of btns) {
    i.addEventListener('click', () => {
        page = 1
        pageName.textContent = page
        if (i.value == "top_rated") {
            getData()
        } else if (i.value == "popular") {
            let api = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY1}&page=${page}`
            Api = api
            getData(api)
        } else if (i.value == "upcoming") {
            let api = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY1}&page=${page}`
            Api = api
            getData(api)
        }
    })
}

btn.addEventListener('click', () => {
    let array = []
    async function func() {
        let api = await fetch(Api)
        searching(await api.json())
    }
    func()

    function searching(data) {
        for (let i of data.results) {
            let a = []
            let b = []
            a.push(i.release_date.split('-'))
            b.push(i.vote_average)
            console.log(i.title.toLowerCase());
            
            if (search.value) {
                if (i.title.toLowerCase().includes(search.value.toLowerCase())) {
                    array.push(i)
                }
            }
            if (min.value) {
                if (min.value <= +a[0]) array.push(i)
            }
            if (max.value) {
                if(max.value >= +a[0]) array.push(i)
            }
            if (score.value <= b) {
                array.push(i)
            }
        }
        console.log(array);
    }

})





