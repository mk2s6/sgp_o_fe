import { useEffect } from 'react';
import { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const data = JSON.stringify(localStorage.getItem('user'));
    const key = localStorage.getItem('token');

    if (data && key) {
      setUser(data);
      setToken(key);
      setLoginStatus(true);
    } else {
      setUser({});
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (user && token && user !== '{}') setLoginStatus(true);
    else setLoginStatus(false);
  }, [user, token]);

  const registerUser = (data, _token) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    localStorage.setItem('token', _token);
    setToken(_token);
  };

  const unRegisterUser = () => {
    localStorage.setItem('user', '{}');
    setUser({});
    localStorage.setItem('token', '');
    setToken('');
  };

  return <UserContext.Provider value={{ user, registerUser, token, loginStatus, unRegisterUser }}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
