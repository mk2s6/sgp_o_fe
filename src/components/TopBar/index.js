import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { LoaderContext } from '../../context/LoaderContext';

function TopBar({ appBarRoutes }) {
  const { enqueueSnackbar } = useSnackbar();
  const { unRegisterUser, loginStatus } = useContext(UserContext);
  const { setLoader } = useContext(LoaderContext);

  const sb = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              SETTIGARIPALLE
            </Typography>
            {!loginStatus &&
              appBarRoutes &&
              appBarRoutes.noAuth.map((r) => (
                <Button color='inherit' component={Link} to={r.route} key={r.id}>
                  {r.label}
                </Button>
              ))}
            {loginStatus &&
              appBarRoutes &&
              appBarRoutes.auth.map((r) => (
                <Button
                  color='inherit'
                  component={Link}
                  to={r.route}
                  key={r.id}
                  onClick={() => {
                    if (r.route === '/signout') {
                      setLoader(true);
                      unRegisterUser();
                      setTimeout(() => {
                        setLoader(false);
                        sb('Logged Out Successfully', 'warning');
                      }, 500);
                    }
                  }}
                >
                  {r.label}
                </Button>
              ))}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default TopBar;
