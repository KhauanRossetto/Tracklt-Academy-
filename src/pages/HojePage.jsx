import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

// Styled Components
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
  flex-shrink: 0;
`;

const ConfirmButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #34a853;
  border: none;
  color: white;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2c8c46;
  }
`;

const DeleteButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: #d32f2f;
  border: none;
  color: white;
  font-size: 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #b12727;
  }
`;

// Container dos botões de filtro (aba Hoje / Meus Hábitos)
const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`;

// Botão individual de filtro
const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ active }) => (active ? "#126BA5" : "#E7E7E7")};
  color: ${({ active }) => (active ? "white" : "#126BA5")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? "#0f5a8d" : "#dcdcdc")};
  }
`;

const Footer = styled.footer`
  width: 100%;
  height: 60px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function HabitosPage() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");
  const [filterToday, setFilterToday] = useState(false);
  const [doneHabits, setDoneHabits] = useState([]);

  // --- NOVO estado para hábitos de hoje com histórico e recorde ---
  const [todayHabits, setTodayHabits] = useState([]);
  const [loadingToday, setLoadingToday] = useState(false);

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
    if(filterToday) loadTodayHabits();  // carrega hábitos do dia ao entrar na aba Hoje
  }, [filterToday]);

  const loadHabits = async () => {
    setIsLoading(true);
    try {
      const token = getValidToken();
      const response = await axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabits(response.data);
      setError("");
      setDoneHabits([]);
    } catch (error) {
      if (error.message.includes("Token inválido")) return;
      console.error("Erro ao carregar hábitos:", error.response?.data || error.message);
      setError("Erro ao carregar hábitos. Tente novamente ou faça login novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- NOVO: carrega hábitos de hoje com histórico ---
  const loadTodayHabits = async () => {
    setLoadingToday(true);
    try {
      const token = getValidToken();
      const res = await axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Assumimos que o backend retorna os hábitos hoje com os campos adicionais:
      // habit.weeklyRecord e habit.history (dias feitos na semana)
      setTodayHabits(res.data);
      setError("");
      // Atualiza lista dos hábitos feitos hoje (id)
      const doneIds = res.data.filter(h => h.done).map(h => h.id);
      setDoneHabits(doneIds);
    } catch (error) {
      if (error.message.includes("Token inválido")) return;
      console.error("Erro ao carregar hábitos de hoje:", error.response?.data || error.message);
      setError("Erro ao carregar hábitos de hoje.");
    } finally {
      setLoadingToday(false);
    }
  };

  const toggleTodayHabit = async habit => {
    const token = getValidToken();
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${
      habit.done ? "uncheck" : "check"
    }`;
    try {
      await axios.post(url, null, { headers: { Authorization: `Bearer ${token}` } });
      // Atualiza lista de hábitos hoje após toggle
      loadTodayHabits();
    } catch (error) {
      alert("Erro ao atualizar status do hábito.");
      console.error(error);
    }
  };

  const deleteHabit = async id => {
    const token = getValidToken();
    try {
      await axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Recarregar lista após exclusão
      if(filterToday) {
        loadTodayHabits();
      } else {
        loadHabits();
      }
    } catch (error) {
      alert("Erro ao excluir hábito.");
      console.error(error);
    }
  };

  const handleDayClick = dayIndex => {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter(d => d !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex]);
    }
  };

  const createHabit = async e => {
    e.preventDefault();
    if (habitName.trim() === "") {
      setError("O nome do hábito não pode ficar vazio.");
      return;
    }
    if (selectedDays.length === 0) {
      setError("Selecione pelo menos um dia da semana.");
      return;
    }
    setIsLoading(true);
    const token = getValidToken();
    try {
      await axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
          name: habitName,
          days: selectedDays.sort(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabitName("");
      setSelectedDays([]);
      setError("");
      setFormVisible(false);
      loadHabits();
    } catch (error) {
      alert("Erro ao criar hábito.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para contar dias feitos na semana baseado no campo history (assumindo array de dias feitos)
  // Se o backend não retornar, podemos calcular pelo array weeklyRecord ou deixar como 0
  const diasFeitosNaSemana = habit => {
    // Exemplo: habit.history = [1,3,4] dias da semana em que o hábito foi feito
    // Ou pode ser uma contagem simples do que backend enviar
    if (habit.history && Array.isArray(habit.history)) {
      return habit.history.length;
    }
    return 0;
  };

  // Render Meus Hábitos (somente nome + dias)
  const renderHabits = () => {
    if (isLoading) return <HabitsMessage>Carregando hábitos...</HabitsMessage>;
    if (habits.length === 0) return <HabitsMessage>Você não tem nenhum hábito cadastrado ainda.</HabitsMessage>;

    return (
      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: 600 }}>
        {habits.map(habit => (
          <HabitItem key={habit.id} done={doneHabits.includes(habit.id)}>
            <HabitInfo>
              <strong>{habit.name}</strong><br />
              Dias: {habit.days.map(d => daysNames[d]).join(", ")}
            </HabitInfo>
          </HabitItem>
        ))}
      </ul>
    );
  };

  // Render Hoje (nome, dias feitos na semana, recorde, marcar feito, excluir)
  const renderTodayHabits = () => {
    if (loadingToday) return <HabitsMessage>Carregando hábitos de hoje...</HabitsMessage>;
    if (todayHabits.length === 0) return <HabitsMessage>Você não tem hábitos para hoje.</HabitsMessage>;

    return (
      <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: 600 }}>
        {todayHabits.map(habit => (
          <HabitItem key={habit.id} done={habit.done}>
            <HabitInfo>
              <strong>{habit.name}</strong><br />
              Feito nesta semana: {diasFeitosNaSemana(habit)} dia(s)<br />
              Recorde semanal: {habit.weeklyRecord || 0} dia(s)
            </HabitInfo>
            <HabitButtons>
              <ConfirmButton
                onClick={() => toggleTodayHabit(habit)}
                title={habit.done ? "Desmarcar feito" : "Marcar como feito"}
              >
                {habit.done ? "✔" : "✖"}
              </ConfirmButton>
              <DeleteButton
                onClick={() => {
                  if (window.confirm(`Deseja realmente excluir o hábito "${habit.name}"?`)) {
                    deleteHabit(habit.id);
                  }
                }}
                title="Excluir hábito"
              >
                🗑
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
        {/* Você pode colocar aqui foto do usuário, se quiser */}
        <ProfileIcon src="https://i.pravatar.cc/150?img=3" alt="Usuário" />
      </Header>
      <MainContent>
        <FilterButtons>
          <FilterButton active={!filterToday} onClick={() => setFilterToday(false)}>
            Meus Hábitos
          </FilterButton>
          <FilterButton active={filterToday} onClick={() => setFilterToday(true)}>
            Hoje
          </FilterButton>
        </FilterButtons>

        {filterToday ? renderTodayHabits() : renderHabits()}

        {!filterToday && (
          <>
            {!formVisible && (
              <AddHabitButton onClick={() => setFormVisible(true)}>+ Novo Hábito</AddHabitButton>
            )}

            {formVisible && (
              <form onSubmit={createHabit} style={{ maxWidth: 600, width: "100%", marginTop: 20 }}>
                <Input
                  type="text"
                  placeholder="Nome do hábito"
                  value={habitName}
                  onChange={e => setHabitName(e.target.value)}
                  disabled={isLoading}
                />
                <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 400 }}>
                  {daysNames.map((day, index) => (
                    <DayButton
                      key={index}
                      type="button"
                      selected={selectedDays.includes(index)}
                      onClick={() => handleDayClick(index)}
                      disabled={isLoading}
                    >
                      {day}
                    </DayButton>
                  ))}
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <ButtonPair>
                  <ButtonCancel type="button" onClick={() => setFormVisible(false)} disabled={isLoading}>
                    Cancelar
                  </ButtonCancel>
                  <ButtonSave type="submit" disabled={isLoading}>
                    Salvar
                  </ButtonSave>
                </ButtonPair>
              </form>
            )}
          </>
        )}
      </MainContent>

      <Footer>TrackIt - Seus hábitos em dia!</Footer>
    </PageContainer>
  );
}

export default HabitosPage;
