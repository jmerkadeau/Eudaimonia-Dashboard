import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { checkUsernameExists, setUsername } from './../../Data/UserData.js';

export default function UsernameDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [textField, setTextField] = React.useState("");

  const _onTextFieldChange = (e) => {
    setTextField(e.target.value);
    // console.log(e.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    var usernameExists = await checkUsernameExists(textField);
    console.log(usernameExists);
    if (usernameExists === false) {
      console.log("set username");
      setUsername(textField);
      setOpen(false);
      props.changeUsernameStatusFunc(true);
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick={true} disableEscapeKeyDown={true}>
        <DialogTitle id="form-dialog-title">Choose Username</DialogTitle>
        <DialogContent>
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
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button onClick={handleClose} color="primary">
            Choose Username
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}