import React from 'react'
import firebase from 'firebase'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import {
  Rewards,
  PageLayout,
  TotalProvider,
  Home,
  Login,
  AdminRoute,
  PrivateRoute,
  ManageRewardCatalog,
  ManageRewardOrders,
  ManageUsers
} from '@/components'

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
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/company" exact component={Home} />
          <PrivateRoute path="/campany/rewards" exact component={Rewards} />
          <AdminRoute path="/manage/users" component={ManageUsers} />
          <AdminRoute path="/manage/rewards/catalog" component={ManageRewardCatalog} />
          <AdminRoute path="/manage/rewards/orders" component={ManageRewardOrders} />
        </Switch>
      </PageLayout>
    </TotalProvider>
  </BrowserRouter>
)
