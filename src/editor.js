import header from './header.js'

const container = document.querySelector('.container')
const adjustmentBar = document.createElement('div')
adjustmentBar.id = 'adjustmentBar'
let img = new Image();
const canvasDivBlock = document.createElement('div')
canvasDivBlock.id = 'canvasDivBlock'
const canvas = document.createElement('canvas')
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
    canvasDivBlock.style.width = `${canvas.width}px`
    canvasDivBlock.style.height = `${canvas.height}px`
    canvasDivBlock.style.backgroundColor = `background-color: rgb(20,20,20)`;
    cropper = new Cropper(selectCanvas,{
        autoCropArea: 1,
        background: false,
    })
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
    const cropOptionsBox = document.createElement('div')
    cropOptionsBox.id = 'cropOptionsBox'
    const cropActiveButton = document.createElement('button')
    cropActiveButton.id = 'cropActiveButton'
    const cropDeactiveButton = document.createElement('button')
    cropDeactiveButton.id = 'cropDeactiveButton'
    cropActiveButton.innerText = 'Active Crop'
    cropDeactiveButton.innerText = 'Deactive Crop'

    //append
    cropOptionsBox.appendChild(cropActiveButton)
    cropOptionsBox.appendChild(cropDeactiveButton)
    container.appendChild(cropOptionsBox)
    
}

const createAdjustmentSlider=(string)=>{
    //create Element
    const sliderBox = document.createElement('div')
    const sliderName = document.createElement('label')
    const slider = document.createElement('input')

    //put thing in element
    sliderName.innerHTML =string
    slider.setAttribute('type', 'range')
    slider.setAttribute('min', -100)
    slider.setAttribute('max', 100)
    slider.setAttribute('value', 0)
    slider.setAttribute('name', string)

    //append
    sliderBox.appendChild(sliderName)
    sliderBox.appendChild(slider)
    adjustmentBar.appendChild(sliderBox)
    container.appendChild(adjustmentBar)
}

const createAdjustmentSliderStartAtZero=(string)=>{
    //create Element
    const sliderBox = document.createElement('div')
    const sliderName = document.createElement('label')
    const slider = document.createElement('input')

    //put thing in element
    sliderName.innerHTML = string
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
    container.innerHTML =''
}

const createCanvas=(imageURL,imageKey)=>{
    

    canvas.id ='canvas'
    const ctx = canvas.getContext('2d')
    canvas.dataset.keyword = imageKey
    container.appendChild(canvasDivBlock)
    ctx.clearRect(0, 0, canvas.width, canvas.height);//clear the rect to draw
    img.src = imageURL
    img.setAttribute('crossOrigin', '');
    
    img.onload = () => {
        
        canvas.width = img.width;
        canvas.height = img.height;
        canvasDivBlock.style.width = `${img.width}px`
        canvasDivBlock.style.height = `${img.height}px`
        ctx.drawImage(img,0,0,img.width,img.height);
    }
}

const loadEditFunctionBar=()=>{
    //set Bar
    const editFunctionBar = document.createElement('div')
    editFunctionBar.id = 'editFunctionBar'

    //set Buttons for Bar
    const adjustmentButton = document.createElement('div')
    adjustmentButton.id = 'adjustButton'
    adjustmentButton.innerHTML = 'adjust'
    const cropButton = document.createElement('div')
    cropButton.id = 'cropButton'
    cropButton.innerHTML = 'crop'
    
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
    container.appendChild(editFunctionBar)
}

const renderEditor = (imageURL,imageKey)=>{
    resetContainer()
    header('editor')
    createCanvas(imageURL,imageKey)
    loadEditFunctionBar()
}

export {renderEditor, changeBrightness, changeExposure, changeContrast, changeVibrance, changeSaturation, changeHue, changeSepia, changeNoise, activeCrop, deactiveCrop, downloadEditedImage, resetContainer }