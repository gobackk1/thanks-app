import React from 'react'
import firebase from 'firebase'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Rewards, PageLayout, TotalProvider, Home, Login } from '@/components'

firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
})

export const App: React.FC = () => (
  <BrowserRouter>
    <TotalProvider>
      <PageLayout>
        <Switch>
          <Route path="/campany/rewards" exact component={Rewards} />
          <Route path="/company" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </PageLayout>
    </TotalProvider>
  </BrowserRouter>
)
