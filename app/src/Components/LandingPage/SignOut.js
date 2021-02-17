import React from 'react';
import { auth } from '../../Data/Firebase.js';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";



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
    <Button variant='contained' color='primary' onClick={sendHome}>
      Sign Out
    </Button>
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