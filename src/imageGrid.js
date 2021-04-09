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


const renderImageGrid =(dataArray)=>{
    // console.log(dataArray[0].webformatURL)
    const imageResultBox = document.createElement('div')
    imageResultBox.setAttribute('class','imageResultBox')
    const contentContainer = document.createElement('section')
    contentContainer.id='contentContainer'
    putImagesInContainer(imageResultBox,dataArray);

}

export default renderImageGrid