import React from 'react'
import { makeStyles } from '@material-ui/core'

export const LoadingSpinner: React.FC = () => {
  const styles = useStyles()
  return (
    <div className={styles.spinner}>
      <div className={styles.inner}></div>
    </div>
  )
}

const useStyles = makeStyles({
  spinner: {
    width: 40,
    height: 40,
    position: 'relative',
    transform: 'scale(2)'
  },
  inner: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: 'transparent',
    boxShadow: `0 -18px 0 0 #9880ff, 12.72984px -12.72984px 0 0 #9880ff,
      18px 0 0 0 #9880ff, 12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0),
      0 18px 0 0 rgba(152, 128, 255, 0),
      -12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0),
      -18px 0 0 0 rgba(152, 128, 255, 0),
      -12.72984px -12.72984px 0 0 rgba(152, 128, 255, 0)`,
    animation: '$dot-spin 1.5s infinite linear'
  },
  '@keyframes dot-spin': {
    '0%': {
      boxShadow: `0 -18px 0 0 #9880ff, 12.72984px -12.72984px 0 0 #9880ff,
          18px 0 0 0 #9880ff,
          12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          0 18px 0 -5px rgba(152, 128, 255, 0),
          -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          -18px 0 0 -5px rgba(152, 128, 255, 0),
          -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)`
    },
    '12.5%': {
      boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0),
          12.72984px -12.72984px 0 0 #9880ff, 18px 0 0 0 #9880ff,
          12.72984px 12.72984px 0 0 #9880ff,
          0 18px 0 -5px rgba(152, 128, 255, 0),
          -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          -18px 0 0 -5px rgba(152, 128, 255, 0),
          -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)`
    },
    '25%': {
      boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0),
          12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0),
          18px 0 0 0 #9880ff, 12.72984px 12.72984px 0 0 #9880ff,
          0 18px 0 0 #9880ff,
          -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          -18px 0 0 -5px rgba(152, 128, 255, 0),
          -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)`
    },
    '37.5%': {
      boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0),
          12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0),
          18px 0 0 -5px rgba(152, 128, 255, 0),
          12.72984px 12.72984px 0 0 #9880ff, 0 18px 0 0 #9880ff,
          -12.72984px 12.72984px 0 0 #9880ff,
          -18px 0 0 -5px rgba(152, 128, 255, 0),
          -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)`
    },
    '50%': {
      boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0),
          12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0),
          18px 0 0 -5px rgba(152, 128, 255, 0),
          12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          0 18px 0 0 #9880ff, -12.72984px 12.72984px 0 0 #9880ff,
          -18px 0 0 0 #9880ff,
          -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)`
    },
    '62.5%': {
      boxShadow: `0 -18px 0 -5px rgba(152, 128, 255, 0),
          12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0),
          18px 0 0 -5px rgba(152, 128, 255, 0),
          12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          0 18px 0 -5px rgba(152, 128, 255, 0),
          -12.72984px 12.72984px 0 0 #9880ff, -18px 0 0 0 #9880ff,
          -12.72984px -12.72984px 0 0 #9880ff`
    },
    '75%': {
      boxShadow: `0 -18px 0 0 #9880ff,
          12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0),
          18px 0 0 -5px rgba(152, 128, 255, 0),
          12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          0 18px 0 -5px rgba(152, 128, 255, 0),
          -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          -18px 0 0 0 #9880ff, -12.72984px -12.72984px 0 0 #9880ff`
    },
    '87.5%': {
      boxShadow: `0 -18px 0 0 #9880ff, 12.72984px -12.72984px 0 0 #9880ff,
          18px 0 0 -5px rgba(152, 128, 255, 0),
          12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          0 18px 0 -5px rgba(152, 128, 255, 0),
          -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          -18px 0 0 -5px rgba(152, 128, 255, 0),
          -12.72984px -12.72984px 0 0 #9880ff`
    },
    '100%': {
      boxShadow: `0 -18px 0 0 #9880ff, 12.72984px -12.72984px 0 0 #9880ff,
          18px 0 0 0 #9880ff,
          12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          0 18px 0 -5px rgba(152, 128, 255, 0),
          -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
          -18px 0 0 -5px rgba(152, 128, 255, 0),
          -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)`
    }
  }
})
