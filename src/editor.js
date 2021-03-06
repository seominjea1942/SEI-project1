import header from './header.js'
import adjustmentIconDeactive from './asset/adjustIcon_deactive@2.png'
import adjustmentIconDeactiveDark from './asset/adjustIcon_deactive_darkmode@2.png'
import cropIconDeactive from './asset/crop_deactive@2.png'
import cropIconDeactiveDark from './asset/crop_deactive_darkmode@2.png'


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
let canvasRatio;
canvas.id = 'canvas'
canvasDivBlock.appendChild(canvas)
let cropper;
let inMemoryImg = new Image();

const refresh =()=>{
    for(let i=0; i<100; i++){
        resizeCanvas();
    }
}

const resetImage =()=>{
    let imgRatio = img.width/img.height
    let currentCanvas = document.querySelector('#canvas')
    let currentCtx = currentCanvas.getContext('2d')
    let artboard = document.querySelector('#artboard')
    let artboardWidth = parseInt(window.getComputedStyle(artboard).getPropertyValue('width').slice(0,-2))
    let artboardHeight = parseInt(window.getComputedStyle(artboard).getPropertyValue('height').slice(0,-2))
    let canvasDivBlock = document.querySelector('#canvasDivBlock')
    
    if(currentCanvas.height<currentCanvas.width || window.innerWidth<currentCanvas.width/0.8){
        currentCanvas.width = artboardWidth * 0.8
        currentCanvas.height = currentCanvas.width /imgRatio
    }
    if(currentCanvas.height>=currentCanvas.width || window.innerHeight< currentCanvas.height/0.8){
        currentCanvas.height = artboardHeight * 0.8
        currentCanvas.width = currentCanvas.height * imgRatio
    }
    canvasDivBlock.style.width = currentCanvas.width +'px'
    canvasDivBlock.style.height = currentCanvas.height +'px'
    inMemoryImg = img.cloneNode(true)
    currentCtx.drawImage(img, 0, 0, currentCanvas.width, currentCanvas.height);
    canvasRatio = imgRatio
}

const downloadEditedImage =()=>{
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
    resizeCanvas()
    let selectCanvas = document.querySelector('#canvas')
    let canvasDivBlock = document.querySelector('#canvasDivBlock')
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
    if(cropper !== undefined){
        let currentCanvas = document.querySelector('#canvas')
        let newCanvas = cropper.getCroppedCanvas()
        let ctx = currentCanvas.getContext('2d')
        if(newCanvas !==null){
            ctx.clearRect(0,0,currentCanvas.width,currentCanvas.height)
            currentCanvas.width = newCanvas.width
            currentCanvas.height = newCanvas.height
            ctx.drawImage(newCanvas,0,0)
            canvasDivBlock.style.width = `${newCanvas.width}px`
            canvasDivBlock.style.height = `${newCanvas.height}px`
            inMemoryImg.src = currentCanvas.toDataURL("image/jpeg", 1.0);
            currentCanvas = newCanvas.cloneNode(true)
            cropper.destroy();
        }
        canvasRatio = currentCanvas.width/currentCanvas.height;
    }
}

const changeBrightness =(value)=>{
    let preVal = 0
    let curVal = value
    let val = (value>0)? Math.abs(preVal-curVal):-Math.abs(preVal-curVal)
    Caman("#canvas",function () {
        this.revert()
        this.brightness(val).render();
    })
    preVal = curVal
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
    sliderBox.classList.add('sliderBox')
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
    sliderBox.classList.add('sliderBox')
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
        let sizeManipulation = (window.innerWidth<500)?3:1.8
        canvas.width = img.width/sizeManipulation;
        canvas.height = img.height/sizeManipulation;
        canvasRatio = canvas.width/canvas.height;
        canvasDivBlock.style.width = `${img.width/sizeManipulation}px`
        canvasDivBlock.style.height = `${img.height/sizeManipulation}px`
        canvasDivBlock.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.1)'
        resetImage();

    }
    inMemoryImg = img.cloneNode(true)
}

