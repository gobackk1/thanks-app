import React from 'react'
import { Drawer, List, ListItemIcon, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import RedeemRoundedIcon from '@material-ui/icons/RedeemRounded'
import { useHistory } from 'react-router-dom'
import * as LoginUser from '@/context/LoginUserContext'
import { useAuthentication, useFirebase, useUsersState } from '@/hooks'
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded'
import ImportContactsRoundedIcon from '@material-ui/icons/ImportContactsRounded'
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded'
import { LoadingSpinner } from '../common'

const list = [
  { text: 'ホーム', icon: <HomeRoundedIcon />, path: '/company' },
  { text: 'リワード', icon: <RedeemRoundedIcon />, path: '/rewards' }
]

const adminList = [
  { text: 'ユーザー', icon: <PeopleRoundedIcon />, path: '/manage/users' },
  { text: 'カタログ', icon: <ImportContactsRoundedIcon />, path: '/manage/rewards/catalog' },
  { text: 'オーダー', icon: <ListAltRoundedIcon />, path: '/manage/rewards/orders' }
]

export const PageLayout: React.FC = ({ children }) => {
  const { subscribeUsers, subscribeMessages } = useFirebase()
  const styles = useStyles()
  const history = useHistory()
  const [state] = React.useContext(LoginUser.Context)
  const { currentUser } = useUsersState()

  useAuthentication()
  React.useEffect(() => {
    subscribeUsers()
    subscribeMessages()
  }, [subscribeUsers, subscribeMessages])

  return state.isLoggingIn ? (
    <div className={styles.spinner}>
      <LoadingSpinner />
    </div>
  ) : (
    <div className={styles.root}>
      {state.uid && (
        <Drawer
          className={styles.drawer}
          classes={{ paper: styles.drawerPaper }}
          variant="permanent"
          anchor="left"
        >
          <List>
            {list.map(({ text, icon, path }, i) => (
              <ListItem button key={i} onClick={() => history.push(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {state.isAdmin &&
            adminList.map(({ text, icon, path }, i) => (
              <ListItem button key={i} onClick={() => history.push(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          {currentUser?.name}
        </Drawer>
      )}

      <main className={styles.main}>{children}</main>
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  drawer: {
    width: 240,
    flexShrink: 0
  },
  main: {
    flexGrow: 1,
    padding: 10
  },
  drawerPaper: {
    width: 240
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center'
  }
})
