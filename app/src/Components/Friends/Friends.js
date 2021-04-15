import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';
import {
  Grid, TextField, Typography, Link, Container, Button, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { getUsers } from "../../Data/UserData.js";

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
  infoText: {

  },
  centerPieCharts: {

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
  moodGrid: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'stretch'
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
    this.state = { searchName: "", results: [] };
  };

  async handleSubmit() {
    // console.log('handleSubmit');
    // console.log(event);
    console.log(this.state.searchName);
    const users = await getUsers(this.state.searchName);
    this.setState({ results: users });
    console.log(users);
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
                      {this.state.results.map((row) => (
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
