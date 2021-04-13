import './style.css'
import header from './header.js'
import renderKeywordsBar from './keywordsBar.js'
import {renderImageGrid} from './image.js'
import * as Editor from './editor.js'
import adjustmentIconActive from './asset/adjustIcon_active@2.png'
import adjustmentIconDeactive from './asset/adjustIcon_deactive@2.png'
import cropIconActive from './asset/crop_active@2.png'
import cropIconDeactive from './asset/crop_deactive@2.png'


header();
const searchBar = document.querySelector('#searchBar')

const getImageFromPixaBay = async() =>{
    let keyword = searchBar.value.trim().split(' ')
    keyword = keyword.join('+')
    const url = `https://pixabay.com/api/?key=8387696-25c6f03714056f24bf5936cb9&q=${keyword}&image_type=photo&per_page=48`
    const imageResultBox = document.createElement('div')
    imageResultBox.setAttribute('class','grid setGridStyle')
    const response = await fetch(url)
    const data = await response.json()
    const dataArray = data.hits // image objects are under the hits arrray
    console.log(dataArray)
    renderKeywordsBar(dataArray)
    renderImageGrid(imageResultBox,dataArray)
  
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
        Editor.renderEditor(imageURL,imageKeyword)
    }
    if(e.target.id === 'cropBoxOnButton'){
        if(document.querySelector('.cropper-hidden')===null){
            Editor.activeCrop();
        }
    }
    if(e.target.id === 'cropBoxOffButton'){
        if(document.querySelector('.cropper-hidden')!==null){
            Editor.deactiveCrop();
        }
    }
    if(e.target.id === 'cropButton'||e.target.id === 'cropIcon'||e.target.id === 'cropIconLabel'){
        if(window.getComputedStyle(document.querySelector('#cropOptionsBox')).getPropertyValue('display')==='none'){
            document.querySelector('#cropOptionsBox').style.display = 'block'
            document.querySelector('#adjustmentBar').style.display = 'none'
            document.querySelector('#adjustButton').style.backgroundColor = 'rgb(245,245,245)'
            document.querySelector('#cropButton').style.backgroundColor = 'rgb(255,255,255)'
            document.querySelector('#cropButton>span').style.color = 'rgb(26,115,232)'
            document.querySelector('#cropButton>img').src = cropIconActive
            document.querySelector('#adjustButton>img').src = adjustmentIconDeactive
            document.querySelector('#adjustButton>span').style.color = 'rgb(100,100,100)'
            Editor.activeCrop();
        }
    }
    if(e.target.id ==='cropActionButton'){
        Editor.crop();
    }
    if(e.target.id === 'adjustButton'||e.target.id === 'adjustIconLabel'||e.target.id === 'adjustIcon'){
        if(window.getComputedStyle(document.querySelector('#adjustmentBar')).getPropertyValue('display')==='none'){
            if(Editor.cropper!==undefined){
                Editor.deactiveCrop();
            }
            document.querySelector('#adjustmentBar').style.display = 'block'
            document.querySelector('#cropOptionsBox').style.display = 'none'
            document.querySelector('#adjustButton').style.backgroundColor = 'rgb(255,255,255)'
            document.querySelector('#cropButton').style.backgroundColor = 'rgb(245,245,245)'
            document.querySelector('#adjustButton>span').style.color = 'rgb(26,115,232)'
            document.querySelector('#cropButton>span').style.color = 'rgb(100,100,100)'
            document.querySelector('#cropButton>img').src = cropIconDeactive
            document.querySelector('#adjustButton>img').src = adjustmentIconActive
        }
    }
    if(e.target.id === 'cropActiveButton'&&e.target.checked === true){
        if(Editor.cropper!==undefined){
            Editor.deactiveCrop();
        }
        Editor.activeCrop();
    }
    if(e.target.id === 'cropActiveButton'&&e.target.checked === false){
        Editor.deactiveCrop();
    }
    if(e.target.id === 'downloadFile'){
        Editor.downloadEditedImage();
    }
    if(e.target.id === 'goBackButton'){
        if(Editor.cropper!==undefined){
            Editor.deactiveCrop();
        }
        document.querySelector('#adjustmentBar').style.display = 'none'
            document.querySelector('#cropOptionsBox').style.display = 'none'
        Editor.resetContainer()
        header();
        getImageFromPixaBay();
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


window.addEventListener('resize', function () {

    if(document.querySelector('#canvas')!==null){
        Editor.resizeCanvas();
    }

    if(document.querySelector('.grid')!==null){
        waterfall('.grid');
    } 
});

if(module&&module.hot) module.hot.accept()