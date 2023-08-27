const ridelistElement = document.querySelector('#rideList')
const allRides = getAllRides()

allRides.forEach(([id, value])=> {
    const ride = JSON.parse(value)
    ride.id = id
    const firstPosition = ride.data[0]
    console.log(firstPosition)

    const itemElement = document.createElement('li')
    itemElement.id = ride.id
    /* itemElement.innerText =  */
    ridelistElement.appendChild(itemElement)



    console.log(ride)
})

