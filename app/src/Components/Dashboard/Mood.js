import { Component } from 'react';
import { Typography, Link, createMuiTheme, ThemeProvider, Container, 
    Grid, Paper, Box,  
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Project Eudaimonia
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

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
        marginTop: theme.spacing(20),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    main: {
        padding: theme.spacing(10)
    }
}));

export default function Mood() {
    const classes = useStyles();
    return(
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Container className={classes.main}>
                    <Typography variant='h2'>
                        Mood Page
                    </Typography>
                </Container>
                <Copyright/>
            </div>
        </ThemeProvider>
    )
}
