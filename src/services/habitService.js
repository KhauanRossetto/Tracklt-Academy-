import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

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

export function deleteHabit(habitId, token) {
  return axios.delete(`${BASE_URL}/habits/${habitId}`, {
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
export function getTodayHabits(token) {
    return axios.get(`${BASE_URL}/habits/today`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  export function toggleHabitStatus(habitId, token) {
    return axios.post(`${BASE_URL}/habits/${habitId}/check`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  