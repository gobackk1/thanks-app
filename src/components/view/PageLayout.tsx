import React from 'react'
import { Drawer, List, ListItemIcon, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import RedeemRoundedIcon from '@material-ui/icons/RedeemRounded'
import { useHistory } from 'react-router-dom'
import * as LoginUser from '@/context/LoginUserContext'
import { useAuthentication } from '@/hooks'

const list = [
  { text: 'ホーム', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'リワード', icon: <RedeemRoundedIcon />, path: '/rewards' }
]

export const PageLayout: React.FC = ({ children }) => {
  const styles = useStyles()
  const history = useHistory()
  useAuthentication()
  const [state] = React.useContext(LoginUser.Context)
  console.log(state, 'PageLayout')
  return (
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
              // currentuser contextを作って出し分ける
              <ListItem button key={i} onClick={() => history.push(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {state.isAdmin && 'admin用リンク'}
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
  }
})
