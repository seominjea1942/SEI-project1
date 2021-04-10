const header = (page='search') => {
    const container = document.querySelector('.container')
    const header = document.createElement('header')
    let classesForHeader = ['bg-red-50', 'dark:bg-gray-800', 'flex', 'flex-row','items-center']

    header.classList.add(...classesForHeader)
    const logo = document.createElement('div')
    logo.innerHTML ='logo'
    const searchBarContainer = document.createElement('div')
    searchBarContainer.id = 'searchBarContainer'
    const searchInput = document.createElement('input')
    searchInput.setAttribute('type','text')
    searchInput.setAttribute('name','searchBar')
    searchInput.setAttribute('id','searchBar')
    searchInput.setAttribute('placeholder','keyword')
    const clearButton = document.createElement('button')
    clearButton.innerHTML = 'x'

    const downloadButton = document.createElement('button')
    const goBackButton = document.createElement('button')
    downloadButton.id = 'downloadFile'
    downloadButton.innerText = 'Download'
    goBackButton.id = 'goBackButton'
    goBackButton.innerText = '< Go back'
    

    if(page==='search'){
        searchBarContainer.appendChild(searchInput)
        searchBarContainer.appendChild(clearButton)
        header.appendChild(logo)
        header.appendChild(searchBarContainer)
        container.appendChild(header)
    }
    if(page==='editor'){
        header.appendChild(goBackButton)
        header.appendChild(downloadButton)
        container.appendChild(header)
    }
}

export default header;