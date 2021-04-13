import logoImage from './asset/logo@2.png';
import searchClearButton from './asset/searchClearButtonImage@2.png'
import searchIcon from './asset/searchIcon@2.png'

const header = (page='search') => {
    const container = document.querySelector('.container')
    const header = document.createElement('header')
    
    const logo = document.createElement('div')
    const img = document.createElement('img')
    img.src = logoImage
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
    clearImg.src = searchClearButton
    clearImg.style.maxWidth = '18px'
    clearButton.appendChild(clearImg)

    const searchIconPlaceholder = document.createElement('img')
    searchIconPlaceholder.setAttribute('class','searchPlaceholder')
    searchIconPlaceholder.src = searchIcon
    searchIconPlaceholder.style.maxWidth = (window.innerWidth<400)?'16px':'20px'
    searchIconPlaceholder.style.maxHeight = (window.innerWidth<400)?'16px':'20px'

    const downloadButton = document.createElement('button')
    const goBackButton = document.createElement('button')
    downloadButton.id = 'downloadFile'
    downloadButton.innerText = 'Download'
    goBackButton.id = 'goBackButton'
    goBackButton.innerText = '< Go back'
    

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
        header.appendChild(goBackButton)
        header.appendChild(downloadButton)
        container.appendChild(header)
    }
}

export default header;