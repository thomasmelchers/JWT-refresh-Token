import React from 'react'
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { Accordion, AccordionSummary, AccordionDetails, Typography,  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./App.css";

const App = () => {
  return (
    <div className='container'>

    <Accordion expanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{backgroundColor: 'lightblue'}}
          
        >
          <Typography className='accordionTitle'>Sign Up</Typography>
        </AccordionSummary>
        <AccordionDetails 
          style={{backgroundColor: 'whitesmoke'}}>
          <SignUp />
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          style={{backgroundColor: 'lightblue'}}
        >
          <Typography className='accordionTitle'>Sign In</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{backgroundColor: 'whitesmoke'}}>
          <SignIn />
        </AccordionDetails>
      </Accordion>
      
      
    </div>
  )
}

export default App;
