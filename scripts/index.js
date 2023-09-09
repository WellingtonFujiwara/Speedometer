const ridelistElement = document.querySelector('#rideList')
const allRides = getAllRides()

allRides.forEach(async ([id, value])=> {
    const ride = JSON.parse(value)
    ride.id = id
    const firstPosition = ride.data[0]
    
    const itemElement = document.createElement('li')
    itemElement.id = ride.id
    itemElement.className = 'd-flex align-items-center gap-3 m-1 p-1 shadow-sm'
    itemElement.style = 'cursor: pointer'
    ridelistElement.appendChild(itemElement)
    
    const location = await getLocationData(firstPosition.latitude, firstPosition.longitude)

    const mapDiv = document.createElement('div')
    mapDiv.style = 'width:100px; height:100px'
    mapDiv.className = 'bg-secondary rounded-3'
    
    const dataDiv = document.createElement('div')
    
    const cityDiv = document.createElement('div')
    cityDiv.innerText = `${location.city} - ${location.countryCode}`
    cityDiv.style = 'font-weight: bold'
    
    const maxSpeedDiv = document.createElement('div')
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} km/h`
    maxSpeedDiv.className = 'h5 text-primary'
    
    const distanceDiv = document.createElement('div')
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)}`
    
    const durationDiv = document.createElement('div')
    durationDiv.innerText = `Duration: ${getDuration(ride)}`
    
    const dateDiv = document.createElement('div')
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = 'text-secondary'
    
    itemElement.appendChild(mapDiv)
    itemElement.appendChild(dataDiv)

    dataDiv.appendChild(cityDiv)
    dataDiv.appendChild(maxSpeedDiv)
    dataDiv.appendChild(distanceDiv)
    dataDiv.appendChild(durationDiv)
    dataDiv.appendChild(dateDiv)

    itemElement.addEventListener('click', () => {
        window.location.replace(`/details.html?id=${ride.id}`)
    })
})



