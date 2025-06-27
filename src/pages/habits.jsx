import styled from "styled-components"
import CreateHabit from "../components/HabitForm"
import { useState } from "react";
import { useEffect } from "react";
import { UserContext, getListHabits } from "../ConectivityModule";
import { useContext } from "react";
import { toast } from "react-toastify";
import Habit from "../components/Habit";

export default function Habits() {
    const [newHabitPrompt, setNewHabitPrompt] = useState(false); 
    const [formState, setFormState] = useState({});

    const [habits, setHabits] = useState([]);
    const [user] = useContext(UserContext);

    function formOnComplete(currFormState = undefined) {
        setFormState(currFormState)
        setNewHabitPrompt(false);
    }

    useEffect( () => {
        getListHabits(user.token)
            .then( (res) => {setHabits(res.data)})    
            .catch( () => {
                alert("Faca login novamente.");
                toast.error("Falha ao carregar a lista de habitos!");
            })
    })


    return (
        <StyledHabits>
            <div>
                <h1>Meus habitos</h1>
                <button data-test="habit-create-btn" onClick={() => setNewHabitPrompt(true)}>+</button>
            </div>
            {newHabitPrompt ? <CreateHabit newState={formState} onComplete={(props) => formOnComplete(props)}/> : ""}
            <HabitContainer>
                {habits.length === 0 ? <p>Nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> : ""}
                {habits.map( (curr) => {return (<Habit key={curr.id} id={curr.id} name={curr.name} days={curr.days}/>)} )}
            </HabitContainer>

            

        </StyledHabits>
    )
}

const StyledHabits = styled.div`

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    padding: 24px 6%;
    width: 100%;

    margin-top: 80px;
    margin-bottom: 80px;

    & > div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 24px;

        button {
            box-sizing: border-box;
            width: 32px;
            height: 32px;
            background-color: #52B6FF;
            border: none;
            color: #FFF;
            font-size:24px;
            border-radius: 5px;
        }
    }
`

const HabitContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    gap: 24px;
`