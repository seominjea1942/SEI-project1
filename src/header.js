const header = () => {
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
    searchBarContainer.appendChild(searchInput)
    searchBarContainer.appendChild(clearButton)
    header.appendChild(logo)
    header.appendChild(searchBarContainer)
    container.appendChild(header)
}

export default header;