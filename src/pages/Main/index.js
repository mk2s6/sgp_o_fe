import Header from '../Partials/Header';
import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Container>
  );
}

function Main({ routes }) {
  const [tab, setTab] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const { loginStatus, unRegisterUser } = useContext(UserContext);

  useEffect(() => {
    if (!loginStatus && location.pathname === '/') history.replace('/dashboard');
    if (!loginStatus) history.replace('/dashboard');
    if (loginStatus && location.pathname === '/login') history.replace('/');
    if (loginStatus && location.pathname === '/signout') {
      unRegisterUser();
      history.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus, unRegisterUser]);

  return (
    <>
      <Header headerRoutes={{ nav: routes.nav, appBar: routes.appBar }} tab={tab} setTab={setTab} />
      <Switch>
        {loginStatus &&
          routes &&
          routes.nav.map((r) => (
            <TabPanel component={Route} key={r.id} exact path={r.route} value={tab} index={r.id}>
              <r.component />
            </TabPanel>
          ))}

        {!loginStatus &&
          routes &&
          routes.nav.map((r) => (
            <TabPanel component={Route} key={r.id} exact path={r.route} value={tab} index={r.id}>
              <r.component />
            </TabPanel>
          ))}

        {!loginStatus &&
          routes &&
          routes.appBar.noAuth.map((r) => (
            <Container component={Route} key={r.id} exact path={r.route} value={tab} index={r.id}>
              <r.component />
            </Container>
          ))}
      </Switch>
    </>
  );
}

export default Main;
