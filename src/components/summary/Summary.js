import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";

import SummaryTab from "./SummaryTab";
import { loadUserReactions } from '../../redux/actions/userReactions';
import { loadUsers } from '../../redux/actions/users';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '32px',
    width: '48px',
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #e0e0e0',
    borderRadius: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '12px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  selected: {
    background: '#edf5ff',
    border: '1px solid #0f62fe'
  },
  rowDetail: {
    alignItems: 'flex-start',
    display: 'flex'
  },
  leftMargin: {
    marginLeft: 5
  }
}));

const Summary = (props) => {
  const classes = useStyles();
  const { selection, reactions, dispatch, contentID, users }  = props
  const [open, setOpen] = React.useState(false)
  const [thisSelection, setSelection] = React.useState(null)

  useEffect(() => {
    if((!selection.null) && (selection[contentID])) {
      if(!selection[contentID].default) {
        setSelection(selection[contentID])
      }
      else {
        setSelection(null)
      }
    }
    dispatch(loadUserReactions(contentID))
  }, [selection])

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return(
    <div>
      {(!reactions.null) && <div>
        {(reactions[contentID]) && <div className={clsx({[classes.root]: true, [classes.selected]: (thisSelection) ? true : false})} onClick={openModal}>
          <span className={classes.rowDetail}>
            {(!thisSelection) && (reactions[contentID].length > 0) && <span>{reactions[contentID].length}</span>}
            {(thisSelection) && <div>
              {(reactions[contentID].length > 0) && reactions[contentID].length + 1}
              <span role="img" className={classes.leftMargin}>
                {thisSelection.emoji}
              </span>
            </div>}
          </span>
        </div>}
        {open && <SummaryTab open={open} handleClose={closeModal} contentID={contentID} />}
      </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  selection: state.selection,
  reactions: state.reactions,
  users: state.users
})

export default connect(mapStateToProps)(Summary)