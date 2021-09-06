import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Donations from '../pages/Donations';
import Expenses from '../pages/Expenses';
import Occasions from '../pages/Occasions';
import Login from '../pages/Login';

export const routes = {
  appBar: {
    auth: [{ id: 'auth-1', label: 'Sign Out', route: '/signout', component: Home }],
    noAuth: [{ id: 'noAuth-1', label: 'Sign In', route: '/login', component: Login }],
  },
  nav: [
    { id: 0, label: 'DashBoard', route: '/dashboard', component: Dashboard, inTab: true, requireAuth: false },
    { id: 1, label: 'Donations', route: '/donations', component: Donations, inTab: true, requireAuth: false },
    { id: 2, label: 'Expenses', route: '/expenses', component: Expenses, inTab: true, requireAuth: false },
    {
      id: 3,
      label: 'Occasions',
      route: '/occasions',
      component: Occasions,
      inTab: true,
      requireAuth: true,
    },
    // { id: 'AddExpenses', label: 'Add Expenses', route: '/expenses/add', component: Dashboard, inTab: true, requireAuth: true },
  ],
};
