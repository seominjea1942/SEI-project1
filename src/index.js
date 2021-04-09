import './style.css'
import header from './header.js'
import renderKeywordsBar from './keywordsBar.js'
import renderImageGrid from './imageGrid.js'

const getImageFromPixaBay = async() =>{
    const url = `https://pixabay.com/api/?key=8387696-25c6f03714056f24bf5936cb9&q=yellow+flowers&image_type=photo`
    const response = await fetch(url)
    const data = await response.json()
    const dataArray = data.hits // image objects are under the hits arrray
    renderKeywordsBar(dataArray)
    renderImageGrid(dataArray)
}
getImageFromPixaBay()



header();

if(module&&module.hot) module.hot.accept()