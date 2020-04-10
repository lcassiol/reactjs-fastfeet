import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import NewOrEditDelivery from '~/pages/Deliveries/components/NewOrEditDelivery';

import Deliveryman from '~/pages/Deliveryman';
import NewOrEditDeliveryMan from '~/pages/Deliveryman/components/NewOrEditDeliveryMan';

import Recipients from '~/pages/Recipients';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route
        path="/deliveries/new"
        exact
        component={NewOrEditDelivery}
        isPrivate
      />
      <Route
        path="/deliveries/edit/:id"
        exact
        component={NewOrEditDelivery}
        isPrivate
      />

      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/new"
        exact
        component={NewOrEditDeliveryMan}
        isPrivate
      />
      <Route
        path="/deliveryman/edit/:id"
        exact
        component={NewOrEditDeliveryMan}
        isPrivate
      />

      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/delivery-problems" component={Problems} isPrivate />
    </Switch>
  );
}
