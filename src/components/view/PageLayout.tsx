import React from 'react'
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  makeStyles,
  CssBaseline
} from '@material-ui/core'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import RedeemRoundedIcon from '@material-ui/icons/RedeemRounded'
import { useHistory } from 'react-router-dom'

const list = [
  { text: 'ホーム', icon: <HomeRoundedIcon />, path: '/' },
  { text: 'リワード', icon: <RedeemRoundedIcon />, path: '/rewards' }
]

export const PageLayout: React.FC = ({ children }) => {
  const styles = useStyles()
  const history = useHistory()

  return (
    <div className={styles.root}>
      {/* <AppBar position="fixed">
        <Toolbar></Toolbar>
      </AppBar> */}
      <Drawer
        className={styles.drawer}
        classes={{ paper: styles.drawerPaper }}
        variant="permanent"
        anchor="left"
      >
        <div>check</div>
        <CssBaseline />
        <List>
          {list.map(({ text, icon, path }, i) => (
            <ListItem button key={i} onClick={() => history.push(path)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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
