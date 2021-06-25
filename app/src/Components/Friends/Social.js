import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
import {
  Grid, TextField, Typography, Link, Container, Button, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardHeader, CardContent
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { getUsers, getFriends, getUserFromUID, getFriendMoodData, getFriendWebTime }
  from "../../Data/UserData.js";
import { date } from './../../Data/GetDate.js';



import FriendMoodsPie from './FriendMoodsPie';
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
class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchName: "", results: [], friends: [], requests: [], userUid: props.user.uid, friendsMoodData: {}, friendsWebTime: {} };
    // console.log(props.user.uid);
    // console.log(props.webLog);
  };
  async componentDidMount(props) {
    const friendStatuses = await getFriends();
    // console.log(friendStatuses);
    var friends = [];
    var requests = [];
    var friendsMoodData = {};
    var friendsWebTime = {};

    // var uid = "2sZGRgNqIbhNpdkiEgzCAtT4ItE2";
    // var friendData = await getFriendWebTime(uid);
    // console.log(friendData);
    // if (date in friendData) {
    //   let todayData = friendData[date];
    //   console.log(todayData);
    //   // return todayData
    // }

    for (let friend_uid in friendStatuses) {
      // console.log(friend_uid, friendStatuses[friend_uid]);
      var friend_data = await getUserFromUID(friend_uid);
      if (friendStatuses[friend_uid] === 3) {
        friendsMoodData[friend_uid] = await getFriendMoodData(friend_uid);
        friendsWebTime[friend_uid] = await getFriendWebTime(friend_uid);
        friends.push(friend_data);
      } else if (friendStatuses[friend_uid] === 2) {
        requests.push(friend_data);
      }
      // friend_data["status"] = friendStatuses[friend_uid];
      // console.log(friend_data);
      // friends.push(friend_data);
    }


    function sortFriendsByLogged(a, b) {
      function moodCountForSort(uid) {
        if (uid in friendsMoodData && date in friendsMoodData[uid]) {
          let moodData = friendsMoodData[uid][date];
          return Object.keys(moodData).length;
        }
        return 0
      }
      // console.log(moodCountForSort(a.uid), moodCountForSort(b.uid));
      return moodCountForSort(b.uid) - moodCountForSort(a.uid);
    }

    // console.log(friends);
    friends.sort(sortFriendsByLogged);
    // console.log(friends);

    this.setState({
      friendStatuses: friendStatuses, friends: friends, requests: requests, friendsMoodData: friendsMoodData,
      friendsWebTime: friendsWebTime
    });
    // console.log("Friends Loaded");
    // console.log(friendStatuses);
    // console.log(friendStatuses);
    // console.log(friendsMoodData);
    console.log(friendsWebTime);

    // console.log(friends);
    // console.log(requests);

    // orderedMoods.sort(compareFrequency);



  }

  async handleSubmit() {
    // console.log('handleSubmit');
    // console.log(event);
    // console.log(this.state.searchName);
    var users = await getUsers(this.state.searchName);
    users = users.filter(obj => {
      return obj.uid !== this.state.userUid
    });
    console.log(users);
    this.setState({ results: users });
    // console.log(users);
  }

  getMoodCount(uid) {
    if (uid in this.state.friendsMoodData && date in this.state.friendsMoodData[uid]) {
      let moodData = this.state.friendsMoodData[uid][date];
      return Object.keys(moodData).length;
    }
    return 0
  }



  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Container className={classes.container}>
            <Grid container className={classes.moodGrid}>
              {/* <Grid item xs={12} sm={12} className={classes.card}>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                  <TextField id="standard-basic" label="Look for Friends" onInput={e => this.setState({ searchName: e.target.value })}></TextField>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.card}>
                <Button variant="contained" color="primary" onClick={() => { this.handleSubmit() }}>
                  Search
                </Button>
              </Grid> */}

              {/* Table for Friends */}
              <Typography color={'primary'} variant='h5' className={classes.pieTitle}>
                Feed
              </Typography>
              <Grid item xs={12} sm={12} className={classes.card}>
                {this.state.friends.map((elem) => (
                  <Grid item xs={6} key={this.state.friends.indexOf(elem)}>
                    <Card>
                      <CardHeader
                        title={`${elem.username}`}
                        avatar={
                          <Avatar alt={elem.name} src={elem.photoUrl} />}
                        subheader={`Web Activity: ${this.state.friendsWebTime[elem.uid]['h']}h ${this.state.friendsWebTime[elem.uid]['m']}m`}
                      />

                      <CardContent>
                        Moods Logged: {this.getMoodCount(elem.uid)}
                        <FriendMoodsPie moodData={this.state.friendsMoodData[elem.uid]}></FriendMoodsPie>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                {/* <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Photo</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Moods</TableCell>
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
                          <TableCell align="right">
                            <FriendMoodsPie moodData={this.state.friendsMoodData[row.uid]}></FriendMoodsPie>

                          </TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer> */}
              </Grid>


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
export default withStyles(styles, { withTheme: true })(Social);
