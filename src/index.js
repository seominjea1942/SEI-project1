import './style.css'
import header from './header.js'
import renderKeywordsBar from './keywordsBar.js'
import {renderImageGrid} from './image.js'
import * as Editor from './editor.js'
import adjustmentIconActive from './asset/adjustIcon_active@2.png'
import adjustmentIconActiveDark from './asset/adjustIcon_active_darkmode@2.png'
import adjustmentIconDeactive from './asset/adjustIcon_deactive@2.png'
import adjustmentIconDeactiveDark from './asset/adjustIcon_deactive_darkmode@2.png'
import cropIconActive from './asset/crop_active@2.png'
import cropIconActiveDark from './asset/crop_active@2_darkmode.png'
import cropIconDeactive from './asset/crop_deactive@2.png'
import cropIconDeactiveDark from './asset/crop_deactive_darkmode@2.png'
import {mainAnimation} from './animation.js'

header();
mainAnimation();
const searchBar = document.querySelector('#searchBar')

const getImageFromPixaBay = async(page=1) =>{
    let keyword = document.querySelector('#searchBar').value.trim().split(' ')
    keyword = keyword.join('+')
    const url = `https://pixabay.com/api/?key=8387696-25c6f03714056f24bf5936cb9&q=${keyword}&image_type=photo&page=${page}&per_page=50`
    const imageResultBox = document.createElement('div')
    imageResultBox.setAttribute('class','grid')
    const response = await fetch(url)
    const data = await response.json()
    const dataArray = data.hits // image objects are under the hits arrray
    renderKeywordsBar(dataArray)
    renderImageGrid(imageResultBox,dataArray)

}

//event listener
document.addEventListener('click',(e)=>{
    if(e.target.className === 'keywordRecommendation'){
        let newKeyword = e.target.innerText
        document.querySelector('#searchBar').value =''
        document.querySelector('#searchBar').value = newKeyword
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
            Editor.resizeCanvas();
        }
    }
    if(e.target.id === 'cropButton'||e.target.id === 'cropIcon'||e.target.id === 'cropIconLabel'){
        if(window.getComputedStyle(document.querySelector('#cropOptionsBox')).getPropertyValue('display')==='none'){
            document.querySelector('#cropOptionsBox').style.display = 'block'
            document.querySelector('#adjustmentBar').style.display = 'none'
            document.querySelector('#adjustButton').classList.remove('active')
            document.querySelector('#adjustButton').classList.add('deactive')
            document.querySelector('#cropButton').classList.add('active')
            document.querySelector('#cropButton>span').style.color = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'rgb(128,175,255)':'rgb(26,115,232)'
            document.querySelector('#cropButton>img').src = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?cropIconActiveDark:cropIconActive
            document.querySelector('#adjustButton>img').src = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?adjustmentIconDeactiveDark:adjustmentIconDeactive
            document.querySelector('#adjustButton>span').style.color = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'rgb(150,150,150)':'rgb(100,100,100)'
            Editor.resizeCanvas()
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
            document.querySelector('#adjustButton').classList.add('active')
            document.querySelector('#cropButton').classList.remove('active')
            document.querySelector('#cropButton').classList.add('deactive')
            document.querySelector('#adjustButton>span').style.color = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'rgb(128,175,255)':'rgb(26,115,232)'
            document.querySelector('#cropButton>span').style.color = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'rgb(150,150,150)':'rgb(100,100,100)'
            document.querySelector('#cropButton>img').src = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?cropIconDeactiveDark:cropIconDeactive
            document.querySelector('#adjustButton>img').src = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?adjustmentIconActiveDark:adjustmentIconActive
            Editor.resizeCanvas()
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
        document.querySelector('#searchBar').addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                if(document.querySelector('#noResultAnimation')!==null){
                    document.querySelector('#noResultAnimation').remove() 
                }
                if(document.querySelector('#mainAnimation')!==null){
                    document.querySelector('#mainAnimation').remove() 
                }
                getImageFromPixaBay();
            }
        })
    }
    if(e.target.id ==='resetImage'){
        Editor.resetImage();
    }
    
    if(e.target.classList.contains('sliderToggleButton')){
        let slider = document.querySelector(`.sliderBox>input[name=${e.target.innerText}]`)
        let sliders = document.querySelectorAll('.sliderBox')
        let toggleButton = document.querySelector('.toggleActive')
        if(toggleButton !==null){
            toggleButton.classList.remove('toggleActive')
        }
        for(let i = 0; i<sliders.length; i++){
            sliders[i].style.display ='none'
        }
        if(e.target.innerText === slider.name){
            slider.parentNode.style.display = 'block'
            e.target.classList.add('toggleActive')
        }
    }

    if(e.target.id ==='applyAdjustment'){
        Editor.applyAdjustment();
        
    }
    if(e.target.id === 'logoIMG'){
        document.querySelector('.container').innerHTML =''
        header();
        mainAnimation();
        document.querySelector('#searchBar').addEventListener('keypress',(e)=>{
            if(e.key === 'Enter'){
                if(document.querySelector('#noResultAnimation')!==null){
                    document.querySelector('#noResultAnimation').remove() 
                }
                if(document.querySelector('#mainAnimation')!==null){
                    document.querySelector('#mainAnimation').remove() 
                }
                getImageFromPixaBay();
            }
        })
    }
    if(e.target.id === 'keywordClearButton'||e.target.id === 'clearButtonImg'){
        document.querySelector('#searchBar').value=''
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

searchBar.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        if(document.querySelector('#noResultAnimation')!==null){
            document.querySelector('#noResultAnimation').remove() 
        }
        if(document.querySelector('#mainAnimation')!==null){
            document.querySelector('#mainAnimation').remove() 
        }
        getImageFromPixaBay();
    }
})



window.addEventListener('resize', function () {

    if(document.querySelector('#canvas')!==null){
        Editor.resizeCanvas();
    }

    if(document.querySelector('.grid')!==null){
        waterfall('.grid');
    } 
});

if(module&&module.hot) module.hot.accept()