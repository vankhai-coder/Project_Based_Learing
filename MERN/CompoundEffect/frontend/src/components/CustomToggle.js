import React from 'react'
import { useAccordionButton } from 'react-bootstrap';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
  
    return (
      <button
        type="button"
        style={{ backgroundColor: '#00b14f' }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

export default CustomToggle