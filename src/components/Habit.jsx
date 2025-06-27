import styled from "styled-components";
import trashcan from "../assets/trash-outline.svg"
import { UserContext, deleteRemoveHabit } from "../ConectivityModule";
import { useContext } from "react";

export default function Habit ({id, name, days}) {

    const [user] = useContext(UserContext);

    function removeHabit() {
        deleteRemoveHabit(user.token, id);
    }

    return (
        <SCHabit data-test="habit-container" >
                <div>
                    <div>
                        <h1 data-test="habit-name">{name}</h1>
                        <img data-test="habit-delete-btn" onClick={removeHabit} src={trashcan} />
                    </div>
            
                    <div>
                        <SCspan data-test="habit-day" $checked={days.includes(0)} >D</SCspan>
                        <SCspan data-test="habit-day" $checked={days.includes(1)} >S</SCspan>
                        <SCspan data-test="habit-day" $checked={days.includes(2)} >T</SCspan>
                        <SCspan data-test="habit-day" $checked={days.includes(3)} >Q</SCspan>
                        <SCspan data-test="habit-day" $checked={days.includes(4)} >Q</SCspan>
                        <SCspan data-test="habit-day" $checked={days.includes(5)} >S</SCspan>
                        <SCspan data-test="habit-day" $checked={days.includes(6)} >S</SCspan>
                    </div>
                </div>
        </SCHabit>
    )
}

const SCHabit = styled.div`
    box-sizing: border-box;
    max-width: 340px;
    width: 90%;

    border-radius: 5px;

    background-color: #FFF;
    padding: 20px;

    div:first-child {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        align-items: flex-start;

        h1 {
            box-sizing: border-box;
            color: #666666;
            font-size: 20px;
        }
    }

    div > div:first-of-type {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        
        img {
            width: 16px;
            height: 16px;
        }

        img:hover {
            cursor: pointer;
        }
    }


    div > div:last-of-type {
        display: flex;
        gap: 4px; 
        justify-self: flex-start;
    }

`
const SCspan = styled.span`
    
    width: 32px;
    height: 32px;
    border: 1px solid #D4D4D4;
    text-align: center;
    line-height: 32px;

    border-radius: 5px;
    font-size: 20px;

    background-color: ${(props) => props.$checked ? "#CFCFCF" : "#FFFFFF"};
    color: ${(props) => props.$checked ? "#FFFFFF" : "#DBDBDB"};
`