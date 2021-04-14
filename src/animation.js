{/* <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_yimydpjm.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player> */}

{/* <lottie-player src="https://assets4.lottiefiles.com/datafiles/9jPPC5ogUyD6oQq/data.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player> */}

const noResultAnimation =()=>{
    const animationBox = document.createElement('div')
    const lottiePlayer = document.createElement('lottie-player')
    const h1 = document.createElement('h1')
    const p = document.createElement('p')
    h1.innerText = 'No result'
    p.innerText = 'Please try the other keywords'
    const grid = document.querySelector('.grid')
    lottiePlayer.src = "https://assets8.lottiefiles.com/private_files/lf30_yimydpjm.json"
    lottiePlayer.backgroud = "transparent"
    lottiePlayer.speed = 1
    lottiePlayer.setAttribute('style','width: 600px; height: 600px;')
    lottiePlayer.setAttribute('loop','')
    lottiePlayer.setAttribute('autoplay','')
    animationBox.id = 'noResultAnimation'
    console.log(lottiePlayer)
    animationBox.appendChild(lottiePlayer)
    animationBox.appendChild(h1)
    animationBox.appendChild(p)
    //parentNode.insertBefore(newNode, referenceNode)
    let parent = grid.parentNode
    if(document.querySelector('#noResultAnimation')===null){
        parent.insertBefore(animationBox,grid)
    }
}

const mainAnimation=()=>{
    const animationBox = document.createElement('div')
    const lottiePlayer = document.createElement('lottie-player')
    const h1 = document.createElement('h1')
    h1.innerText = 'Find and Customize the image you want'
    const container = document.querySelector('.container')
    lottiePlayer.src = "https://assets4.lottiefiles.com/datafiles/9jPPC5ogUyD6oQq/data.json"
    lottiePlayer.backgroud = "transparent"
    lottiePlayer.speed = 1
    lottiePlayer.setAttribute('style','width: 450px; height: 450px;')
    lottiePlayer.setAttribute('loop','')
    lottiePlayer.setAttribute('autoplay','')
    animationBox.id = 'mainAnimation'
    console.log(lottiePlayer)
    animationBox.appendChild(lottiePlayer)
    animationBox.appendChild(h1)
    //parentNode.insertBefore(newNode, referenceNode)
    container.appendChild(animationBox)
}

export {noResultAnimation, mainAnimation}