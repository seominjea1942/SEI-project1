const imageResultBox = document.createElement('div')
imageResultBox.setAttribute('class','imageResultBox')
const contentContainer = document.querySelector('#contentContainer')
let currentPageMode = 'search' // change this to main in the future

console.log(imageResultBox)
const createImage = (imageArray)=>{
    for(let i=0; i<imageArray.length; i++){
        const img = document.createElement('img')
        img.setAttribute('class', 'imageItem')
        img.setAttribute('src', imageArray[i].urls.regular)
        img.dataset.fullImageUrl = imageArray[i].urls.full
        imageResultBox.appendChild(img)
    }
    console.log(imageResultBox)
    contentContainer.appendChild(imageResultBox)
}

const getImageFromPixaBay = async() =>{
    const url = `https://api.unsplash.com/search/photos?client_id=4Adg4tg-lNTl5MgpDZS-25MGt6xp0G3KL7mwhiQyBmg&query=cat&per_page=30&orientation=portrait&page=1`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const imageArray = data.results // image objects are under the hits arrray
    createImage(imageArray);
}


//functions in this sectino is temporary and I will remove this in the future
const reloadPage = (e) =>{
    resetSection();
    if(currentPageMode=='editor'){
        const img = document.createElement('img')
        img.setAttribute('src',e.target.dataset.fullImageUrl)
        contentContainer.appendChild(img)
    }
}

const resetSection =()=>{
    contentContainer.innerHTML = ''
    console.log(contentContainer)
}
//////


//event listeners
imageResultBox.addEventListener('click',(e)=>{
   if(e.target.tagName =='IMG'){
       currentPageMode ='editor'
       console.log(currentPageMode)
       reloadPage(e);
   }
})

//call data temp for now
getImageFromPixaBay();