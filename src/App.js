import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';


const App = () => {

  const [Dist, setDist] = useState(null);

  useEffect(() => {
  
    teeeest();

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

    setDist(dist);

    return dist
  }

  const teeeest = () => {

      //Si el valor que recibe es true entonces enviamos el correo
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);

        alert("LAT: "+position.coords.latitude);

        console.log("Longitude is :", position.coords.longitude);
      })
  }

  const btnDistance = () =>{

    navigator.geolocation.getCurrentPosition(function(error){
      // El segundo parámetro es la función de error
          switch(error.code) {
              case error.PERMISSION_DENIED:
                  // El usuario denegó el permiso para la Geolocalización.
                  break;
              case error.POSITION_UNAVAILABLE:
                  // La ubicación no está disponible.
                  break;
              case error.TIMEOUT:
                  // Se ha excedido el tiempo para obtener la ubicación.
                  break;
              case error.UNKNOWN_ERROR:
                  // Un error desconocido.
                  break;
          }
    })

    navigator.geolocation.getCurrentPosition((position)  => {

      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      //esquina de san francisco. Será punto A: -33.44850105580589, -70.6469909007749

      distance(-33.44850105580589, -70.6469909007749, position.coords.latitude, position.coords.longitude, "K");
    })
  }
  
  return (
          <div className="App">
            <header className="App-header">
              <button onClick={() => { btnDistance() } }>Validate distance {Dist}</button>
            </header>
          </div>
          )

  /*
  render() {
      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {
              !this.props.isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation</div>
              ) : !this.props.isGeolocationEnabled ? (
                  <div>Geolocation is not enabled</div>
              ) : this.props.coords ? (

                <table>
                    <tbody>
                        <tr>
                            <td>latitude</td>
                            <td>{this.props.coords.latitude}</td>
                        </tr>
                        <tr>
                            <td>longitude</td>
                            <td>{this.props.coords.longitude}</td>
                        </tr>
                        <tr>
                            <td>altitude</td>
                            <td>{this.props.coords.altitude}</td>
                        </tr>
                        <tr>
                            <td>heading</td>
                            <td>{this.props.coords.heading}</td>
                        </tr>
                        <tr>
                            <td>speed</td>
                            <td>{this.props.coords.speed}</td>
                        </tr>
                    </tbody>
                </table>

              ) : (
                <div>Getting the location data&hellip; </div>
              )
            }
          </p>
        </header>
      </div>
    )
  }
}*/

/*
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(App);
*/

}

export default App;