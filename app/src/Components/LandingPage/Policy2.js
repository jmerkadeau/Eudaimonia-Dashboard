import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Typography, Container, Link, List, ListItem, ListItemText } from '@material-ui/core';

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
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
    },
    bold: {
        fontSize: 16,
        fontWeight: 600,
    },
    indent: {
        textIndent: theme.spacing(2),
        fontSize: 16,
    }
    
}));

export default function Policy2() {
    const classes = useStyles();
    return(
        <ThemeProvider theme={theme}>
            <div>
                <Container className={classes.container}>
                    <Typography variant='h5'>
                        Privacy Policy
                    </Typography>
                    <br/>
                    <Typography paragraph>
                        The use of information received from Project Eudaimonia 
                        will adhere to the <a href='https://developer.chrome.com/docs/webstore/program_policies/'>Chrome Web Store User Data Policy</a>, 
                        including the <a href='https://developer.chrome.com/docs/webstore/program_policies/#limited_use'>Limited Use</a> requirements.
                    </Typography>
                    <Typography paragraph>
                        Project Eudaimonia collects web browsing activity to use 
                        for statistical analysis when correlating with mood logging data.  
                        Our use of user data is limited to the project’s sole purpose of 
                        helping users better understand the role of web usage in their 
                        moods and mental-health.
                    </Typography>
                    <Typography paragraph>
                        Complying with the Chrome Web Store User Data Policy, 
                        Project Eudaimonia will only transfer user data to third parties 
                        if necessary to providing our single purpose; to comply with applicable laws; 
                        to protect against malware, spam, phishing, or other fraud or abuse; 
                        or as part of a merger, acquisition or sale of assets of the developer 
                        after obtaining explicit prior consent from the user. Other than these 
                        limited reasons, there will be no other transfers, users, or sale of user data. 
                    </Typography>
                    <Typography class={classes.bold}>
                        Finally, human agents acting on part of Project Eudaimonia 
                        will not be able to read user data unless:
                        <List>
                            <ListItem>
                                <ListItemText primary='1. The user’s explicit consent to read specific data 
                                (for example, helping an user reset parts of their data for analysis) is obtained.'/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary='2. The data is aggregated and anonymized and used for internal 
                                operations in accordance with applicable privacy and other jurisdictional legal requirements.'/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary='3. It’s necessary for security purposes (for example, investigating abuse).'/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary='4. Or to comply with applicable laws.'/>
                            </ListItem>
                        </List> 
                    </Typography>
                </Container>
                <Copyright/>
            </div>
        </ThemeProvider>
    )
}