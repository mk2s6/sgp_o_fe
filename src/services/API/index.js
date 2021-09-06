import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const URI = 'http://192.168.137.15:4200';

export const ADMIN_LOGIN = async ({ username, password }) => await axios.post(`${URI}/admin/login`, { username, password });

export const GET_OCCASIONS = async () => await axios.get(`${URI}/occasions/list`);

export const GET_DONATIONS = async ({ occasion = 0 }) => await axios.get(`${URI}/donations/list/${occasion}`);
export const RECEIVE_DONATION = async ({ donation = 0 }) => await axios.get(`${URI}/donations/receive/${donation}`);
export const ADD_DONATION = async ({ name, type, sponsored_item, amount, occasion = 0 }, { token }) =>
  await axios.post(`${URI}/donations/add/${occasion}`, { name, type, sponsored_item, amount }, { headers: { 'x-id-token': token } });

export const GET_OCCASIONS_DASHBOARD_SUMMARY = async ({ occasion }) => await axios.get(`${URI}/occasions/dashboard/summary/${occasion}`);
