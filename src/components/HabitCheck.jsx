import styled from "styled-components";
import checkicon from "../assets/check.png"
import { useState } from "react";
import { HabitsContext, UserContext, habitCheckerCheck } from "../ConectivityModule";
import { useContext } from "react";

export default function HabitCheck({data}) {

    const [user] = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useContext(HabitsContext);
    const [currData, setCurrData] = useState(data);

    function checkButtonClick () {
        habitCheckerCheck(user.token, currData.id, !currData.done)
            .then(() => {changeHabitDone(currData.id, !currData.done)})
            .catch( e => console.log(e));

    }

    function changeHabitDone(targetId, value)
    {
        const newArray = [...todayHabits];
        const index = newArray.findIndex( curr => curr.id === targetId);
        const curr = newArray[index];
        curr.done = value;
        curr.currentSequece += value ? 1 : -1;
        setTodayHabits(newArray);
        changeCurrData(curr);
    }

    function changeCurrData(d) {
        if(d.currentSequence >= d.highestSequence) {
            d.highestSequence = d.currentSequence;
        }

        setCurrData(d);
    }

    return (
        <StyledChecker data-test="today-habit-container" $fgreen={currData.done} $sgreen={currData.currentSequence >= currData.highestSequence} $isChecked={currData.done}>
            <div>
                <h1 data-test="today-habit-name" >{currData.name}</h1>
                
                <div>
                    <p data-test="today-habit-sequence" >Sequencia atual: <span>{currData.currentSequence} dias </span> </p>
                    <p data-test="today-habit-record" >Seu recorde: <span>{currData.highestSequence} dias</span></p>
                </div>
            </div>

            <img data-test="today-habit-check-btn" src={checkicon} onClick={checkButtonClick} alt="Check habit" />

        </StyledChecker>
    )
}

const StyledChecker = styled.div`

    width: 100%;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;

    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 12px;

    h1 {
        font-size: 20px;
        color: #666666;
    }

    p {
        font-size: 13px;
        color: #666666;
        line-height: 16px;
    }

    & > div {
        display: flex;
        flex-direction: column;
        gap: 6px;
        justify-content: space-around;
    }

    & > div > div > p:first-of-type > span {
        color: ${(props) => props.$fgreen ? "#8FC549" : "#666666"}
    }

    & > div > div > p:last-of-type > span  {
        color: ${(props) => props.$sgreen ? "#8FC549" : "#666666"}
    }

    span {
        font-size: 13px;
    }

    img {
        width: 36px;
        height: 32px;
        padding: 26px;

        border-radius: 10px;

        background-color: ${ (props) => props.$isChecked ? "#8FC549" : "#E7E7E7"};
    }

`