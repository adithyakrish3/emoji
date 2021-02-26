import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Nifty from "../nifty/Nifty";
import Summary from "../summary/Summary";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  },
  iconRow: {
    alignItems: 'flex-start',
    display: 'flex'
  }
}));

const Reaction = (props) => {
  const { contentID } = props
  const classes = useStyles();

  return(
    <div className={classes.iconRow}>
      <Summary contentID={contentID} />
      <Nifty contentID={contentID} />
    </div>
  )
}

export default Reaction