import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

export function signUp(userData) {
  return axios.post(`${BASE_URL}/auth/sign-up`, userData);
}

export function login(userData) {
  return axios.post(`${BASE_URL}/auth/login`, userData);
}
export function getHabits() {
    return axios.get(`${BASE_URL}/habits`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
  
  export function postHabit(habitData) {
    return axios.post(
      `${BASE_URL}/habits`,
      habitData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  }