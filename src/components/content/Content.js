import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Reaction from "../reaction/Reaction"

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    fontSize: '16px',
    border: '1px solid #000000',
    borderRadius: '10px',
    padding: '5px'
  },
  header: {
    fontSize: '22px',
    fontWeight: 600
  },
  topMargin: {
    marginTop: '10px'
  },
  iconRow: {
    alignItems: 'flex-start',
    display: 'flex'
  }
}));

const Content = () => {
    const classes = useStyles();

    return(
      <div>
        <Grid container alignItems="center">
          <Grid item md={2}></Grid>
          <Grid item xs={12} md={8} className={classes.root}>
            <span className={classes.header}>This is content 1.</span>
            <p className={classes.topMargin}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <Reaction contentID={1} />
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
        <Grid container alignItems="center" className={classes.topMargin}>
          <Grid item md={2}></Grid>
          <Grid item xs={12} md={8} className={classes.root}>
            <span className={classes.header}>This is content 2.</span>
            <p className={classes.topMargin}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <Reaction contentID={2} />
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </div>
    )
}

export default Content