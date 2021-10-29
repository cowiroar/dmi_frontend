import './App.css';
import { useState } from 'react';
import CheckboxFilter from './checkboxFilter';

function SensorFilter(props) {

let listOfSensors = []

const generateURL = () => {
    const baseURL = "http://dataforcowi.python.cowi.net/"
    const metobs = "dmi_metobs/"
    let query = ""
    let sensorParameter = props.currentFilter.length > 0 ?`?parameterId=${props.currentFilter.join()}` : "";
    
    const select = props.data.filter((station) => props.selected.includes(station.id))
    select.map((station) => {
        return query += metobs + station.properties.stationId + "/"
    })
    if(props.selected.length > 1) return baseURL+"~multidownload/"+query+sensorParameter
    if(props.selected.length === 1) return baseURL+query+sensorParameter
    else return "Vælg en station for at generere et endpoint"
}

const addFilter = (value) =>{
    props.setSelectedFilters([...props.currentFilter, value]);
    props.setSelected([])
}

const removeFilter = (value) =>{
    const newTodos = props.currentFilter.filter((t) => t !== value);
    props.setSelectedFilters(newTodos);
}

props.data.forEach((station)=>{
    listOfSensors = listOfSensors.concat(station.properties.parameterId)
})
//List of Unique Sensor types
listOfSensors = [...new Set(listOfSensors)]

  return (

  <div>
        <p>Der er {listOfSensors.length} unikke sensortyper</p>
        {listOfSensors.map((sensor,i)=>
        <CheckboxFilter label={sensor} value={sensor} addFilter={addFilter} removeFilter={removeFilter} key={i}/>
    )}

    <p><a href={generateURL()} target="_blank">{generateURL()}</a></p>
  </div>)
    
}



export default SensorFilter;
