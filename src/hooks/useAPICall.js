import * as APIServices from '../services/API';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { LoaderContext } from '../context/LoaderContext';
import { UserContext } from '../context/UserContext';

const useAPICall = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoader } = useContext(LoaderContext);
  const { token } = useContext(UserContext);

  const APIRequest = async (URL, data) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 5000);
    try {
      const response = await APIServices[URL](data, { token }, {});
      enqueueSnackbar(response.data.data.description, { variant: 'success' });
      setLoader(false);
      return { data: response.data.data, token: response.headers['x-id-token'] };
    } catch (e) {
      const err = e.response.data;
      setLoader(false);
      enqueueSnackbar(err.message, { variant: e.response.status === 400 || e.response.status === 500 ? 'error' : 'warning' });
      return Promise.reject(err);
    }
  };
  return { APIRequest };
};

export default useAPICall;
