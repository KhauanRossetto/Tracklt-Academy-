import styled from "styled-components";
import HabitCheck from "../components/HabitCheck";
import { useContext, useEffect, useState } from "react";
import { HabitsContext, UserContext, getTodayHabits } from "../ConectivityModule";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import 'dayjs/locale/pt-br';

export default function Today() {
  const [todayHabits, setTodayHabits] = useContext(HabitsContext);
  const [user] = useContext(UserContext);
  const [doneHabits, setDoneHabits] = useState(0);
  const [day, setDay] = useState({ weekday: "", day: "" });

  useEffect(() => {
    dayjs.locale('pt-br');
    dayjs.extend(localeData);

    const weekday = dayjs().format('dddd');
    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

    const formattedDate = dayjs().format('DD/MM');

    setDay({ weekday: formattedWeekday, day: formattedDate });
  }, []);

  useEffect(() => {
    if (!user.token) return;

    getTodayHabits(user.token)
      .then((res) => {
        const habits = res.data;
        setTodayHabits(habits);

        const doneCount = habits.filter(habit => habit.done).length;
        setDoneHabits(doneCount);
      })
      .catch((err) => {
        console.error("Erro ao buscar hábitos:", err);
        toast.error("Erro ao carregar hábitos de hoje!");
      });
  }, [user.token]);

  function renderHabitChecks() {
    if (!todayHabits || todayHabits.length === 0) return null;

    return todayHabits.map(habit => (
      <HabitCheck key={habit.id} data={habit} />
    ));
  }

  function renderProgressLabel() {
    if (!todayHabits || todayHabits.length === 0) return null;

    return doneHabits === 0
      ? <p data-test="today-counter">Nenhum hábito concluído ainda!</p>
      : <span data-test="today-counter">
          {(doneHabits / todayHabits.length * 100).toFixed(0)}% dos hábitos concluídos!
        </span>;
  }

  return (
    <StyledToday>
      <div>
        <h1 data-test="today">{day.weekday}, {day.day}</h1>
        {renderProgressLabel()}
      </div>

      <StyledHabitContainer>
        {renderHabitChecks()}
      </StyledHabitContainer>
    </StyledToday>
  );
}

const StyledToday = styled.div`
  margin-top: 84px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 0px 6%;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  & > div > p {
    font-size: 18px;
    color: #BABABA;
  }

  & > div > span {
    font-size: 18px;
    color: #8FC549;
  }
`;

const StyledHabitContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
