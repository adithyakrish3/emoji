import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import _ from "lodash";
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { loadReactions } from '../../redux/actions/emoji';

import ReactionSummary from "./ReactionSummary";

const useStyles = makeStyles( theme => ({
  dialog: {
    overflowY: 'scroll',
    height: '400px',
    padding: '15px'
  },
  title: {
    fontWeight: 600,
    fontSize: '16px'
  }
}))

const EmoTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const EmoTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 25,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover': {
      color: '#000000',
      opacity: 1,
    },
    '&$selected': {
      color: '#000000',
      fontWeight: 600,
    },
    '&:focus': {
      color: '#000000',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />)

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const SummaryTab = (props) => {
  const { open, handleClose, reactions, emoji, selection, dispatch, contentID } = props
  const [value, setValue] = React.useState(0)
  const [data, setData] = React.useState(null)
  const classes = useStyles()

  const [thisSelection, setSelection] = React.useState(null)
  
  console.log(data)

  React.useEffect(() => {
    if((!selection.null) && (selection[contentID])) {
      if(!selection[contentID].default) {
        setSelection(selection[contentID])
      }
      else {
        setSelection(null)
      }
    }
  }, [selection])

  useEffect(() => {
    let test
    if(!emoji.default) {
      emoji.map((emo) => {
        let set = _.filter(reactions[contentID], { reaction_id: emo.id})
        test = {
          ...test,
          [emo.id]: {
            reactions: set,
            count: set.length
          }
        }
        setData(test)
      })
    }
    else {
      dispatch(loadReactions())
    }
  }, [reactions, emoji])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth={true}
    >
      {(data) && <div className={classes.dialog}>
        <span className={classes.title}>Reactions</span>
        {(!thisSelection) && <EmoTabs value={value} onChange={handleChange}>
          <EmoTab label="All" />
          {emoji.map((emo) => {
            return (
              <EmoTab label={emo.emoji + ' ' + data[emo.id].count} role="img" key={emo.id} />
            )
          })}
        </EmoTabs>}
        {(thisSelection) && <EmoTabs value={value} onChange={handleChange}>
          <EmoTab label="All" />
          {emoji.map((emo) => {
            if(emo.name === thisSelection.name) {
              return (
                <EmoTab label={emo.emoji + ' ' + (data[emo.id].count + 1)} role="img" key={emo.id} />
              )
            }
            else {
              return (
                <EmoTab label={emo.emoji + ' ' + data[emo.id].count} role="img" key={emo.id} />
              )
            }
          })}
        </EmoTabs>}
        <TabPanel value={value} index={0}>
          <ReactionSummary emoName={'All'} data={reactions[contentID]} contentID={contentID} />
        </TabPanel>
        {emoji.map((emo) => {
          return (<TabPanel value={value} index={emo.id} key={emo.id}>
            <ReactionSummary emoName={emo.name} data={data[emo.id].reactions} contentID={contentID}/>
          </TabPanel>)
        })}
      </div>}
    </Dialog>
  );
}

const mapStateToProps = state => ({
  selection: state.selection,
  reactions: state.reactions,
  emoji: state.emoji
})

export default connect(mapStateToProps)(SummaryTab)