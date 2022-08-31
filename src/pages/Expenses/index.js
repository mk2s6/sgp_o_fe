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
  const [expenses, setExpenses] = useState([]);
  const [occasionsList, setOccasionsList] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { loginStatus } = useContext(UserContext);
  const [editRow, setEditRow] = useState(null);

  const [occasion, bindOccasion, occasionValidation] = useInput('');

  const [expenseFor, bindExpenseFor, expenseForValidation, resetExpenseFor] = useInput('');
  const [description, bindDescription, descriptionValidation, resetDescription] = useInput('');
  const [amount, bindAmount, amountValidation, resetAmount] = useInput(0);
  const [paid, bindPaid, paidValidation, resetPaid] = useInput(0);

  const { APIRequest } = useAPICall();
  const { setValidations } = useValidations();

  const validationFields = {
    occasion: occasionValidation,
    expenseFor: expenseForValidation,
    description: descriptionValidation,
    amount: amountValidation,
    paid: paidValidation,
  };

  const fabStyle = {
    position: 'fixed',
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
    { id: 'for', numeric: false, label: 'Expense For', needAuth: false },
    { id: 'description', numeric: false, label: 'Description', needAuth: false },
    { id: 'amount', numeric: false, label: 'Amount', needAuth: false },
    { id: 'paid', numeric: false, label: 'Paid', needAuth: false },
    { id: 'Pay-Full', numeric: false, label: 'Pay-Full', needAuth: true },
    { id: 'Edit', numeric: false, label: 'Edit', needAuth: true },
  ];

  const PayFullExpense = async (expense) => {
    try {
      console.log(expense, bindOccasion.value);
      const { data } = await APIRequest('PAY_FULL_EXPENSE', { expense: expense.id, paid, occasion: bindOccasion.value });
      setExpenses(data.items);
      getExpenses();
    } catch (e) {
      console.log(e);
    }
  };

  const getExpenses = async () => {
    try {
      const { data } = await APIRequest('GET_EXPENSES', { occasion: bindOccasion.value });
      setExpenses(data.items);
    } catch (e) {
      console.log(e);
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  const addExpense = async () => {
    try {
      if (description === 'Amount') resetPaid();
      else resetAmount();
      await APIRequest('ADD_EXPENSE', {
        expenseFor: bindExpenseFor.value,
        description: bindDescription.value,
        amount: bindAmount.value,
        paid: bindPaid.value,
        occasion: bindOccasion.value,
      });
      resetExpenseFor();
      resetDescription();
      resetPaid();
      resetAmount();
      setAddModal(false);
      getExpenses();
    } catch (e) {
      console.log(e);
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  const editExpense = async () => {
    try {
      await APIRequest('UPDATE_EXPENSE', {
        expenseFor: bindExpenseFor.value || editRow.expenseFor,
        description: bindDescription.value || editRow.description,
        amount: bindAmount.value || editRow.amount,
        paid: bindPaid.value || editRow.paid,
        occasion: bindOccasion.value,
        expense: editRow.id,
      });
      resetExpenseFor();
      resetDescription();
      resetPaid();
      resetAmount();
      setEditModal(false);
      getExpenses();
    } catch (e) {
      console.log(e);
      if (e.type === 0 && e.errors.length) {
        setValidations(validationFields, e.errors);
      }
    }
  };

  const updateToggle = async (status, row) => {
    console.log(row);
    setEditModal(status);
    setEditRow(row);

    bindExpenseFor._setValue(row.expenseFor);
    bindDescription._setValue(row.description);
    bindAmount._setValue(row.amount || 0);
    bindPaid._setValue(row.paid || '');
  };

  useEffect(() => {
    getOccasions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loginStatus && (
        <Modal
          open={addModal}
          onClose={() => setAddModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={addModal}>
            <Box maxWidth="sm" sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Add Expense
              </Typography>
              <Grid container maxWidth="sm" spacing={2}>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindExpenseFor} id="for" label="Expense For" name="for" autoComplete="nope" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindDescription} id="desc" label="Description" name="description" autoComplete="nope" />
                </Grid>

                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindAmount} name="Amount" label="Amount" type="Amount" id="Amount" autoComplete="nope" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindPaid} name="paid" label="paid" type="paid" id="paid" autoComplete="nope" />
                </Grid>
                <Grid item xs={12}>
                  <Button component={Fab} type="submit" onClick={addExpense} fullWidth variant="contained" color="primary">
                    Add Expense
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      )}
      {loginStatus && (
        <Modal
          open={editModal}
          onClose={() => setEditModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <Fade in={editModal}>
            <Box maxWidth="sm" sx={style}>
              <Grid item xs={12} sx={{ textAlign: 'center', p: 1 }}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Update Expense
                </Typography>
              </Grid>

              <Grid container maxWidth="sm" spacing={2}>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindExpenseFor} id="for" label="Expense For" name="for" autoComplete="nope" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindDescription} id="desc" label="Description" name="description" autoComplete="nope" />
                </Grid>

                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindAmount} name="Amount" label="Amount" type="Amount" id="Amount" autoComplete="nope" />
                </Grid>
                <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth {...bindPaid} name="paid" label="paid" type="paid" id="paid" autoComplete="nope" />
                </Grid>
                <Grid item xs={12}>
                  <Button component={Fab} type="submit" onClick={editExpense} fullWidth variant="contained" color="primary">
                    Update
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      )}
      <Container component="main" maxWidth="md" sx={{ mt: 1, p: 0.5, xs: { maxWidth: '100%', minWidth: '95%' } }}>
        <Paper component="div" elevation={5} sx={{ m: 1, p: 2, flexGrow: 1, mt: '10px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
            Expenses
          </Typography>
          <Grid container spacing={2} sx={{ m: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Occasion</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Occasion" {...bindOccasion}>
                  {occasionsList.map((occ) => (
                    <MenuItem key={occ.id} value={occ.id}>
                      <Typography variant="span">
                        {occ.name}-{occ.year}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Button component={Fab} type="submit" fullWidth variant="contained" color="primary" onClick={getExpenses}>
                Get Details
              </Button>
            </Grid>
          </Grid>

          {expenses.length > 0 && (
            <TableContainer sx={{ mt: 2 }}>
              <Table sx={{ minWidth: 300 }} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>{headCells.map((c) => (!c.needAuth || loginStatus) && <TableCell key={c.id}>{c.label}</TableCell>)}</TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((row, i) => (
                    <TableRow key={i + row.for} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell key={i + row.for + 'for'} component="th" scope="row">
                        {row.expenseFor}
                      </TableCell>
                      <TableCell key={i + row.for + 'description'} align="left">
                        {row.description}
                      </TableCell>
                      <TableCell key={i + row.for + 'amount'} align="left">
                        {row.amount}
                      </TableCell>
                      <TableCell key={i + row.for + 'paid'} align="left">
                        {row.paid}
                      </TableCell>
                      {loginStatus && (
                        <TableCell key={i + row.for + 're'} align="left">
                          <Button disabled={!(parseInt(row.amount) - parseInt(row.paid))} variant="contained" onClick={() => PayFullExpense(row)}>
                            Pay-Full
                          </Button>
                        </TableCell>
                      )}
                      {loginStatus && (
                        <TableCell key={i + row.for + 're'} align="left">
                          <Button disabled={!(parseInt(row.amount) - parseInt(row.paid))} variant="contained" onClick={() => updateToggle(true, row)}>
                            Edit
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
        <Fab sx={fabStyle} variant="extended" onClick={() => setAddModal(true)} color="primary" aria-label="add">
          <AddIcon />
          Add Expenses
        </Fab>
      )}
    </>
  );
}

export default Donations;
