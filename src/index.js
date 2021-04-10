import './style.css'
import header from './header.js'
import renderKeywordsBar from './keywordsBar.js'
import renderImageGrid from './image.js'
import * as Editor from './editor.js'


header();
const searchBar = document.querySelector('#searchBar')

const getImageFromPixaBay = async() =>{
    let keyword = searchBar.value.trim().split(' ')
    keyword = keyword.join('+')
    const url = `https://pixabay.com/api/?key=8387696-25c6f03714056f24bf5936cb9&q=${keyword}&image_type=photo`
    const response = await fetch(url)
    const data = await response.json()
    const dataArray = data.hits // image objects are under the hits arrray
    console.log(dataArray)
    renderKeywordsBar(dataArray)
    renderImageGrid(dataArray)
}

//event listener
document.addEventListener('click',(e)=>{
    if(e.target.className === 'keywordRecommendation'){
        let newKeyword = e.target.innerText
        searchBar.value = newKeyword
        getImageFromPixaBay();
    }
    if(e.target.className === 'imageItem'){
        let imageURL = e.target.dataset.large
        let imageKeyword = e.target.dataset.keyword
        console.log(imageKeyword)
        Editor.renderEditor(imageURL,imageKeyword)
    }
    if(e.target.id === 'cropButton'){
        document.querySelector('#cropOptionsBox').style.display = 'block'
        document.querySelector('#adjustmentBar').style.display = 'none'
        Editor.activeCrop();
    }
    if(e.target.id === 'adjustButton'){
        document.querySelector('#adjustmentBar').style.display = 'block'
        document.querySelector('#cropOptionsBox').style.display = 'none'
    }
    if(e.target.id === 'cropActiveButton'){
        Editor.activeCrop();
    }
    if(e.target.id === 'cropDeactiveButton'){
        Editor.deactiveCrop();
    }
    if(e.target.id === 'downloadFile'){
        console.log('hello')
    }
})

document.addEventListener('change',e=>{
    if(e.target.name ==='brightness'){
        Editor.changeBrightness(e.target.value);
    }
    if(e.target.name ==='exposure'){
        Editor.changeExposure(e.target.value);
    }
    if(e.target.name ==='contrast'){
        Editor.changeContrast(e.target.value);
    } 
    if(e.target.name ==='vibrance'){
        Editor.changeVibrance(e.target.value);
    } 
    if(e.target.name ==='saturation'){
        Editor.changeSaturation(e.target.value);
    }
    if(e.target.name ==='hue'){
        Editor.changeHue(e.target.value);
    } 
    if(e.target.name ==='sepia'){
        Editor.changeSepia(e.target.value);
    } 
    if(e.target.name ==='noise'){
        Editor.changeNoise(e.target.value);
    } 
})
searchBar.addEventListener('keypress',(e=>{
    if(e.key === 'Enter'){
        getImageFromPixaBay();
    }
}))




if(module&&module.hot) module.hot.accept()