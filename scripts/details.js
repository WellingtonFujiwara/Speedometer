const params = new URLSearchParams(window.location.search)
const rideID = params.get('id')
const ride = getRideRecord(rideID)
const firstPosition = ride.data[0]

document.addEventListener('DOMContentLoaded', async()=>{

    const location = await getLocationData(firstPosition.latitude, firstPosition.longitude)

    /* console.log(ride) */

    //const itemElement = document.createElement('li')
    const mapElement = document.createElement('div')
    mapElement.style = 'height: 300px;'
    mapElement.className = 'bg-secondary rounded-4 m-auto'

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

    //itemElement.appendChild(dataDiv)

    dataDiv.appendChild(cityDiv)
    dataDiv.appendChild(maxSpeedDiv)
    dataDiv.appendChild(distanceDiv)
    dataDiv.appendChild(durationDiv)
    dataDiv.appendChild(dateDiv)

    document.querySelector('#map').appendChild(mapElement)
    document.querySelector('#data').appendChild(dataDiv)


    //mapa usando api leaflet
    const map = L.map('map').setView([firstPosition.latitude, firstPosition.longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 12,
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const positionArray = ride.data.map((position => {
        return [position.latitude, position.longitude]
    }))

    /* const polyline = L.polyline(positionArray, { color: "#F00" }).addTo(map)
    map.fitBounds(polyline.getBounds()) */

    const marker = L.marker(positionArray).addTo(map);
})

