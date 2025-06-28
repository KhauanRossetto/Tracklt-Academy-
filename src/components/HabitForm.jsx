/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import LoaderButton from "./LoaderButton";
import { UserContext, postCreateHabit } from "../ConectivityModule";
import { toast } from "react-toastify";

export default function CreateHabit({onComplete , newState = undefined}) {

    const [habitName, setHabitName] = useState("");
    const [days, setDays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useContext(UserContext);
    const [state, setState] = useState({});

    useEffect(() => {
        if(newState.days != undefined) 
        {
            setState(newState);
            setHabitName(newState.name);
            setDays(newState.days);
        } else {
            setDays([]);
            setHabitName("");
        }
        
        return () => {
            setState({});
            setLoading(false);
            setDays([]);
            setHabitName("")
        }
    }, [newState])
    
    useEffect(() => {

        setState({name: habitName, days: days});
    }, [habitName, days])



    function addWeekDay(day) {
        let newArr = [...days];
        const index = newArr.findIndex( (curr) => curr === day);
        if(index != -1) {
           newArr.splice(index, 1)
        }
        else {
            newArr.push(day);
        }
        setDays(newArr);

    }

    function cancelButton() {
        onComplete(state);
    }

    function createHabit(event) {
        event.preventDefault();
        
        if(days.length === 0 ) {
            toast.error("Voce precisa selecionar pelo menos 1 dia da semana!");
            return;
        }
        
        setLoading(true);
        postCreateHabit(user.token, {name: habitName, days})
            .then(() => {
                toast.success("Habito criado com sucesso!")
                setLoading(false);
                onComplete({});
            })
            .catch( error => {
                alert("Desconectado, faca o login novamente.");
                console.log(error)
                toast.error("Problemas ao registrar o novo habito" )
                setLoading(false);
            })
    }

    return (
        <SCHabit data-test="habit-create-container">
            <form onSubmit={(e) => createHabit(e)} >
                <input data-test="habit-name-input" disabled={loading} value={habitName} onChange={e => setHabitName(e.target.value)} placeholder="Nome do habito" type="text"/>
        
                <div>
                    <SCbutton data-test="habit-day"  disabled={loading} $checked={days.includes(0)} type="button" onClick={() => addWeekDay(0)} >D</SCbutton>
                    <SCbutton data-test="habit-day"  disabled={loading} $checked={days.includes(1)} type="button" onClick={() => addWeekDay(1)} >S</SCbutton>
                    <SCbutton data-test="habit-day"  disabled={loading} $checked={days.includes(2)} type="button" onClick={() => addWeekDay(2)} >T</SCbutton>
                    <SCbutton data-test="habit-day"  disabled={loading} $checked={days.includes(3)} type="button" onClick={() => addWeekDay(3)} >Q</SCbutton>
                    <SCbutton data-test="habit-day"  disabled={loading} $checked={days.includes(4)} type="button" onClick={() => addWeekDay(4)} >Q</SCbutton>
                    <SCbutton data-test="habit-day"  disabled={loading} $checked={days.includes(5)} type="button" onClick={() => addWeekDay(5)} >S</SCbutton>
                    <SCbutton data-test="habit-day"  disabled={loading} $checked={days.includes(6)} type="button" onClick={() => addWeekDay(6)} >S</SCbutton>
                </div>

                <div>
                    <button data-test="habit-create-cancel-btn" onClick={cancelButton} disabled={loading} type="button">Cancelar</button>
                    <LoaderButton testStr={"habit-create-save-btn"} loading={loading} type="submit">Salvar</LoaderButton>
                </div>
            </form>
        </SCHabit>
    )
}

const SCHabit = styled.div`
    box-sizing: border-box;
    max-width: 340px;
    width: 90%;

    margin-bottom: 24px;

    border-radius: 5px;

    background-color: #FFF;
    padding: 20px;

    form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        align-items: flex-start;

        input {
            box-sizing: border-box;
            width: 100%;
            padding: 6px;
            color: #666666;
            font-size: 20px;

            border: 1px solid #D4D4D4;
        }
        
        input::placeholder {
            color: #DBDBDB;
        }

    }

    form > div:first-of-type {
        display: flex;
        gap: 4px; 
        
    }

    form > div:last-of-type {
        display: flex;
        gap: 8px;
        align-self: flex-end;

        button:first-child {
            color: #52B6FF;
            background-color: transparent;
            border: none;
        }

        button:last-child {
            background-color: #52B6FF;
            color: #FFF;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
        }
    }

`
const SCbutton = styled.button`
    
    width: 32px;
    height: 32px;
    border: 1px solid #D4D4D4;

    border-radius: 5px;
    font-size: 20px;

    background-color: ${(props) => props.$checked ? "#CFCFCF" : "#FFFFFF"};
    color: ${(props) => props.$checked ? "#FFFFFF" : "#DBDBDB"};

    &:hover {
        cursor: pointer;
    }
`