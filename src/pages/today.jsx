import styled from "styled-components"
import HabitCheck from "../components/HabitCheck"
import { useContext } from "react";
import { HabitsContext, UserContext, getTodayHabits } from "../ConectivityModule";
import { useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData"
import 'dayjs/locale/pt-br';
import { useState } from "react";

export default function Today() {
    
    const [todayHabits, setTodayHabits] = useContext(HabitsContext);
    const [doneHabits, setDoneHabits] = useState();
    const [user] = useContext(UserContext)
    const [day, setDay] = useState({weekday: "", day: ""});

    useEffect( () => {
        dayjs.locale('pt-br');
        dayjs.extend(localeData);
        const s = dayjs.weekdays()[dayjs().day()];
        const wday = s.charAt(0).toUpperCase() + s.slice(1);

        const monthDay = dayjs().date().toLocaleString('pt-br', {minimumIntegerDigits: 2}) + "/" + (dayjs().month() + 1).toLocaleString('pt-br', {minimumIntegerDigits: 2});

        setDay({weekday: wday, day: monthDay});
    }, [])

    useEffect(() => {
  if (user.token) {
    getTodayHabits(user.token)
      .then((res) => {
        console.log("Hábitos de hoje:", res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar hábitos:", err);
      });
  } else {
    console.log("Token ainda não está disponível.");
  }
}, [setDoneHabits, setTodayHabits, user])


    function genHabitChecks() {
        if(!todayHabits[0]) return;
        return todayHabits.map( curr => {return(<HabitCheck key={curr.id} data={curr}/>)})
    }

    function genLabel() {
        return doneHabits === 0 ? <p data-test="today-counter" >{"Nenhum habito concluido ainda!"}</p> : <span data-test="today-counter" >{((doneHabits / todayHabits.length) * 100).toFixed(2) + "% dos habitos concluidos!"}</span> 
    }

    return (
        <StyledToday>
            <div>
                <h1 data-test="today" >{day.weekday}, {day.day}</h1> 
                {genLabel()}
            </div>
        
            <StyledHabitContainer>
                {genHabitChecks()}
            </StyledHabitContainer>

        </StyledToday>
    )
}


const StyledToday = styled.div`
    margin-top: 84px;
    margin-bottom: 120px;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    width: 100%;
    padding: 0px 6% ;



    & > div:first-child {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 6px;
        

        margin-top: 24px;
        margin-bottom: 24px;
        
        justify-content: right;
    }
    
    & > div > p {
        font-size: 18px;
        color: #BABABA;
    }
        
    & > div > span {
        font-size: 18px;
        color: #8FC549;
    }

`

const StyledHabitContainer = styled.div`
    width: 100%;
    max-width: 400px;

    display: flex;
    flex-direction: column;
    gap: 16px;

`