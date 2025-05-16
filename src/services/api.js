import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

export function signUp(userData) {
  return axios.post(`${BASE_URL}/auth/sign-up`, userData);
}

export function login(userData) {
  return axios.post(`${BASE_URL}/auth/login`, userData);
}

export function createHabit(habitData, token) {
  return axios.post(`${BASE_URL}/habits`, habitData, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getHabits(token) {
  return axios.get(`${BASE_URL}/habits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function markHabitAsDone(habitId, token) {
  return axios.post(`${BASE_URL}/habits/${habitId}/check`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function unmarkHabit(habitId, token) {
  return axios.post(`${BASE_URL}/habits/${habitId}/uncheck`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
