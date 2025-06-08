import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

// Sua lista de hábitos
let habits = [
  {
    id: 1,
    name: "Beber água",
    done: false,
    history: ['2025-06-02', '2025-06-03'], // datas no formato 'YYYY-MM-DD'
    weeklyRecord: 4
  }
];

// Função para contar quantos dias o hábito foi feito na semana atual
function countDaysThisWeek(habit) {
  const startOfWeek = dayjs().startOf('isoWeek'); // segunda-feira da semana atual
  const endOfWeek = dayjs().endOf('isoWeek'); // domingo da semana atual

  // Filtrar as datas do history que estão dentro da semana atual
  const count = habit.history.filter(dateStr => {
    const date = dayjs(dateStr);
    return date.isSameOrAfter(startOfWeek, 'day') && date.isSameOrBefore(endOfWeek, 'day');
  }).length;

  return count;
}

const daysDone = countDaysThisWeek(habits[0]);
console.log(`Dias feitos esta semana: ${daysDone}`);
