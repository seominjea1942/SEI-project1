const putImagesInContainer =(imageResultBox,dataArray)=>{
    const container = document.querySelector('.container')
    for(let i=0;i<dataArray.length;i++){
        const prevImg = new Image();
        prevImg.src = dataArray[i].webformatURL
        prevImg.classList.add('imageItem')
        imageResultBox.appendChild(prevImg)
    }
    container.appendChild(imageResultBox)
}

const resetImageGrid = ()=>{
    const imageResultBox = document.querySelector('.imageResultBox')
    if(imageResultBox !== null){
        imageResultBox.remove();
    }
}

const renderImageGrid =(dataArray)=>{
    // console.log(dataArray[0].webformatURL)
    resetImageGrid();
    if(dataArray.length>0){
    const imageResultBox = document.createElement('div')
    imageResultBox.setAttribute('class','imageResultBox')
    const contentContainer = document.createElement('section')
    contentContainer.id='contentContainer'
    putImagesInContainer(imageResultBox,dataArray);
    } else {
        console.log('no result')
    }
}

export default renderImageGrid