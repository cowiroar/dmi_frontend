
import { MapContainer, TileLayer, Popup, LayersControl, CircleMarker, FeatureGroup } from 'react-leaflet'
import { useFetch } from './useFetch';
import './App.css';
import SensorFilter from './sensorFilter';
import { useState, useEffect } from 'react';

const position = [55.505, 12]
function App() {

  const [ activeStation, setActiveStation ]= useState(null)
  const [ selectedStations, setSelectedStations ] = useState([])

  const {data,loading,error} = useFetch('https://dmigw.govcloud.dk/v2/metObs/collections/station/items?api-key=7b2b833c-8585-459c-b310-6ca8908ac616')
  let dataFiltered = []
  const [ selectedFilters, setSelectedFilters ] = useState([])

if(error){
   console.log(error)
}


if(data){
  dataFiltered = data.features.filter((station) => station.geometry.coordinates.every(element => element !== null))
  console.log(selectedFilters)
}

  return (
  
    <>
    <SensorFilter data={dataFiltered} setSelectedFilters={setSelectedFilters} currentFilter={selectedFilters} selected={selectedStations} setSelected={setSelectedStations}/>
    <div>
       {
        loading && <div> Fetching data from DMI </div>
      }
      {data &&
          <div className="App">
          <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayersControl position="topright">
        <LayersControl.Overlay name="Meterologiske Observationer">
            <FeatureGroup >
            {    
                  dataFiltered.map( station => {
                    let color = "purple"
                    const isSelected = selectedStations.includes(station.id)
                    if(isSelected) color ="green"
                    return (selectedFilters.length === 0 ||  selectedFilters.every(filter => station.properties.parameterId.includes(filter))) &&
                     <CircleMarker key={station.id} center={[station.geometry.coordinates[1], station.geometry.coordinates[0]]}  pathOptions={{ color: color }}

                    eventHandlers={{
                      click: (e) => {
                        setActiveStation(station)
                      },}}
                    />}
                  )                    
              }
                    
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
              {activeStation && 
              <Popup position={[activeStation.geometry.coordinates[1],activeStation.geometry.coordinates[0]]}> 
              <div>
              <h2>{activeStation.properties.name}</h2>
              <p>{activeStation.properties.parameterId}</p>
              {selectedStations.includes(activeStation.id) &&
              <button onClick={() => {setSelectedStations(selectedStations.filter((id)=> id !== activeStation.id ))}}>Remove station</button>
              }
              {!selectedStations.includes(activeStation.id) &&
              <button onClick={() => {setSelectedStations([...selectedStations,activeStation.id])}}>Add station</button>
              }
              </div>
              </Popup>}
      </MapContainer>
  
        </div>
      }   
    </div>
    
  </>);
}

export default App;




/*<>
    <div className="App">
      <MapContainer center={position} zoom={7} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    


    <LayersControl position="topright">

    <LayersControl.Overlay name="Feature group">
        <FeatureGroup pathOptions={{ color: 'purple' }}>
          
    

        </FeatureGroup>
      </LayersControl.Overlay>
    
    </LayersControl>




  </MapContainer>

  
     
    </div>
    </>*/