const loadEditFunctionBar=()=>{
    //set Bar
    container.appendChild(functionsContainer)
    const editFunctionBar = document.createElement('div')
    editFunctionBar.id = 'editFunctionBar'
    //set Buttons for Bar
    const adjustmentButton = document.createElement('div')
    const adjustmentIcon = document.createElement('img')
    const adjustmentButtonName = document.createElement('span')
    adjustmentButton.setAttribute('class','editFunctionButton')
    adjustmentButton.id = 'adjustButton'
    adjustmentIcon.src =(window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?adjustmentIconDeactiveDark:adjustmentIconDeactive
    adjustmentIcon.id = 'adjustIcon'
    adjustmentIcon.style.maxWidth = '30px'
    adjustmentButtonName.innerText = 'Adjustment'
    adjustmentButtonName.id = 'adjustIconLabel'
    adjustmentButton.appendChild(adjustmentIcon)
    adjustmentButton.appendChild(adjustmentButtonName)
    
    const cropButton = document.createElement('div')
    const cropIcon = document.createElement('img')
    const cropButtonName = document.createElement('span')
    cropButton.setAttribute('class','editFunctionButton')
    cropButton.id = 'cropButton'
    cropIcon.src = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?cropIconDeactiveDark:cropIconDeactive
    cropIcon.id = 'cropIcon'
    cropIcon.style.maxWidth = '30px'
    cropButtonName.innerText = 'Crop'
    cropButtonName.id = 'cropIconLabel'
    cropButton.appendChild(cropIcon)
    cropButton.appendChild(cropButtonName)
    cropButton.setAttribute('class','editFunctionButton')

    //adjustmetn apply button
    const adjustmentApplyButton = document.createElement('button')
    adjustmentApplyButton.innerText = 'Apply'
    adjustmentApplyButton.id = 'applyAdjustment'

    //sliderToggleBarFor small Screen
    const sliderToggleBar = document.createElement('div')
    sliderToggleBar.classList.add('sliderToggleBar')
    adjustmentBar.appendChild(sliderToggleBar);

    //--createSlider
    const sliders = ['brightness','exposure','contrast','vibrance','saturation']
    const slidersStartAtZero = ['hue','sepia','noise']
    for(let i=0; i<sliders.length; i++){
        createAdjustmentSlider(sliders[i])

        let sliderToggleButton = document.createElement('button')
        sliderToggleButton.classList.add('sliderToggleButton')
        sliderToggleButton.innerText = sliders[i]
        sliderToggleBar.appendChild(sliderToggleButton)
    }
    for(let i=0; i<slidersStartAtZero.length; i++){
        createAdjustmentSliderStartAtZero(slidersStartAtZero[i])

        let sliderToggleButton = document.createElement('button')
        sliderToggleButton.classList.add('sliderToggleButton')
        sliderToggleButton.innerText = slidersStartAtZero[i]
        sliderToggleBar.appendChild(sliderToggleButton)
    }

    adjustmentBar.appendChild(adjustmentApplyButton);

    createCropOptions();
    //put buttons in the bar

    editFunctionBar.appendChild(adjustmentButton)
    editFunctionBar.appendChild(cropButton)
    functionsContainer.appendChild(editFunctionBar)
    functionsContainer.appendChild(cropOptionsBox)
    functionsContainer.appendChild(adjustmentBar)
    functionsContainer.appendChild(board)
    
}


const resizeCanvas =()=>{
    let currentCanvas = document.querySelector('#canvas')
    let currentCtx = currentCanvas.getContext('2d')
    let artboard = document.querySelector('#artboard')
    let artboardWidth = parseInt(window.getComputedStyle(artboard).getPropertyValue('width').slice(0,-2))
    let artboardHeight = parseInt(window.getComputedStyle(artboard).getPropertyValue('height').slice(0,-2))
    let canvasDivBlock = document.querySelector('#canvasDivBlock')
    
    if(currentCanvas.height<currentCanvas.width || window.innerWidth<currentCanvas.width/0.8){
        currentCanvas.width = artboardWidth * 0.8
        currentCanvas.height = currentCanvas.width/canvasRatio
    }
    if(currentCanvas.height>=currentCanvas.width || window.innerHeight< currentCanvas.height/0.8){
        currentCanvas.height = artboardHeight * 0.8
        canvas.width = currentCanvas.height * canvasRatio
    }
    canvasDivBlock.style.width = currentCanvas.width +'px'
    canvasDivBlock.style.height = currentCanvas.height +'px'
    currentCtx.drawImage(inMemoryImg, 0, 0, currentCanvas.width, currentCanvas.height);
}

const applyAdjustment =()=>{
    let currentCanvas = document.querySelector('#canvas')
    let sliderValue = (sliderName)=>{
        return document.querySelector(`.sliderBox>input[name="${sliderName}"]`).value
    }
    Caman(currentCanvas,function () {
        this.revert()
        this.brightness(sliderValue('brightness'))
        this.exposure(sliderValue('exposure'))
        this.contrast(sliderValue('contrast'))
        this.vibrance(sliderValue('vibrance'))
        this.saturation(sliderValue('saturation'))
        this.hue(sliderValue('hue'))
        this.sepia(sliderValue('sepia'))
        this.noise(sliderValue('noise'))
        this.render();
    })
    inMemoryImg.src = currentCanvas.toDataURL("image/jpeg", 1.0);
    canvas.removeAttribute('data-caman-id')
    refresh();
}

const renderEditor = (imageURL,imageKey)=>{
    resetContainer()
    header('editor')
    createCanvas(imageURL,imageKey)
    loadEditFunctionBar()
}

export {renderEditor, changeBrightness, changeExposure, changeContrast, changeVibrance, changeSaturation, changeHue, changeSepia, changeNoise, activeCrop, deactiveCrop, downloadEditedImage, resetContainer, cropper, crop, resizeCanvas, resetImage, applyAdjustment}