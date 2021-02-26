import React from 'react';
import { loadReactions } from '../../redux/actions/emoji';
import { selectEmo, unselectEmo } from '../../redux/actions/selection';
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "../tooltip/Tooltip";
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    position: 'relative'
  },
  // emoButton: {
  //   height: '32px',
  //   width: '32px',
  //   background: '#FFFFFF',
  //   border: '1px solid #e0e0e0',
  //   borderRadius: '24px',
  //   cursor: 'pointer',
  //   position: 'absolute'
  // },
  emoList: {
    padding: '5px 4px 10px 20px',
    background: '#FFFFFF',
    border: '1px solid #e0e0e0',
    borderRadius: '25px',
    cursor: 'pointer',
    position: 'absolute',
    bottom: '5px',
    zIndex: 1,
    textAlign: 'center'
  },
  emoName: {
    background: '#161616',
    borderRadius: '25px',
    padding: '12px 16px',
    fontSize: '12px',
    color: '#FFFFFF'
  },
  emoButton: {
    height: '32px',
    width: '32px',
    alignItems: 'center',
    background: '#FFFFFF',
    border: '1px solid #e0e0e0',
    borderRadius: '24px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute'
  }
}));

const NiftyMenu = (props) => {
  const { emoji, dispatch, selection, openEmo, contentID } = props
  const classes = useStyles()
  const [arr, setArr] = React.useState([])
  const [initial, setInitial] = React.useState(true)

  const [thisSelection, setSelection] = React.useState(null)

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

  if((!emoji.default) && (initial)) {
    let test = []
    emoji.map((emo) => {
      return test.push(emo)
    })
    setArr(test)
    setInitial(false)
  }

  const buttonClicked = (emo) => {
    if((thisSelection) && (thisSelection.name === emo.name)){
      dispatch(unselectEmo(contentID, emo))
    }
    else {
      dispatch(selectEmo(contentID, emo))
    }
    openEmo()
  }

  return (
    <div className={classes.emoList}>
      {(arr.length > 0) && <div className="row">
        {arr.map((a) => {
          return (
            <Tooltip content={a.name} direction="top" key={a.id}>
              <span className="emo" role="img" onClick={() => buttonClicked(a)}>
                {a.emoji}
              </span>
            </Tooltip>
          )
        })}
      </div>}
    </div>
  )
}

const NiftyButton = (props) => {
  const classes = useStyles()
  const someClick = () => {
    props.openEmo()
  }

  return (
    <div className={classes.emoButton} onClick={someClick}>
      <TagFacesIcon />
    </div>
  )
}

const Nifty = (props) => {
  const classes = useStyles();
  const { dispatch, emoji, selection, contentID, reactions } = props
  const [emo, setEmo] = React.useState(false)
  const buttons = []

  const handleOpenEmo = () => {
    if(emo === false) {
      if(emoji.default)
        dispatch(loadReactions())
    }
    setEmo(!emo)
  }

  if((emo) && (!emoji.default) && (emoji.length > 0)) {
    buttons.push(<NiftyMenu key="menu"  dispatch={dispatch} emoji={emoji} selection={selection} contentID={contentID} openEmo={handleOpenEmo} />);
  }

  buttons.push(<NiftyButton key="button" openEmo={handleOpenEmo}/>)
  
  return(
    <div>
      {(!reactions.null) && <div className={classes.root}>
        {reactions[contentID] && <span>{buttons}</span>}
      </div>}
    </div>
  )
}

const mapStateToProps = state => ({
  emoji: state.emoji,
  selection: state.selection,
  reactions: state.reactions
})

export default connect(mapStateToProps)(Nifty)