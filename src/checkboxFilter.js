import { useState } from 'react';

const CheckboxFilter = ({ label, value, addFilter, removeFilter }) => {
    const [checked, setChecked] = useState(false);
   
    const handleChange = () => {
        if(!checked) addFilter(value)
        if(checked) removeFilter(value)
        setChecked(!checked);
    };
   
    return (
    <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        {label}
      </label>
    );
  };
   

  export default CheckboxFilter