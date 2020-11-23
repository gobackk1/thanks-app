import React from 'react'
import firebase from 'firebase'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { LP, Rewards, PageLayout, SnackbarProvider } from '@/components'

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
})

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider
        autoHideDuration={5000}
        position={{ vertical: 'top', horizontal: 'center' }}
      >
        <PageLayout>
          <Switch>
            <Route path="/" exact component={LP} />
            <Route path="/rewards" exact component={Rewards} />
          </Switch>
        </PageLayout>
      </SnackbarProvider>
    </BrowserRouter>
  )
}
