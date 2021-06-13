import React, {useState} from 'react';

const isValid = (value, min, max) =>
  value !== '' &&
  value !== '-' &&
  (min === undefined || value >= min) &&
  (max === undefined || value <= max);

const NumericInput = ({ value, placeHolder, min, max, onChange }) => {
  const regexp = new RegExp(`^-?[0-9]*$`);
  const [nValue, setNValue] = useState(value);
  const [valid, setValid] = useState(isValid(value, min, max));
  return (
    <input type="text"
           className={ valid ? '' : 'invalid' }
           placeholder={placeHolder}
           value={ nValue }
           onChange={ (event) => {
             const newValue = event.target.value;
             if (regexp.test(newValue)) {
               setNValue(newValue);
               let newValid = isValid(newValue, min, max);
               setValid(newValid);
               if (newValid) {
                 onChange(newValue);
               }
             }
           } }
           onBlur={ () => {
             if (nValue < min) {
               setNValue(min);
             } else if (nValue > max) {
               setNValue(max);
             } else {
               setNValue(value);
             }
             setValid(true);
           } }
    />
  );
};

export default NumericInput;