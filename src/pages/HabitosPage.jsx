import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Componentes estilizados (mantidos iguais para copiar o design)
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f2f2f2;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  background-color: #126ba5;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: 'Pacifico', cursive;
  font-size: 1.5rem;
`;

const Logo = styled.h1`
  margin: 0;
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HabitsMessage = styled.p`
  color: #666666;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
`;

const AddHabitButton = styled.button`
  background-color: #52b6ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #4095c6;
  }
`;

const NavigationBar = styled.nav`
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-top: 1px solid #e5e5e5;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: ${props => props.active ? '#52b6ff' : '#9C9C9C'};
  cursor: pointer;
  padding: 8px;

  &:hover {
    color: #52b6ff;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #52b6ff;
    box-shadow: 0 0 5px rgba(82, 182, 255, 0.3);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const DayButton = styled.button`
  background-color: ${props => props.selected ? '#52b6ff' : 'white'};
  color: ${props => props.selected ? 'white' : '#666666'};
  border: 1px solid #52b6ff;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 5px;
  font-size: 0.9rem;
  cursor: pointer;

  &:disabled {
    background-color: #d4d4d4;
    border-color: #d4d4d4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.selected ? '#4095c6' : '#e0f7ff'};
  }
`;

const ButtonPair = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ButtonSave = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #52b6ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #d4d4d4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #4095c6;
  }
`;

const ButtonCancel = styled.button`
  flex: 1;
  padding: 10px;
  background-color: white;
  color: #52b6ff;
  border: 1px solid #52b6ff;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #f5f5f5;
    border-color: #d4d4d4;
    color: #d4d4d4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #e0f7ff;
  }
`;

function HabitosPage() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getValidToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      throw new Error("Nenhum token encontrado. Faça login novamente.");
    }
    if (!token.startsWith("Bearer ") && !token.includes(".")) {
      console.error("Token inválido ou malformado:", token);
      localStorage.removeItem("token");
      navigate("/login");
      throw new Error("Token inválido. Faça login novamente.");
    }
    return token;
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    setIsLoading(true);
    try {
      const token = getValidToken();
      const response = await axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(response.data);
    } catch (error) {
      console.error("Erro ao carregar hábitos:", error.response?.data || error.message);
      setError("Erro ao carregar hábitos. Tente novamente ou faça login novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const postHabit = async (habitData) => {
    try {
      const token = getValidToken();
      const response = await axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        habitData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao criar hábito:", error.response?.data || error.message);
      throw new Error("Erro ao criar hábito: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!habitName.trim()) {
      setError("O nome do hábito não pode estar vazio.");
      setIsLoading(false);
      return;
    }

    if (selectedDays.length === 0) {
      setError("Selecione pelo menos um dia para o hábito.");
      setIsLoading(false);
      return;
    }

    const habitData = {
      name: habitName.trim(),
      days: selectedDays.sort((a, b) => a - b),
    };

    try {
      const newHabit = await postHabit(habitData);
      setHabits([...habits, newHabit]);
      setHabitName("");
      setSelectedDays([]);
      setFormVisible(false);
      setError("");
      await loadHabits();
    } catch (error) {
      setError("Erro ao cadastrar hábito. Verifique o token, os dados ou tente novamente.");
      console.error("Erro ao criar hábito:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const renderHabits = () => {
    if (isLoading) {
      return <HabitsMessage>Carregando hábitos...</HabitsMessage>;
    }
    if (habits.length === 0) {
      return (
        <HabitsMessage>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
        </HabitsMessage>
      );
    }
    return (
      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: 600 }}>
        {habits.map((habit) => (
          <li key={habit.id} style={{ background: "#fff", padding: "16px", borderRadius: "8px", marginBottom: "12px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginBottom: "6px" }}>{habit.name}</div>
            <div style={{ color: "#666666", fontSize: "0.9rem", lineHeight: "1.4" }}>
              Sequência atual: <span style={{ color: habit.currentSequence > 0 ? "#8FC549" : "#666666" }}>{habit.currentSequence} {habit.currentSequence === 1 ? "dia" : "dias"}</span><br />
              Seu recorde: <span style={{ color: habit.currentSequence === habit.highestSequence && habit.currentSequence !== 0 ? "#8FC549" : "#666666" }}>{habit.highestSequence} {habit.highestSequence === 1 ? "dia" : "dias"}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <PageContainer>
      <Header>
        <Logo>TrackIt</Logo>
        <ProfileIcon src="/path-to-spongebob-icon.png" alt="Perfil" />
      </Header>
      <MainContent>
        <h2>Meus Hábitos</h2>
        <AddHabitButton onClick={() => setFormVisible(true)} disabled={isLoading}>+</AddHabitButton>

        {formVisible && (
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
            <Input
              type="text"
              placeholder="Nome do hábito"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              disabled={isLoading}
              required
            />
            <div>
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
                <DayButton
                  key={index}
                  onClick={() => toggleDay(index)}
                  disabled={isLoading}
                  selected={selectedDays.includes(index)}
                >
                  {day}
                </DayButton>
              ))}
            </div>
            {error && <HabitsMessage style={{ color: "#d32f2f" }}>{error}</HabitsMessage>}
            <ButtonPair>
              <ButtonSave type="submit" disabled={isLoading}>Salvar</ButtonSave>
              <ButtonCancel type="button" onClick={() => setFormVisible(false)} disabled={isLoading}>Cancelar</ButtonCancel>
            </ButtonPair>
          </form>
        )}

        {renderHabits()}
      </MainContent>
      <NavigationBar>
        <NavButton active>Hábitos</NavButton>
        <NavButton>Hoje</NavButton>
      </NavigationBar>
    </PageContainer>
  );
}

export default HabitosPage;
