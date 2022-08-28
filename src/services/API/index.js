import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const ADMIN_LOGIN = async ({ username, password }) => await axios.post(`${BASE_URL}/admin/login`, { username, password });

export const GET_OCCASIONS = async () => await axios.get(`${BASE_URL}/occasions/list`);

export const GET_DONATIONS = async ({ occasion = 0 }) => await axios.get(`${BASE_URL}/donations/list/${occasion}`);
export const RECEIVE_DONATION = async ({ donation = 0 }) => await axios.get(`${BASE_URL}/donations/receive/${donation}`);
export const ADD_DONATION = async ({ name, type, sponsored_item, amount, occasion = 0 }, { token }) =>
  await axios.post(`${BASE_URL}/donations/add/${occasion}`, { name, type, sponsored_item, amount }, { headers: { 'x-id-token': token } });

export const UPDATE_DONATION = async ({ name, type, sponsored_item, amount = 0, occasion = 0, donation }, { token }) =>
  await axios.post(`${BASE_URL}/donations/update/${occasion}/${donation}`, { name, type, sponsored_item, amount }, { headers: { 'x-id-token': token } });

export const GET_EXPENSES = async ({ occasion = 0 }) => await axios.get(`${BASE_URL}/expenses/list/${occasion}`);
export const PAY_FULL_EXPENSE = async ({ occasion = 0, expense = 0 }) => await axios.get(`${BASE_URL}/expenses/pay_full/${occasion}/${expense}`);
export const ADD_EXPENSE = async ({ expenseFor, description, paid, amount, occasion = 0 }, { token }) =>
  await axios.post(`${BASE_URL}/expenses/add/${occasion}`, { expenseFor, description, paid, amount }, { headers: { 'x-id-token': token } });

export const UPDATE_EXPENSE = async ({ paid, amount, occasion = 0, expense }, { token }) =>
  await axios.post(`${BASE_URL}/expenses/update/${occasion}/${expense}`, { paid, amount }, { headers: { 'x-id-token': token } });

export const GET_OCCASIONS_DASHBOARD_SUMMARY = async ({ occasion }) => await axios.get(`${BASE_URL}/occasions/dashboard/summary/${occasion}`);
