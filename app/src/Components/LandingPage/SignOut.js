import React from 'react';
import { auth } from '../../Data/Firebase.js';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js'



// class SignOut extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const signOut = async (e) => {
//       e.preventDefault();

//       // your firebase code here
//       await auth.signOut().then(() => {
//         console.log('sign out succesful')
//       }).catch((error) => {
//         console.log(error);
//       });

//       let history = useHistory();
//       history.push("/");
//     };
//     return(
//       <Button variant='contained' onClick={signOut}>
//         Sign Out
//       </Button>
//     )
//   }
// }
// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#347aeb",
//       light: "#3d7feb"
//     }
//   }
// });

function SignOut() {
  let history = useHistory();

  function sendHome() {
    auth.signOut().then(() => {
      console.log('sign out succesful')
    }).catch((error) => {
      console.log(error);
    });
    history.push('/');
  }

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button variant='contained' color='primary' onClick={sendHome}  style={{ "color": theme.palette.common.white }}>
        Sign Out
      </Button>
    </ThemeProvider>
  );
}

// const SignOut = () => {
//     auth.signOut().then(() => {
//       console.log('sign out succesful')
//     }).catch((error) => {
//       console.log(error);
//     });
// }

export default SignOut;