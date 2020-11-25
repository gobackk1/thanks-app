import React from 'react'
import {
  makeStyles,
  Modal as MuiModal,
  Fade,
  Backdrop,
  IconButton,
  TextField,
  Button
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import * as UpdateUserModal from '@/context/UpdateUserModalContext'
import { useForm } from 'react-hook-form'
import { useFirebase } from '@/hooks'

export const UpdateUserModalProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState<any>({ name: 'default' })
  const styles = useStyles()
  const { errors, register, reset, setValue, handleSubmit } = useForm()
  const { updateUser } = useFirebase()

  React.useEffect(() => {
    reset()
  }, [reset])

  const handleClose = () => {
    setOpen(false)
  }

  const openUpdateUserModal = (user: any) => {
    setOpen(true)
    setState(user)
  }

  React.useEffect(() => {
    register({ name: 'name' })
  }, [register])

  React.useEffect(() => {
    setValue('name', state.name)
  }, [setValue, state])

  // useEventListener('onDispatchCloseModal', () => {
  //   //NOTE: Modalを閉じるため
  //   const backdrops = document.querySelectorAll('.MuiBackdrop-root')
  //   if (backdrops)
  //     [].forEach.call(backdrops, (backdrop: HTMLElement) => {
  //       if (backdrop) backdrop.click()
  //     })
  // })

  const handle = React.useCallback(
    (value: any) => {
      updateUser({ ...state, name: value.name })
    },
    [state, updateUser]
  )

  return (
    <>
      <MuiModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        keepMounted
        className={styles.root}
      >
        <Fade in={open}>
          <div className="AppCreateBoardModalContextProvider-inner">
            <IconButton
              size="small"
              onClick={handleClose}
              className="AppCreateBoardModalContextProvider-button-close"
            >
              <Close />
            </IconButton>
            <form onSubmit={handleSubmit(handle)}>
              <TextField
                name="name"
                inputRef={register}
                error={!!errors.name}
                type="text"
                label="ユーザー名"
                helperText={errors.name?.message}
                variant="filled"
                required
                fullWidth
              />
              <Button type="submit">submit</Button>
            </form>
          </div>
        </Fade>
      </MuiModal>
      <UpdateUserModal.Context.Provider value={{ openUpdateUserModal }}>
        {children}
      </UpdateUserModal.Context.Provider>
    </>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .AppCreateBoardModalContextProvider-inner': {
      position: 'relative'
    },
    '& .AppCreateBoardModalContextProvider-button-close': {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1
    }
  }
})
