import { AppBar, Box, Tabs, Tab, Toolbar } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ navRoutes, tab, setTab }) {
  let location = useLocation();
  const { loginStatus } = useContext(UserContext);

  useEffect(() => {
    if (location.pathname === '/login') setTab(0);
    else setTab(navRoutes.filter((e) => e.route === location.pathname)[0]?.id || 0);
  });

  const handleChange = (event, newTabIndex) => {
    setTab(newTabIndex);
  };

  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <AppBar position='static'>
          <Toolbar
            variant='dense'
            sx={{
              alignItems: 'center',
              margin: 'auto',
              maxWidth: '92%',
            }}
          >
            <Tabs value={tab} onChange={handleChange} variant='scrollable' scrollButtons='auto' indicatorColor='secondary' textColor='inherit'>
              {navRoutes &&
                navRoutes.map((r) => r.inTab && (loginStatus || !r.requireAuth) && <Tab label={r.label} key={r.id} component={Link} to={r.route} />)}
            </Tabs>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navigation;
