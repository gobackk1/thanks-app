import React, { useState, useEffect, SyntheticEvent, useCallback } from 'react'
import {
  Snackbar as MuiSnackbar,
  SnackbarCloseReason,
  SnackbarOrigin
  // Slide
} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import * as Snackbar from '@/context/SnackbarContext'
import * as I from '@/model/interface'
// import { TransitionProps } from '@material-ui/core/transitions'

export const SnackbarProvider: React.FC<Props> = ({ autoHideDuration, children, position }) => {
  const [snackPack, setSnackPack] = useState<I.SnackPack[]>([] as I.SnackPack[])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<I.SnackPack | undefined>(undefined)
  const [autoHideSeconds, setAutoHideSeconds] = useState<number | null>(autoHideDuration)

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] })
      setSnackPack(prev => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  // const SlideTransition = React.forwardRef(
  //   (props: TransitionProps, ref: React.Ref<unknown>) => (
  //     <Slide {...props} direction="down" ref={ref} />
  //   )
  // )

  const Alert = useCallback(
    (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />,
    []
  )

  const showSnackbar = useCallback(
    ({ message, type, action = null }: I.SnackPack) => {
      setSnackPack(prev => [...prev, { message, type, key: new Date().getTime(), action }])

      setAutoHideSeconds(autoHideDuration)
    },
    [autoHideDuration]
  )

  const closeSnackbar = useCallback(
    (event: SyntheticEvent<HTMLElement, Event>, reason: SnackbarCloseReason) => {
      if (reason === 'clickaway') return
      setOpen(false)
    },
    []
  )

  const handleExited = useCallback(() => {
    setMessageInfo(undefined)
  }, [])

  return (
    <>
      <MuiSnackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={position}
        open={open}
        autoHideDuration={autoHideSeconds}
        onExited={handleExited}
        onClose={closeSnackbar}
        // message={messageInfo ? messageInfo.message : undefined}
        // TODO: スライド化検討 (コメントインだけでは動かない)
        // TransitionComponent={SlideTransition}
      >
        <Alert
          severity={messageInfo ? messageInfo.type : undefined}
          action={messageInfo ? messageInfo.action : null}
        >
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </MuiSnackbar>
      <Snackbar.Context.Provider value={{ showSnackbar, closeSnackbar }}>
        {children}
      </Snackbar.Context.Provider>
    </>
  )
}

type Props = {
  autoHideDuration: number
  position: SnackbarOrigin
}
