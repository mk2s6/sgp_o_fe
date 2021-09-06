import {
  Container,
  FormControl,
  Backdrop,
  Grid,
  InputLabel,
  Paper,
  Select,
  Fade,
  Box,
  MenuItem,
  Modal,
  Button,
  TextField,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import useAPICall from '../../hooks/useAPICall';
import useInput from '../../hooks/useInput';
import useValidations from '../../hooks/useValidations';
import { UserContext } from '../../context/UserContext';

function Donations({ routes }) {
  const [donations, setDonations] = useState([]);
  const [occasionsList, setOccasionsList] = useState([]);
  const [modal, setModal] = useState(false);
  const { loginStatus } = useContext(UserContext);

  const [occasion, bindOccasion, occasionValidation] = useInput('');

  const [name, bindName, nameValidation, resetName] = useInput('');
  const [type, bindType, typeValidation, resetType] = useInput('');
  const [amount, bindAmount, amountValidation, resetAmount] = useInput(0.0);
  const [sponsoredItem, bindSponsoredItem, sponsoredItemValidation, resetSI] = useInput('');

  const { APIRequest } = useAPICall();
  const { setValidations } = useValidations();

  const validationFields = {
    occasion: occasionValidation,
    name: nameValidation,
    type: typeValidation,
    amount: amountValidation,
    sponsored_item: sponsoredItemValidation,
  };

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  const getOccasions = async () => {
    try {
      const { data } = await APIRequest('GET_OCCASIONS');
      setOccasionsList(data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    p: 4,
  };

  const headCells = [
    { id: 'name', numeric: false, label: 'Name', needAuth: false },
    { id: 'type', numeric: false, label: 'Type', needAuth: false },
    { id: 'donation', numeric: false, label: 'Donation', needAuth: false },
    { id: 'status', numeric: false, label: 'Status', needAuth: false },
    { id: 'received', numeric: false, label: 'Receive', needAuth: true },
  ];

  const updateDonation = async (donation) => {
    try {
      const { data } = await APIRequest('RECEIVE_DONATION', { donation: donation.id });
      setDonations(data.items);
      getDonations();
    } catch (e) {
      console.log(e);
    }
  };

  const getDonations = async () => {
    try {
      const { data } = await APIRequest('GET_DONATIONS', { occasion: bindOccasion.value });
      setDonations(data.items);
    } catch (e) {
      console.log(e);
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  const addDonation = async () => {
    try {
      if (type === 'Amount') resetSI();
      else resetAmount();
      await APIRequest('ADD_DONATION', {
        name: bindName.value,
        type: bindType.value,
        amount: bindAmount.value,
        sponsored_item: bindSponsoredItem.value,
        occasion: bindOccasion.value,
      });
      resetName();
      resetType();
      resetSI();
      resetAmount();
      setModal(false);
      getDonations();
    } catch (e) {
      console.log(e);
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  useEffect(() => {
    getOccasions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loginStatus && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modal}>
            <Box maxWidth='sm' sx={style}>
              <Typography id='transition-modal-title' variant='h6' component='h2'>
                Add Donation
              </Typography>
              <Grid container maxWidth='sm' spacing={2}>
                <Grid item xs={12}>
                  <TextField variant='outlined' required fullWidth {...bindName} id='name' label='Name' name='name' autoComplete='nope' />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel id='type-simple-select-label'>Donation-Type</InputLabel>
                    <Select labelId='type-simple-select-label' id='type-simple-select' label='Occasion' {...bindType}>
                      <MenuItem value='Amount' selected>
                        <Typography variant='span'>Amount</Typography>
                      </MenuItem>
                      <MenuItem value='Sponsor'>
                        <Typography variant='span'>Sponsor</Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {type === 'Amount' ? (
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      {...bindAmount}
                      name='Amount'
                      label='Amount'
                      type='Amount'
                      id='Amount'
                      autoComplete='nope'
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      {...bindSponsoredItem}
                      name='Sponsored Item'
                      label='Sponsored Item'
                      type='Sponsored Item'
                      id='Sponsored Item'
                      autoComplete='nope'
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button component={Fab} type='submit' onClick={addDonation} fullWidth variant='contained' color='primary'>
                    Donate
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      )}
      <Container component='main' maxWidth='md' sx={{ mt: 1, p: 2, xs: { maxWidth: '100%' } }}>
        <Paper
          component='div'
          elevation={5}
          sx={{ m: 1, p: 2, flexGrow: 1, mt: '10px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant='h6' sx={{ textTransform: 'uppercase' }}>
            Donations
          </Typography>
          <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Occasion</InputLabel>
                <Select labelId='demo-simple-select-label' id='demo-simple-select' label='Occasion' {...bindOccasion}>
                  {occasionsList.map((occ) => (
                    <MenuItem key={occ.id} value={occ.id}>
                      <Typography variant='span'>
                        {occ.name}-{occ.year}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Button component={Fab} type='submit' fullWidth variant='contained' color='primary' onClick={getDonations}>
                Get Details
              </Button>
            </Grid>
          </Grid>

          {donations.length > 0 && (
            <TableContainer>
              <Table sx={{ minWidth: 250 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>{headCells.map((c) => (!c.needAuth || loginStatus) && <TableCell key={c.id}>{c.label}</TableCell>)}</TableRow>
                </TableHead>
                <TableBody>
                  {donations.map((row, i) => (
                    <TableRow key={i + row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell key={i + row.name + 'name'} component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell key={i + row.name + 'type'} align='left'>
                        {row.type}
                      </TableCell>
                      <TableCell key={i + row.name + 'it'} align='left'>
                        {row.amount > 0 ? row.amount : row.sponsored_item}
                      </TableCell>
                      <TableCell key={i + row.name + 'rec'} align='left'>
                        {row.received ? 'Received' : 'Not Received'}
                      </TableCell>
                      {loginStatus && (
                        <TableCell key={i + row.name + 're'} align='left'>
                          <Button disabled={!!row.received} variant='contained' onClick={() => updateDonation(row)}>
                            Receive
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
      {loginStatus && occasion && (
        <Fab sx={fabStyle} variant='extended' onClick={() => setModal(true)} color='primary' aria-label='add'>
          <AddIcon />
          Add Donation
        </Fab>
      )}
    </>
  );
}

export default Donations;
