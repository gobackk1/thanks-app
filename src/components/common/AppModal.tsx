import React, { HTMLAttributes } from 'react'
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  makeStyles,
  createStyles,
  Typography
} from '@material-ui/core'

type Props = {
  title: string
  renderButton: (props: { onClick: () => void }) => JSX.Element
}

export const AppModal: React.FC<Props> = ({ children, title, renderButton }) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const styles = useStyles()

  const props = React.useMemo(() => ({ onClick: () => setOpen(true) }), [])

  return (
    <div>
      {renderButton(props)}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        className={styles.modal}
      >
        <Fade in={open}>
          <div className={styles.paper}>
            <Typography variant="h4">{title}</Typography>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

const useStyles = makeStyles(theme =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
)
