import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Flightdeck from './pages/Flightdeck';
import Cart from './pages/Cart';
import Schedule from './pages/Schedule';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Flightdeck} />
      <Route path="/cart" component={Cart} />
      <Route path="/schedule" component={Schedule} />
    </Switch>
  );
}
