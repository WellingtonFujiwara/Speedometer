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

    const mapID = `map${ride.id}`
    const mapElement = document.createElement('div')
    mapElement.id = mapID
    mapElement.style = 'width:100px; height:100px'
    mapElement.className = 'bg-secondary rounded-3'
    
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
    
    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataDiv)

    dataDiv.appendChild(cityDiv)
    dataDiv.appendChild(maxSpeedDiv)
    dataDiv.appendChild(distanceDiv)
    dataDiv.appendChild(durationDiv)
    dataDiv.appendChild(dateDiv)

    //mapa usando api leaflet
    const map = L.map(mapID, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false
    }).setView([firstPosition.latitude, firstPosition.longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 12,
        maxZoom: 19,
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)

    itemElement.addEventListener('click', () => {
        window.location.replace(`/details.html?id=${ride.id}`)
    })
})



