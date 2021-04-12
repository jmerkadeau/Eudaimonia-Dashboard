import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
import { Box } from '@material-ui/core';


// Main page for the data section but all the work is done in other files
class Friends extends React.Component {
  constructor(props) {
    super(props);
  };




  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='web' ></div>
      </ThemeProvider>
    )
  }
}
export default Friends;
