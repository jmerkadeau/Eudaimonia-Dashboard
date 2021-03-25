import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { auth } from '../../Data/Firebase.js';
import { useHistory } from "react-router-dom";
import App from "../../App.js"
export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);
  // let history = useHistory();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    auth.signOut().then(() => {
      console.log('sign out succesful')
    }).catch((error) => {
      console.log(error);
    });
    // history.push('/');
    return (<App></App>);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"No Chrome Extension Detected"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please download the Project Eudaimonia Chrome Extension first to enable mood logging and web tracking capabilities.
            Use the same Google account to login for both, come back here, and view your data!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}