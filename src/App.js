import React, { useEffect, useState } from 'react';


const App = () => {

  const [coordEmployee, setCoordEmployee] = useState(null);
  const [coordSupervisor, setCoordSupervisor] = useState(null);

  useEffect(() => {

  }, []);


  const distance = (lat1, lon1, lat2, lon2, unit) => {
    
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = ((dist * 1.609344) * 1000).toFixed(2) }
    if (unit=="N") { dist = dist * 0.8684 }

    console.log(lat1)
    console.log(lon1);
    console.log(lat2);
    console.log(lon2);

    console.log(`dist: ${dist}`);

    return dist
  }

  const setCoordinates = (p) =>{

    navigator.geolocation.getCurrentPosition(function(position){

      if(p === 'work zone')
      setCoordSupervisor({lat1: position.coords.latitude, lon1: position.coords.longitude});
      else if(p === 'employee')
      setCoordEmployee({lat2: position.coords.latitude, lon2: position.coords.longitude});

      return alert(`Coordinates assigned successfull! - LAT: ${position.coords.latitude} LONG: ${position.coords.longitude}`);
    })
  }

  const getDistance = (p) => {

    const {lat1, lon1} = coordSupervisor;
    const {lat2, lon2} = coordEmployee;

    const dist = distance(lat1, lon1, lat2, lon2, "K");

    if(p === 'get'){
      alert(`Distance between the work zone and the employee is ${dist}m`);
    }
    else if(p === 'validate'){
      dist > 40 ? alert(`The employee is too far away from the work zone (${dist}m)`) : alert(`You are within range to clock (${dist}m)!`)
    }
  }
  
  
  return (
          <div className="App">
            <header className="App-header">
              <button onClick={() => { setCoordinates('work zone') } }>Set point coordinates (work zone)</button><br/><br/>
              <button onClick={() => { setCoordinates('employee') } }>Set point coordinates (employee)</button><br/><br/>
              <button onClick={() => { getDistance('get') } }>Get distance </button><br/><br/>
              <button onClick={() => { getDistance('validate') } }>Validate distance </button>
            </header>
          </div>
          )
}

export default App;