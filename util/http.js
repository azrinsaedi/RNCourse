import axios from 'axios';

export async function storeExpense(expenseData) {
  const response = await axios.post(process.env.EXPO_PUBLIC_FIREBASE_DB + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(process.env.EXPO_PUBLIC_FIREBASE_DB + '/expenses.json');

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(process.env.EXPO_PUBLIC_FIREBASE_DB + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(process.env.EXPO_PUBLIC_FIREBASE_DB + `/expenses/${id}.json`);
}
