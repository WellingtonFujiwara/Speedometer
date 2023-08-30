const ridelistElement = document.querySelector('#rideList')
const allRides = getAllRides()

allRides.forEach(async ([id, value])=> {
    const ride = JSON.parse(value)
    ride.id = id
    const firstPosition = ride.data[0]
    /* console.log(firstPosition) */
    
    const location = await getLocationData(firstPosition.latitude, firstPosition.longitude)

   

    const itemElement = document.createElement('li')
    itemElement.id = ride.id
    
    
    const cityDiv = document.createElement('div')
    cityDiv.innerText = `${location.city} - ${location.countryCode}`

    const maxSpeedDiv = document.createElement('div')
    maxSpeedDiv.innerText = getMaxSpeed(ride.data)
    
    
    
    ridelistElement.appendChild(itemElement)
    itemElement.appendChild(cityDiv)
    itemElement.appendChild(maxSpeedDiv)
    
})

async function getLocationData(latitude, longitude) {
    const urlApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`

    const response = await fetch(urlApi)
    return await response.json()
}

function getMaxSpeed(positions) {
    let maxSpeed = 0
    positions.forEach(position=>{
        if(position.speed != null && position.speed > maxSpeed) {
            maxSpeed = position.speed
        }
    })
    
    return (maxSpeed * 3.6).toFixed(1)
}

