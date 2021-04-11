
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
            waterfall('.grid')
        }
    }

}

const resetImageGrid = ()=>{
    const imageResultBox = document.querySelector('.imageResultBox')
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
        console.log('no result')
    }
}

export {renderImageGrid}