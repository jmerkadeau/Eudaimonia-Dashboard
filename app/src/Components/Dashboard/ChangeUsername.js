import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Collapse, IconButton } from '@material-ui/core';

import { auth } from './../../Data/Firebase.js';
import { checkUsernameExists, setUsername } from './../../Data/UserData.js';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

export default function ChangeUsername(props) {
  const [open, setOpen] = React.useState(false);
  const [textField, setTextField] = React.useState("");
  const name = auth.currentUser.displayName;
  const email = auth.currentUser.email;
  // console.log(auth.currentUser);

  const [takenAlertOpen, setTakenAlertOpen] = React.useState(false);

  const _onTextFieldChange = (e) => {
    setTextField(e.target.value);
    // console.log(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    var usernameExists = await checkUsernameExists(textField);
    // console.log(usernameExists);
    if (usernameExists === false) {
      // console.log("set username");
      setUsername(textField);
      setOpen(false);
      // props.changeUsernameStatusFunc(true);
    } else {
      setTakenAlertOpen(true);
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Username</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Account: {name} ({email})
          </DialogContentText>
          <DialogContentText>
            Please enter an unique username your friends can find you by.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="username"
            fullWidth
            onChange={_onTextFieldChange}
          />
        </DialogContent>
        <Collapse in={takenAlertOpen}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setTakenAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            <AlertTitle>Username Taken</AlertTitle>
  This username has been taken already — <strong>try something else!</strong>
          </Alert>
        </Collapse>

        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button onClick={handleClose} color="primary">
            Change Username
          </Button>
        </DialogActions>
      </Dialog >
    </div >
  );
}