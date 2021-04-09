import './style.css'
import header from './header.js'
import renderKeywordsBar from './keywordsBar.js'
import renderImageGrid from './image.js'

header();
const searchBar = document.querySelector('#searchBar')

const getImageFromPixaBay = async() =>{
    let keyword = searchBar.value.trim().split(' ')
    keyword = keyword.join('+')
    const url = `https://pixabay.com/api/?key=8387696-25c6f03714056f24bf5936cb9&q=${keyword}&image_type=photo`
    const response = await fetch(url)
    const data = await response.json()
    const dataArray = data.hits // image objects are under the hits arrray
    renderKeywordsBar(dataArray)
    renderImageGrid(dataArray)
}
document.addEventListener('click',(e)=>{
    if(e.target.className =='keywordRecommendation'){
        let newKeyword = e.target.innerText
        searchBar.value = newKeyword
        getImageFromPixaBay();
    }
})
searchBar.addEventListener('keypress',(e=>{
    if(e.key === 'Enter'){
        getImageFromPixaBay();
    }
}))




if(module&&module.hot) module.hot.accept()