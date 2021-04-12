import header from './header.js'

const container = document.querySelector('.container')
const cropOptionsBox = document.createElement('div')
cropOptionsBox.id = 'cropOptionsBox'
cropOptionsBox.setAttribute('class','childrenBar')
const board = document.createElement('div')
board.id = 'artboard'
const functionsContainer = document.createElement('div')
functionsContainer.id = 'functionsContainer'
const adjustmentBar = document.createElement('div')
adjustmentBar.id = 'adjustmentBar'
adjustmentBar.setAttribute('class','childrenBar')
let img = new Image();
const canvasDivBlock = document.createElement('div')
canvasDivBlock.id = 'canvasDivBlock'
let canvas = document.createElement('canvas')
canvas.id = 'canvas'
canvasDivBlock.appendChild(canvas)
let cropper;


const downloadEditedImage =()=>{
    console.log(canvas.dataset.keyword)
    let download = ((canvas, fileName)=>{
        //init event
        let e;
        //Create link
        const link = document.createElement('a')
        //set props
        link.download = fileName;
        link.href = canvas.toDataURL('image/jpg', 1)

        e = new MouseEvent ('click')
        link.dispatchEvent(e);
    })(canvas,canvas.dataset.keyword)
}
const deactiveCrop =()=>{
    cropper.destroy();
}
const activeCrop = () => {
    let selectCanvas = document.querySelector('#canvas')
    let canvasDivBlock = document.querySelector('#canvasDivBlock')
    console.log(canvas.width, canvas.height)
    canvasDivBlock.style.width = `${canvas.width}px`
    canvasDivBlock.style.height = `${canvas.height}px`
    canvasDivBlock.style.backgroundColor = `background-color: rgb(20,20,20)`;
    cropper = new Cropper(selectCanvas,{
        autoCropArea: 1,
        background: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        movable:false,
        zoomable:false
    })
}

const crop = () =>{
    let newCanvas = cropper.getCroppedCanvas()
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,canvas.width,canvas.height)
    canvas.width = newCanvas.width
    canvas.height = newCanvas.height
    console.log(canvas.width, newCanvas.width)
    ctx.drawImage(newCanvas,0,0)
    canvasDivBlock.style.width = `${newCanvas.width}px`
    canvasDivBlock.style.height = `${newCanvas.height}px`
    cropper.destroy();
    // let cropBoxTop = parseInt(cropBoxData.top)
    // let cropBoxLeft = parseInt(cropBoxData.left)
    // let cropBoxWidth = parseInt(cropBoxData.width)
    // let cropBoxHeight = parseInt(cropBoxData.height)
    // let ctx = canvas.getContext('2d')
    // let imageData = ctx.getImageData(cropBoxTop,cropBoxLeft,cropBoxWidth,cropBoxHeight);
    // cropper.destroy()
    // canvas.width = cropBoxWidth
    // canvas.height = cropBoxHeight
    // canvasDivBlock.style.width = cropBoxWidth + 'px'
    // canvasDivBlock.style.height = cropBoxHeight + 'px'
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.putImageData(imageData,0,0)
}

const changeBrightness =(value)=>{
    let preVal = 0
    let curVal = value
    let val = (value>0)? Math.abs(preVal-curVal):-Math.abs(preVal-curVal)
    Caman("#canvas",function () {
        this.revert()
        this.brightness(val).render();
    })
    preVal =curVal
}

const changeExposure =(value)=>{
    let preVal = 0
    let curVal = value
    let val = (value>0)? Math.abs(preVal-curVal):-Math.abs(preVal-curVal)
    Caman("#canvas",function () {
        this.revert()
        this.exposure(val).render();
    })
    preVal =curVal
}

const changeContrast =(value)=>{
    let preVal = 0
    let curVal = value
    let val = (value>0)? Math.abs(preVal-curVal):-Math.abs(preVal-curVal)
    Caman("#canvas",function () {
        this.revert()
        this.contrast(val).render();
    })
    preVal =curVal
}

const changeVibrance =(value)=>{
    let preVal = 0
    let curVal = value
    let val = (value>0)? Math.abs(preVal-curVal):-Math.abs(preVal-curVal)
    Caman("#canvas",function () {
        this.revert()
        this.vibrance(val).render();
    })
    preVal =curVal
}

const changeSaturation =(value)=>{
    let preVal = 0
    let curVal = value
    let val = (value>0)? Math.abs(preVal-curVal):-Math.abs(preVal-curVal)
    Caman("#canvas",function () {
        this.revert()
        this.saturation(val).render();
    })
    preVal =curVal
}
//0-100
const changeHue =(value)=>{
    Caman("#canvas",function () {
        this.revert()
        this.hue(value).render();
    })
}

const changeSepia =(value)=>{
    Caman("#canvas",function () {
        this.revert()
        this.sepia(value).render();
    })
}

const changeNoise =(value)=>{
    Caman("#canvas",function () {
        this.revert()
        this.noise(value).render();
    })
}

