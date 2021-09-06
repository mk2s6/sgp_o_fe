import { Container, Paper, Typography } from '@mui/material';

function Expenses({ routes }) {
  return (
    <>
      <Container component='main' maxWidth='sm' sx={{ mt: 1, p: 2 }}>
        <Paper
          component='div'
          elevation={5}
          sx={{ m: 1, p: 2, flexGrow: 1, mt: '10px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant='b' sx={{ textTransform: 'uppercase' }}>
            Expenses
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Expenses;
