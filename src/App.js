import Main from './pages/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from './commons/routes';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Button, Slide } from '@mui/material';
import Loader from './components/Loader';
import { LoaderContextProvider } from './context/LoaderContext';
import { UserContextProvider } from './context/UserContext';

const notistackRef = React.createRef();

const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

function App() {
  console.log(routes);
  return (
    <>
      <UserContextProvider>
        <SnackbarProvider
          ref={notistackRef}
          autoHideDuration={3000}
          maxSnack={3}
          TransitionComponent={Slide}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          preventDuplicate
          action={(key) => <Button onClick={onClickDismiss(key)}>Close</Button>}
          sx={{ zIndex: 100000 }}
        >
          <LoaderContextProvider>
            <Loader />
            <Router>
              <Main routes={routes} />
            </Router>
          </LoaderContextProvider>
        </SnackbarProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
