import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../login/login'
import Signup from '../signup/signup';
import { flexbox } from '@mui/system';

const SignInOutContainer=()=>{
const [value, setValue]=useState(0)
const handleChange = (event, newValue) =>{
    setValue(newValue);
};
const paperStyle={width: "500px", margin: "30px auto"}


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
    return(
    <Paper elevation={10} style={paperStyle}>    
    <Tabs  value={value} indicatorColor="primary" onChange={handleChange} aria-label="disabled tabs example">
      <Tab style={{width: '50%'}} label="Sign in" />
      
      <Tab style={{width: '50%'}} label="Sign up" />
    </Tabs>
    <TabPanel value={value} index={0} >
        <Login handleChange={handleChange}/>
    </TabPanel>
    <TabPanel value={value} index={1} >
        <Signup />
    </TabPanel>
    </Paper>
    )
}

export default SignInOutContainer;