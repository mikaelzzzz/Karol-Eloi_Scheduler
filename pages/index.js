import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import DayScheduleCard from '../components/scheduler/DayScheduleCard';
import WeeklyTheme from '../components/scheduler/WeeklyTheme';
import ScheduleModal from '../components/scheduler/ScheduleModal';
import { SchedulerContainer, WeekGrid } from '../components/scheduler/StyledComponents';
import { addReservation, getWeeklyTheme, getTimeSlot } from '../utils/firebaseService';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weeklyTheme, setWeeklyTheme] = useState({
    theme: 'Hobbies and Free time',
    topics: [
      'Free',
      'Cultural Experiences Abroad',
      'Free',
      'Ideal Day Off',
      'Free'
    ]
  });
  const [timeSlots, setTimeSlots] = useState({});

  const weekDays = [
    { day: 'Monday', date: 'Apr 21', teacher: 'Scott', nationality: 'American' },
    { day: 'Tuesday', date: 'Apr 22', teacher: 'Sandy', nationality: 'Filipino' },
    { day: 'Wednesday', date: 'Apr 23', teacher: 'Sandy', nationality: 'Filipino' },
    { day: 'Thursday', date: 'Apr 24', teacher: 'Yogita', nationality: 'Indian' }
  ];

  useEffect(() => {
    // Carregar o tema da semana
    const loadWeeklyTheme = async () => {
      const theme = await getWeeklyTheme();
      if (theme) {
        setWeeklyTheme(theme);
      }
    };

    // Carregar informações de vagas para cada dia e horário
    const loadTimeSlots = async () => {
      const slots = {};
      
      for (const day of weekDays) {
        slots[day.day] = {};
        
        // Horários padrão
        const times = ['06:00pm - 06:30pm', '07:00pm - 07:30pm', '08:00pm - 08:30pm'];
        
        for (const time of times) {
          const timeSlot = await getTimeSlot(day.day, time);
          if (timeSlot) {
            slots[day.day][time] = timeSlot.spotsLeft;
          }
        }
      }
      
      setTimeSlots(slots);
    };

    loadWeeklyTheme();
    loadTimeSlots();
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  const handleSchedule = async (formData) => {
    try {
      const result = await addReservation(formData);
      
      if (result.success) {
        alert('✅ Aula reservada com sucesso! Você receberá um e-mail com os detalhes.');
        
        // Atualizar o número de vagas disponíveis localmente
        setTimeSlots(prev => {
          const newSlots = {...prev};
          newSlots[formData.day][formData.time] = (newSlots[formData.day][formData.time] || 3) - 1;
          return newSlots;
        });
      } else {
        alert(`Erro ao reservar aula: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert('Ocorreu um erro ao tentar reservar a aula. Por favor, tente novamente.');
    }
  };

  return (
    <Layout>
      <SchedulerContainer>
        <WeekGrid>
          {weekDays.map((day, index) => (
            <DayScheduleCard
              key={index}
              day={day.day}
              date={day.date}
              teacher={day.teacher}
              nationality={day.nationality}
              onClick={() => handleDayClick(day)}
            />
          ))}
        </WeekGrid>

        <WeeklyTheme 
          theme={weeklyTheme.theme} 
          topics={weeklyTheme.topics} 
        />

        {selectedDay && (
          <ScheduleModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            day={selectedDay.day}
            teacher={selectedDay.teacher}
            nationality={selectedDay.nationality}
            onSchedule={handleSchedule}
            timeSlots={timeSlots[selectedDay.day] || {}}
          />
        )}
      </SchedulerContainer>
    </Layout>
  );
}
