import { Avatar, Button, Container, FormControlLabel, Grid, Paper, Checkbox, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import useAPICall from '../../hooks/useAPICall';
import useInput from '../../hooks/useInput';
import useValidations from '../../hooks/useValidations';

function Login(props) {
  const [username, bindUsername, usernameValidation] = useInput('');
  const [password, bindPassword, passwordValidation] = useInput('');
  const { APIRequest } = useAPICall();
  const { setValidations } = useValidations();
  const { registerUser } = useContext(UserContext);

  const validationFields = {
    username: usernameValidation,
    password: passwordValidation,
  };

  const submitLogin = async () => {
    try {
      const { data, token } = await APIRequest('ADMIN_LOGIN', { username, password });
      registerUser(data.items[0], token);
    } catch (e) {
      console.log(e);
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  return (
    <>
      <Container component='main' maxWidth='sm' sx={{ mt: 3, p: 1 }}>
        <Paper component='div' elevation={5} sx={{ m: 0, p: 2, flexGrow: 1, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Avatar sx={{ m: 1, backgroundColor: 'primary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
            Sign In
          </Typography>
          <div sx={{ width: '100%', m: 3 }} autoComplete='nope'>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  {...bindUsername}
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='nope'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  {...bindPassword}
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='nope'
                />
              </Grid>
              <Grid item xs={12} sx={{ m: 0 }}>
                <FormControlLabel control={<Checkbox value='allowExtraEmails' color='primary' />} label='Remember Me.' />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' onClick={submitLogin}>
              Sign In
            </Button>
          </div>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
