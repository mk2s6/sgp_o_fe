import { Container, Fab, FormControl, Grid, InputLabel, Paper, Select, MenuItem, Typography, Button, Card } from '@mui/material';
import { useState, useEffect } from 'react';
import useAPICall from '../../hooks/useAPICall';
import useInput from '../../hooks/useInput';
import useValidations from '../../hooks/useValidations';

function Dashboard({ routes }) {
  const [occasionsList, setOccasionsList] = useState([]);
  const [occasionSummary, setOccasionSummary] = useState([]);
  const [occasion, bindOccasion, occasionValidation] = useInput('');
  const { APIRequest } = useAPICall();
  const { setValidations } = useValidations();

  const validationFields = {
    occasion: occasionValidation,
  };

  const getOccasions = async () => {
    try {
      const { data } = await APIRequest('GET_OCCASIONS');
      setOccasionsList(data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const getOccasionsDashboardSummary = async () => {
    try {
      const { data } = await APIRequest('GET_OCCASIONS_DASHBOARD_SUMMARY', { occasion: bindOccasion.value });
      console.log(data.items);
      setOccasionSummary(data.items);
    } catch (e) {
      console.log(e);
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  useEffect(() => {
    getOccasions();
  }, []);

  return (
    <>
      <Container component='main' maxWidth='md' sx={{ mt: 1, p: 0.5, xs: { minWidth: '95%', maxWidth: '100%' } }}>
        <Paper
          component='div'
          elevation={5}
          sx={{ m: 1, p: 2, flexGrow: 1, mt: '10px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        >
          <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Occasion</InputLabel>
                <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Occasion' {...bindOccasion}>
                  {occasionsList.map((occ, i) => (
                    <MenuItem key={i + occ.id} value={occ.id}>
                      <Typography variant='span'>
                        {occ.name}-{occ.year}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Button type='submit' component={Fab} fullWidth variant='contained' color='primary' onClick={getOccasionsDashboardSummary}>
                Get Details
              </Button>
            </Grid>
            {/* <Box sx={{ flexGrow: 1, m: 2 }}> */}
            {/* <Grid container spacing={2}> */}
            {/* <Grid item spacing={{ xs: 2, md: 3 }} sm={12} md={6}> */}
            {occasionSummary.map((occ, i) => (
              <Grid item key={i + occ.title} xs={12} sm={12} md={6}>
                <Paper elevation={6}>
                  <Card sx={{ p: 0.5 }}>
                    <Typography variant='h6' component='div' sx={{ textTransform: 'capitalize', px: 0.5 }}>
                      {occ.title}
                    </Typography>
                    {Object.keys(occ)
                      .splice(1)
                      .map((i) => (
                        <Grid container spacing={1} sx={{ m: 0.5, p: 0.5 }} direction='row' justifyContent='flex-start' alignItems='center'>
                          <Grid item xs={6} sm={6} md={3}>
                            <Typography variant='b' component='div' sx={{ textTransform: 'capitalize' }}>
                              {i}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={3}>
                            <Typography variant='p' component='div' sx={{ textTransform: 'capitalize' }}>
                              {occ[i]}
                            </Typography>
                          </Grid>
                        </Grid>
                      ))}
                  </Card>
                </Paper>
              </Grid>
            ))}
            {/* </Grid> */}
            {/* </Grid> */}
            {/* </Box> */}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default Dashboard;
