    let getTagsInOrder =(dataArray)=>{
        let tags = []
        let tagCount = {}
        for(let i=0; i<dataArray.length; i++){
            dataArray[i].tags.split(', ').forEach(word=>tags.push(word))
        }
        tags.sort();
        //count the tags frequency
        for(let i=0; i<tags.length; i++){
            let count = 0;
            for(let j=0; j<tags.length; j++){
                if(tags[i]===tags[j]){
                    count++;
                }
            }
            if(!Object.keys(tagCount).includes(tags[i])){
                tagCount[tags[i]] = count
            }
        }
        //sort the tags based on the freq
        tags = Object.keys(tagCount)

        //exclude search keywords in tag
        let keyword = document.querySelector('#searchBar').value
        tags.splice(tags.indexOf(keyword),1)
        tags.sort((a,b)=>{
            if(tagCount[a]>tagCount[b]){
                return -1
            } else if (tagCount[a]>tagCount[b]) {
                return 1
            } else {
                return 0
            }
        })
        return tags
    }

    let createKeyWordSearchButton =(keywordsBar, tags)=>{
        for(let i=0; i<tags.length; i++){
            const keywordButton = document.createElement('button')
            keywordButton.innerHTML = tags[i]
            keywordButton.setAttribute('class','keywordRecommendation')
            keywordsBar.appendChild(keywordButton)
        }
    }

    const resetKeywordsBar = ()=>{
        const recKeyword = document.querySelector('#recKeyword')
        if(recKeyword !== null){
            recKeyword.remove();
        }
    }

    let renderKeywordsBar = (imagesArray)=>{
        resetKeywordsBar();
        if(imagesArray.length>0){
        //set keywordsBar
        const keywordsBar = document.createElement('div')
        const container = document.querySelector('.container')
        keywordsBar.id = 'recKeyword'

        //generate keyword buttons
        let tags = getTagsInOrder(imagesArray)
        createKeyWordSearchButton(keywordsBar, tags);
        container.appendChild(keywordsBar)
        }
    }

    export default renderKeywordsBar