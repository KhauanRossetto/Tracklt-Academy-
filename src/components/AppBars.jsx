import { useContext, useState, useEffect } from "react";
import { HabitsContext, UserContext } from "../ConectivityModule";
import styled from "styled-components";
import logo_deitado from "../assets/logo_deitado.svg";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function AppBars() {
    const [user] = useContext(UserContext);
    const [todayHabits] = useContext(HabitsContext);
    const [percent, setPercent] = useState(1); 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const validMap = todayHabits.filter(curr => curr.done);
        setPercent((validMap.length / todayHabits.length) * 100);
    }, [todayHabits]);

    return (
        <>
            <TopBar data-test="header">
                <img src={logo_deitado} alt="Track-It logo" />
                <img data-test="avatar" src={user.image} alt="User logo" />
            </TopBar>

            <BottomBar data-test="menu">
                <Link data-test="habit-link" to='/habitos' className={location.pathname === '/habitos' ? 'active' : ''}>Hábitos</Link>
               
                <Link data-test="history-link" to="/hoje" className={location.pathname === '/hoje' ? 'active' : ''}>Hoje</Link>
            </BottomBar>
        </>
    );
}

const TopBar = styled.div`
    background-color: #126BA5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 12px;
    box-sizing: border-box;

    img:first-child {
        height: 56px;
    }

    img:last-child {
        width: 56px;
        border-radius: 100%;
        aspect-ratio: 1;
    }
`;

const BottomBar = styled.div`
    background-color: #FFF;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    position: fixed;
    bottom: 0px;
    left: 0px;
    border-top: 1px solid black;
    box-sizing: border-box;

    a {
        flex: 1; /* Ocupa metade da largura */
        text-align: center;
        padding: 20px 0;
        color: #B0B0B0; 
        text-decoration: none;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .active {
        background-color: #52B6FF; /* Cor azul ao clicar */
        color: #FFF; /* Texto branco */
        border-radius: 5px;
    }
`;
