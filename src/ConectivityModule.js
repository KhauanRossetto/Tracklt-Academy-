import axios from "axios";
import { createContext } from "react";

const ENDPOINTS = {
    register: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
    login: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
    todayHabits: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
    createHabit: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
    listHabits: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
    removeHabit: (id) => "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/" + id,
    habitCheckerCheck: (id) => "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/"+ id +"/check",
    habitCheckerUncheck: (id) => "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/"+ id +"/uncheck",

}

const UserContext = createContext([{}, () => {}])
const HabitsContext = createContext([ [], () => {}])

function resgisterNewUser(data){

    const promisse = axios.post(ENDPOINSTS.register, data)

    return promisse;
}

function liginUser(data) {
    const promisse = axios.post(ENDPOINTS.login, data)
    return promisse;
}

function getTodayHasbits(token) {
    const config = {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
   const promisse = axios.get(ENDPOINSTS.todayHabits, config) :
   return promise;
}

