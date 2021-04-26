import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
import {
  Grid, TextField, Typography, Link, Container, Button, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { getUsers, sendFriendRequest, getFriends, getUserFromUID, acceptFriendRequest } from "../../Data/UserData.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Project Eudaimonia
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    margin: theme.spacing(5),
    alignItems: 'center',
  },
  paper: {
    // width: 850,
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    display: 'flex',
    // overflow: 'auto',
    flexDirection: 'column',
    // elevation: 3,
  },
  togglePaper: {
    margin: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    elevation: 3,
    alignItems: 'center',
  },
  altpaper: {
    margin: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    elevation: 3,
    alignItems: 'center',
    width: '100%'
  },
  paperDiv: {
    textAlign: 'center',
    overflow: 'auto',
    alignItems: 'center',
    width: '100%'
  },
  infoDiv: {
    // textAlign: 'left',
    overflow: 'auto',
    alignItems: 'left',
    width: '100%',
    // marginLeft: theme.spacing(8)
  },
  fixedHeight: {
    height: 240,
  },
  pieTitle: {
    margin: theme.spacing(2),
    align: 'center',
  },
  graphTitle: {
    margin: theme.spacing(2),
    align: 'center',
    paddingLeft: theme.spacing(8.5),
  },
  centerIt: {
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  bottom: {
    margin: theme.spacing(3),
  },
  flex: {
    display: 'flex',
  },
  grid1: {
    width: 700,
  },
  card: {
    display: 'flex',
    width: '100%'
  },
  divider: {
    background: "primary"
  },
  positivityText: {
    color: theme.palette.grey.A500,
    display: 'flex',
    justifyContent: 'center'
  }
});

// Main page for the data section but all the work is done in other files
class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchName: "", results: [], friends: [], requests: [] };

  };
  async componentDidMount() {
    const friendStatuses = await getFriends();
    // console.log(friendStatuses);
    var friends = [];
    var requests = [];

    for (let friend_uid in friendStatuses) {
      // console.log(friend_uid, friendStatuses[friend_uid]);
      var friend_data = await getUserFromUID(friend_uid);
      if (friendStatuses[friend_uid] === 3) {
        friends.push(friend_data);
      } else if (friendStatuses[friend_uid] === 2) {
        requests.push(friend_data);
      }
      // friend_data["status"] = friendStatuses[friend_uid];
      // console.log(friend_data);
      // friends.push(friend_data);
    }
    // console.log(friends);
    this.setState({ friends: friends, requests: requests });
  }

  async handleSubmit() {
    // console.log('handleSubmit');
    // console.log(event);
    // console.log(this.state.searchName);
    const users = await getUsers(this.state.searchName);
    this.setState({ results: users });
    console.log(users);
  }

  handleSendRequest(x) {
    console.log("send friend request");
    console.log(x);
    sendFriendRequest(x);
  }

  async handleAcceptRequest(x) {
    console.log("accept friend request");
    console.log(x);
    let ret = await acceptFriendRequest(x);
    console.log(ret);
  }


  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Container className={classes.container}>
            <Grid container className={classes.moodGrid}>
              <Grid item xs={12} sm={12} className={classes.card}>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                  <TextField id="standard-basic" label="Look for Friends" onInput={e => this.setState({ searchName: e.target.value })}></TextField>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.card}>
                <Button variant="contained" color="primary" onClick={() => { this.handleSubmit() }}>
                  Search
                </Button>
              </Grid>

              {/* Table for Users */}
              <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                Users
              </Typography>
              <Grid item xs={12} sm={12} className={classes.card}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Photo</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Add Friend</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.results.map((row) => (
                        <TableRow key={row.username}>
                          <TableCell component="th" scope="row">
                            <Avatar alt={row.name} src={row.photoUrl} />
                          </TableCell>
                          <TableCell align="right">{row.username}</TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">
                            <Button variant='contained' color='primary' onClick={(event) => { this.handleSendRequest(row.uid) }}>
                              Send Request
                            </Button>
                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <br />
              <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                Friend Requests
              </Typography>

              {/* Table for Friend Request*/}
              <Grid item xs={12} sm={12} className={classes.card}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Photo</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Request</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.requests.map((row) => (
                        <TableRow key={row.username}>
                          <TableCell component="th" scope="row">
                            <Avatar alt={row.name} src={row.photoUrl} />
                          </TableCell>
                          <TableCell align="right">{row.username}</TableCell>
                          <TableCell align="right">{row.name}</TableCell>
                          <TableCell align="right">
                            <Button variant='contained' color='primary' onClick={(event) => { this.handleAcceptRequest(row.uid) }}>
                              Accept Request
                            </Button>
                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {/* Table for Friends */}
            <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
              Friends
              </Typography>
            <Grid item xs={12} sm={12} className={classes.card}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Photo</TableCell>
                      <TableCell align="right">Username</TableCell>
                      <TableCell align="right">Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.friends.map((row) => (
                      <TableRow key={row.username}>
                        <TableCell component="th" scope="row">
                          <Avatar alt={row.name} src={row.photoUrl} />
                        </TableCell>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Container>
          <div className={classes.bottom}>
            <Copyright />
          </div>
        </div>
      </ThemeProvider >
    )
  }
}
export default withStyles(styles, { withTheme: true })(Friends);
// export default Friends;