const createCropOptions=()=>{
    //create Element
    const cropActionButton = document.createElement('button')
    cropActionButton.id = 'cropActionButton'
    cropActionButton.innerHTML = 'Crop'

    const cropBoxButtonContainer = document.createElement('div')
    cropBoxButtonContainer.setAttribute('class', 'cropButtonContainer')

    const cropActionContainer = document.createElement('div')
    cropActionContainer.setAttribute('class', 'cropButtonContainer')

    const cropBoxLabel = document.createElement('label')
    cropBoxLabel.innerText = 'Crop Box Controller'

    const cropBoxLabel2 = document.createElement('label')
    cropBoxLabel2.innerText = 'Crop Action Controller'

    const cropBoxOnButton = document.createElement('button')
    cropBoxOnButton.id = 'cropBoxOnButton'
    cropBoxOnButton.innerHTML = 'Turn on Crop Box'

    const cropBoxOffButton = document.createElement('button')
    cropBoxOffButton.id = 'cropBoxOffButton'
    cropBoxOffButton.innerHTML = 'Turn off Crop Box'

    cropBoxButtonContainer.appendChild(cropBoxLabel)
    cropBoxButtonContainer.appendChild(cropBoxOnButton)
    cropBoxButtonContainer.appendChild(cropBoxOffButton)

    cropActionContainer.appendChild(cropBoxLabel2)
    cropActionContainer.appendChild(cropActionButton)
    //append
    cropOptionsBox.appendChild(cropBoxButtonContainer)
    cropOptionsBox.appendChild(cropActionContainer)
}

const createAdjustmentSlider=(string)=>{
    //create Element
    const sliderBox = document.createElement('div')
    const sliderName = document.createElement('label')
    const slider = document.createElement('input')

    //put thing in element
    sliderName.innerHTML =string.slice(0,1).toUpperCase() + string.slice(1,string.length)
    slider.setAttribute('type', 'range')
    slider.setAttribute('min', -100)
    slider.setAttribute('max', 100)
    slider.setAttribute('value', 0)
    slider.setAttribute('name', string)

    //append
    sliderBox.appendChild(sliderName)
    sliderBox.appendChild(slider)
    adjustmentBar.appendChild(sliderBox)
}

const createAdjustmentSliderStartAtZero=(string)=>{
    //create Element
    const sliderBox = document.createElement('div')
    const sliderName = document.createElement('label')
    const slider = document.createElement('input')

    //put thing in element
    sliderName.innerHTML = string.slice(0,1).toUpperCase() + string.slice(1,string.length)
    slider.setAttribute('type', 'range')
    slider.setAttribute('min', 0)
    slider.setAttribute('max', 100)
    slider.setAttribute('value',0)
    slider.setAttribute('name', string)

    //append
    sliderBox.appendChild(sliderName)
    sliderBox.appendChild(slider)
    adjustmentBar.appendChild(sliderBox)
    container.appendChild(adjustmentBar)
}

const resetContainer =()=>{
    if(document.querySelector('#canvasDivBlock') !== null){
        document.querySelector('#canvasDivBlock').style.boxShadow = 'none'   
        document.querySelector('#canvasDivBlock').innerHTML ='' 
        canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        document.querySelector('#canvasDivBlock').appendChild(canvas)    
    } 
    container.innerHTML =''
    functionsContainer.innerHTML = ''
    cropOptionsBox.innerHTML = ''
    adjustmentBar.innerHTML = ''
}

const createCanvas=(imageURL,imageKey)=>{
    

    canvas.id ='canvas'
    const ctx = canvas.getContext('2d')
    canvas.dataset.keyword = imageKey
    ///
    board.appendChild(canvasDivBlock)
    //
    container.appendChild(board)
    ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the rect to draw
    img.src = imageURL
    img.setAttribute('crossOrigin', '');
    
    img.onload = () => {
        let sizeManipulation = 1.5
        canvas.width = img.width/sizeManipulation;
        canvas.height = img.height/sizeManipulation;
        canvasDivBlock.style.width = `${img.width/sizeManipulation}px`
        canvasDivBlock.style.height = `${img.height/sizeManipulation}px`
        canvasDivBlock.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.1)'
        ctx.drawImage(img,0,0,img.width/sizeManipulation,img.height/sizeManipulation);
    }
}

const loadEditFunctionBar=()=>{
    //set Bar
    container.appendChild(functionsContainer)
    const editFunctionBar = document.createElement('div')
    editFunctionBar.id = 'editFunctionBar'
    //set Buttons for Bar
    const adjustmentButton = document.createElement('div')
    adjustmentButton.setAttribute('class','editFunctionButton')
    adjustmentButton.id = 'adjustButton'
    adjustmentButton.innerHTML = 'adjust'
    const cropButton = document.createElement('div')
    cropButton.id = 'cropButton'
    cropButton.innerHTML = 'crop'
    cropButton.setAttribute('class','editFunctionButton')
    
    //--createSlider
    const sliders = ['brightness','exposure','contrast','vibrance','saturation']
    const slidersStartAtZero = ['hue','sepia','noise']
    for(let i=0; i<sliders.length; i++){
        createAdjustmentSlider(sliders[i])
    }
    for(let i=0; i<slidersStartAtZero.length; i++){
        createAdjustmentSliderStartAtZero(slidersStartAtZero[i])
    }
    createCropOptions();

    //put buttons in the bar
    editFunctionBar.appendChild(adjustmentButton)
    editFunctionBar.appendChild(cropButton)
    functionsContainer.appendChild(editFunctionBar)
    functionsContainer.appendChild(cropOptionsBox)
    functionsContainer.appendChild(adjustmentBar)
    functionsContainer.appendChild(board)
    
}

const renderEditor = (imageURL,imageKey)=>{
    resetContainer()
    header('editor')
    createCanvas(imageURL,imageKey)
    loadEditFunctionBar()
}

export {renderEditor, changeBrightness, changeExposure, changeContrast, changeVibrance, changeSaturation, changeHue, changeSepia, changeNoise, activeCrop, deactiveCrop, downloadEditedImage, resetContainer, cropper, crop }