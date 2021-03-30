import React from "react";
import { Grid, Icon, Button, useMediaQuery, Container, Typography, ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#347aeb",
      light: "#3d7feb"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  rightText: {
    paddingRight: theme.spacing(10),
  }
}));

const Definition = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Typography className={classes.word}>

        </Typography>
        <Typography className={classes.def}>

        </Typography>

      </Grid>
    </ThemeProvider>
  )
}