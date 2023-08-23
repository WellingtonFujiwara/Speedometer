const speedElement = document.querySelector('#speed')
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')

startButton.addEventListener('click', ()=>{
    function handleSuccess(position){
        console.log(position)
        speedElement.innerHTML = position.coords.speed?(position.coords.speed * 3.6).toFixed(1):0
    }
    
    function handleError(error){
        console.log(error.msg)
    }

    const options = { enableHighAccuracy: true }

    navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    startButton.classList.add('d-none')
    stopButton.classList.remove('d-none')

})

stopButton.addEventListener('click', ()=>{
    startButton.classList.remove('d-none')
    stopButton.classList.add('d-none')
})

/* capturar dados da api Geolocation
criar função start e stop */

