import {noResultAnimation} from './animation'

const putImagesInContainer =(imageResultBox,dataArray)=>{
    for(let i=0;i<dataArray.length;i++){
        const prevImg = new Image();
        const div = document.createElement('div')
        div.setAttribute('class','item')
        prevImg.src = dataArray[i].webformatURL
        prevImg.classList.add('imageItem')
        prevImg.dataset.keyword = document.querySelector('#searchBar').value
        prevImg.dataset.large = dataArray[i].largeImageURL
        prevImg.onload = function(){
            div.appendChild(prevImg)
            imageResultBox.appendChild(div)
            try{
                if(document.querySelector('.grid') !== null&&document.querySelector('.grid') !== undefined){
                    waterfall('.grid')
                }
            }catch(error){

            }
        }
    }

}

const resetImageGrid = ()=>{
    const imageResultBox = document.querySelector('.grid')
    if(imageResultBox !== null){
        imageResultBox.remove();
    }
}

const renderImageGrid =(imageResultBox,dataArray)=>{
    resetImageGrid();
    const container = document.querySelector('.container')
    container.appendChild(imageResultBox)
    if(dataArray.length>0){
    // const contentContainer = document.createElement('section')
    // contentContainer.id='contentContainer'
    putImagesInContainer(imageResultBox,dataArray)
    } else {
        noResultAnimation();
    }
}

export {renderImageGrid}