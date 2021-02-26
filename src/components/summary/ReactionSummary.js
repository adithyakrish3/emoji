import React from 'react';
import _ from "lodash";
import { connect } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: 10
  },
  displayItem: {
    alignItems: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 20
  },
  avatar: {
    height: '24px',
    width: '24px',
    alignItems: 'center',
    background: '#e0e0e0',
    border: '1px solid #000000',
    borderRadius: '50%'
  },
  imageSize: {
    height: '24px',
    width: '24px',
    borderRadius: '50%'
  }
}));

const ReactionSummary = (props) => {
  const classes = useStyles();
  const { selection, emoName, data, users, emoji, contentID }  = props

  const [userData, setUser] = React.useState([])
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

  
  React.useEffect(() => {
    let set = []
    data.forEach((d) => {
      const info = _.find(users, { id: d.user_id})
      const reaction = _.find(emoji, { id: d.reaction_id })
      set.push({
        info,
        reaction: reaction.emoji
      })
    })
    setUser(set)
  }, [users])

  console.log(userData)
  
  return(
    <div>
      {(thisSelection) && ((emoName === 'All') || (emoName === thisSelection.name)) &&
      <div className={classes.root} key={Math.random()}>
        <div className={classes.displayItem}>
          <span className={classes.avatar}></span>
        </div>
        <div className={classes.displayItem}>
          <span role="img">{thisSelection.emoji}</span>
        </div>
        <div className={classes.displayItem}>
          <span>This User</span>
        </div>
      </div>}
      {userData.map((user) => {
        return (
          <div className={classes.root} key={Math.random()}>
            <div className={classes.displayItem}>
              <span className={classes.avatar}>
                <img src={user.info.avatar} className={classes.imageSize} alt="avatar" />
              </span>
            </div>
            <div className={classes.displayItem}>
              <span role="img">{user.reaction}</span>
            </div>
            <div className={classes.displayItem}>
              <span>{user.info.first_name} {user.info.last_name}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  selection: state.selection,
  reactions: state.reactions,
  users: state.users,
  emoji: state.emoji
})

export default connect(mapStateToProps)(ReactionSummary)