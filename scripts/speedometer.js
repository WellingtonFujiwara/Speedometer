const speedElement = document.querySelector('#speed')
const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')

let id;

startButton.addEventListener('click', ()=>{
    if (id) return

    function handleSuccess(position){
        speedElement.innerHTML = position.coords.speed?(position.coords.speed * 3.6).toFixed(1):0
    }
    
    function handleError(error){
        console.log(error.msg)
    }

    const options = { enableHighAccuracy: true }

    id = navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    startButton.classList.add('d-none')
    stopButton.classList.remove('d-none')

})

stopButton.addEventListener('click', ()=>{
    if (!id) return

    navigator.geolocation.clearWatch(id)
    id = null

    startButton.classList.remove('d-none')
    stopButton.classList.add('d-none')
})



