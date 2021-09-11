import * as APIServices from '../services/API';
import { useSnackbar } from '../notistack';
import { useContext } from 'react';
import { LoaderContext } from '../context/LoaderContext';
import { UserContext } from '../context/UserContext';

const useAPICall = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoader } = useContext(LoaderContext);
  const { token } = useContext(UserContext);

  const APIRequest = async (URL, data) => {
    setLoader(true);
    try {
      const response = await APIServices[URL](data, { token }, {});
      enqueueSnackbar(response.data.data.description, { variant: 'success' });
      setLoader(false);
      return { data: response.data.data, token: response.headers['x-id-token'] };
    } catch (e) {
      let err = e;
      if (!(e.message === 'Network Error')) err = e.response.data;
      else err.message = 'Internal Server Error - Please try again later.';
      setLoader(false);
      enqueueSnackbar(err.message, {
        variant: e?.response?.status === 422 ? 'warning' : 'error',
      });
      return Promise.reject(err);
    }
  };
  return { APIRequest };
};

export default useAPICall;
