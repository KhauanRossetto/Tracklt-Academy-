import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components (mesmos de antes, só adicionei botão extra para excluir e confirmar)

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
  position: sticky;
  bottom: 0;
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

const HabitItem = styled.li`
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  background-color: ${props => props.done ? "#d3f9d8" : "white"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.done ? "#34a853" : "#ccc"};
`;

const HabitInfo = styled.div`
  flex: 1;
`;

const HabitButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ConfirmButton = styled.button`
  background-color: #34a853;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #2c8c46;
  }
`;

const DeleteButton = styled.button`
  background-color: #d32f2f;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #b12727;
  }
`;

function HabitosPage() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");
  const [filterToday, setFilterToday] = useState(false);
  const [doneHabits, setDoneHabits] = useState([]); // IDs dos hábitos marcados como feitos

  const navigate = useNavigate();

  const daysNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const todayIndex = new Date().getDay();

  const getValidToken = () => {
    const token = localStorage.getItem("token");
    if (!token || !token.includes(".")) {
      localStorage.removeItem("token");
      navigate("/login");
      throw new Error("Token inválido ou ausente. Faça login novamente.");
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
      const response = await axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHabits(response.data);
      setError("");
      setDoneHabits([]); // limpa feitos ao recarregar
    } catch (error) {
      if (error.message.includes("Token inválido")) {
        return;
      }
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
      throw new Error("Erro ao criar hábito: " + (error.response?.data?.message || error.message));
    }
  };

  const deleteHabit = async (id) => {
    try {
      const token = getValidToken();
      await axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Remove da lista localmente após exclusão
      setHabits((prev) => prev.filter(habit => habit.id !== id));
      setDoneHabits((prev) => prev.filter(did => did !== id));
    } catch (error) {
      console.error("Erro ao excluir hábito:", error.response?.data || error.message);
      setError("Erro ao excluir hábito.");
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
      setError("Selecione pelo menos um dia.");
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
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const toggleDone = (id) => {
    setDoneHabits((prevDone) =>
      prevDone.includes(id)
        ? prevDone.filter(did => did !== id)
        : [...prevDone, id]
    );
  };

  const filteredHabits = filterToday
    ? habits.filter(habit => habit.days.includes(todayIndex))
    : habits;

  const renderHabits = () => {
    if (isLoading) {
      return <HabitsMessage>Carregando hábitos...</HabitsMessage>;
    }
    if (filteredHabits.length === 0) {
      return (
        <HabitsMessage>
          {filterToday
            ? "Você não tem hábitos para hoje."
            : "Você não tem nenhum hábito cadastrado ainda."}
        </HabitsMessage>
      );
    }
    return (
      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: 600 }}>
        {filteredHabits.map((habit) => (
          <HabitItem key={habit.id} done={doneHabits.includes(habit.id)}>
            <HabitInfo>
              <strong>{habit.name}</strong> <br />
              Dias: {habit.days.map(d => daysNames[d]).join(", ")}
            </HabitInfo>
            <HabitButtons>
              <ConfirmButton
                onClick={() => toggleDone(habit.id)}
                title={doneHabits.includes(habit.id) ? "Desmarcar feito" : "Marcar como feito"}
              >
                {doneHabits.includes(habit.id) ? "✔ Feito" : "Confirmar"}
              </ConfirmButton>
              <DeleteButton
                onClick={() => {
                  if(window.confirm(`Deseja realmente excluir o hábito "${habit.name}"?`)){
                    deleteHabit(habit.id);
                  }
                }}
              >
                Excluir
              </DeleteButton>
            </HabitButtons>
          </HabitItem>
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
        <AddHabitButton onClick={() => setFormVisible(true)} disabled={isLoading}>
          +
        </AddHabitButton>

        {formVisible && (
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nome do hábito"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              disabled={isLoading}
              required
            />
            <div>
              {daysNames.map((day, index) => (
                <DayButton
                  key={index}
                  onClick={() => toggleDay(index)}
                  disabled={isLoading}
                  selected={selectedDays.includes(index)}
                  type="button"
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
        <NavButton active={!filterToday} onClick={() => setFilterToday(false)}>Hábitos</NavButton>
        <NavButton active={filterToday} onClick={() => setFilterToday(true)}>Hoje</NavButton>
      </NavigationBar>
    </PageContainer>
  );
}

export default HabitosPage;
