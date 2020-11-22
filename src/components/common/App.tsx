import React from 'react'
import firebase from 'firebase'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Home, PageLayout } from '@/components'

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
    <PageLayout>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </PageLayout>
  )
}
