import logoImage from './asset/logo@2.png';
import logoImageDark from './asset/logo_darkmode@2.png';
import searchClearButton from './asset/searchClearButtonImage@2.png'
import searchClearButtonDark from './asset/searchClearButtonImage_darkmode@2.png'
import searchIcon from './asset/searchIcon@2.png'
import searchIconDark from './asset/searchIcon_darkmode@2.png'

const header = (page='search') => {
    const container = document.querySelector('.container')
    const header = document.createElement('header')
    
    const logo = document.createElement('div')
    const img = document.createElement('img')
    img.id ='logoIMG'
    img.src = (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?logoImageDark:logoImage
    img.style.maxWidth = (window.innerWidth<400)?'25px':'30px';
    logo.id = 'logo'
    logo.appendChild(img)

    const searchBarContainer = document.createElement('div')
    searchBarContainer.id = 'searchBarContainer'
    const searchInput = document.createElement('input')
    searchInput.setAttribute('type','text')
    searchInput.setAttribute('name','searchBar')
    searchInput.setAttribute('id','searchBar')
    searchInput.setAttribute('placeholder','What are you looking for?')

    const clearButton = document.createElement('div')
    clearButton.id ='keywordClearButton'
    const clearImg = document.createElement('img')
    clearImg.id = 'clearButtonImg'
    clearImg.src =  (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?searchClearButtonDark:searchClearButton
    clearImg.style.maxWidth = '18px'
    clearButton.appendChild(clearImg)

    const searchIconPlaceholder = document.createElement('img')
    searchIconPlaceholder.setAttribute('class','searchPlaceholder')
    searchIconPlaceholder.src =  (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches)?searchIconDark:searchIcon
    searchIconPlaceholder.style.maxWidth = (window.innerWidth<400)?'16px':'20px'
    searchIconPlaceholder.style.maxHeight = (window.innerWidth<400)?'16px':'20px'

    const editorTopActionButtonbox = document.createElement('div')
    const downloadButton = document.createElement('button')
    const goBackButton = document.createElement('button')
    downloadButton.id = 'downloadFile'
    downloadButton.innerText = 'Download'
    goBackButton.id = 'goBackButton'
    goBackButton.innerText = '< Go back'

    const resetButton = document.createElement('button')
    resetButton.id = 'resetImage'
    resetButton.innerText = 'Reset the image'
    

    if(page==='search'){
        searchBarContainer.appendChild(searchIconPlaceholder)
        searchBarContainer.appendChild(searchInput)
        searchBarContainer.appendChild(clearButton)
        header.id = 'header'
        header.appendChild(logo)
        header.appendChild(searchBarContainer)
        container.appendChild(header)
    }
    if(page==='editor'){
        header.id = 'headerEditor'
        editorTopActionButtonbox.appendChild(resetButton)
        editorTopActionButtonbox.appendChild(downloadButton)
        header.appendChild(goBackButton)
        header.appendChild(editorTopActionButtonbox)
        container.appendChild(header)
    }
}

export default header;