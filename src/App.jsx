import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState([
    { field: 'Name', value: '' },
    { field: 'Email', value: '' },
    { field: 'Age', value: '' },
  ]);

  const handleEdit = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].editable = !updatedInputs[index].editable;
    setInputs(updatedInputs);
    // console.log(inputs);
  };

  const handleChange = (index, newValue) => {
    console.log(newValue.target.id);
    const updatedInputs = [...inputs];
    if (newValue.target.id ==="lab"){
    updatedInputs[index].field = newValue.target.value;
    setInputs(updatedInputs);
  }
  else{
    updatedInputs[index].value = newValue.target.value
    setInputs(updatedInputs);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      const updatedInputs = [...inputs];
      updatedInputs[index].editable = false;
      setInputs(updatedInputs);
    }
  };

  const handleAddField = () => {
    setInputs([...inputs, { field: 'New Field', value: '' }]);
  };

  return (
    <>
      <h1>Form</h1>
      {inputs.map((item, index) => (
        <div key={index}>
          <label
            onDoubleClick={() => handleEdit(index)}
            style={{ cursor: 'pointer' }}
          >
            {item.editable ? (
              <input
                type="text"
                id="lab"
                value={item.field}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ) : (
              item.field
            )}
          </label>
          <div>
            <input
              placeholder={`Enter your ${item.field}`}
              value={item.value}
              onChange={(e) => handleChange(index, e)}
            />
            <button 
  onClick={() =>  navigator.clipboard.writeText(`${item.value}`)}
>
  Copy
</button>
          </div>
          <br />
        </div>
      ))}
      <button onClick={handleAddField}>Add Field</button>
    </>
  );
}

export default App;