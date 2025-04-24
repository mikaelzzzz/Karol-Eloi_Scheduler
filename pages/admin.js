import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Layout from '../components/layout/Layout';
import { SchedulerContainer } from '../components/scheduler/StyledComponents';
import styled from '@emotion/styled';

const AdminContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const AdminTitle = styled.h2`
  margin-bottom: 2rem;
  color: var(--dark-blue);
`;

const ReservationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const TableHeader = styled.th`
  background-color: var(--dark-blue);
  color: white;
  padding: 1rem;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const ThemeForm = styled.form`
  background-color: var(--dark-teal);
  padding: 2rem;
  border-radius: 10px;
  color: white;
`;

const ThemeTitle = styled.h3`
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  min-height: 150px;
`;

const Button = styled.button`
  background-color: var(--beige);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #b69876;
  }
`;

const SuccessMessage = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  display: ${props => props.visible ? 'block' : 'none'};
`;

export default function Admin() {
  const [reservations, setReservations] = useState([]);
  const [weeklyTheme, setWeeklyTheme] = useState({
    theme: 'Hobbies and Free time',
    topics: []
  });
  const [topicsText, setTopicsText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Carregar todas as reservas
    const loadReservations = async () => {
      try {
        const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const reservationsList = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Converter timestamp para data legível se existir
          const createdAt = data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString() : 'N/A';
          reservationsList.push({ 
            id: doc.id, 
            ...data,
            createdAt 
          });
        });
        
        setReservations(reservationsList);
      } catch (error) {
        console.error('Erro ao carregar reservas:', error);
      }
    };

    // Carregar tema da semana
    const loadWeeklyTheme = async () => {
      try {
        const docRef = doc(db, 'settings', 'weeklyTheme');
        const docSnap = await getDocs(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setWeeklyTheme(data);
          setTopicsText(data.topics.join('\n'));
        }
      } catch (error) {
        console.error('Erro ao carregar tema da semana:', error);
      }
    };

    loadReservations();
    loadWeeklyTheme();
  }, []);

  const handleThemeChange = (e) => {
    setWeeklyTheme({
      ...weeklyTheme,
      theme: e.target.value
    });
  };

  const handleTopicsChange = (e) => {
    setTopicsText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Converter o texto de tópicos em um array
    const topicsArray = topicsText
      .split('\n')
      .map(topic => topic.trim())
      .filter(topic => topic.length > 0);
    
    const updatedTheme = {
      theme: weeklyTheme.theme,
      topics: topicsArray
    };
    
    try {
      // Salvar o tema no Firebase
      await setDoc(doc(db, 'settings', 'weeklyTheme'), updatedTheme);
      
      // Mostrar mensagem de sucesso
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao atualizar tema:', error);
      alert('Erro ao atualizar tema da semana.');
    }
  };

  return (
    <Layout>
      <AdminContainer>
        <AdminTitle>Painel Administrativo - Karol Eloi Conversation Scheduler</AdminTitle>
        
        <SuccessMessage visible={showSuccess}>
          Tema da semana atualizado com sucesso!
        </SuccessMessage>
        
        <h3 style={{ marginBottom: '1rem' }}>Reservas</h3>
        <ReservationTable>
          <thead>
            <tr>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Nível</TableHeader>
              <TableHeader>Escola</TableHeader>
              <TableHeader>Dia</TableHeader>
              <TableHeader>Horário</TableHeader>
              <TableHeader>Professor</TableHeader>
              <TableHeader>Data de Criação</TableHeader>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.name}</TableCell>
                <TableCell>{reservation.level}</TableCell>
                <TableCell>{reservation.school}</TableCell>
                <TableCell>{reservation.day}</TableCell>
                <TableCell>{reservation.time}</TableCell>
                <TableCell>{reservation.teacher}</TableCell>
                <TableCell>{reservation.createdAt}</TableCell>
              </TableRow>
            ))}
            {reservations.length === 0 && (
              <TableRow>
                <TableCell colSpan="7" style={{ textAlign: 'center' }}>Nenhuma reserva encontrada</TableCell>
              </TableRow>
            )}
          </tbody>
        </ReservationTable>
        
        <ThemeForm onSubmit={handleSubmit}>
          <ThemeTitle>Atualizar Tema da Semana</ThemeTitle>
          
          <FormGroup>
            <Label>Tema</Label>
            <Input 
              type="text" 
              value={weeklyTheme.theme} 
              onChange={handleThemeChange} 
              placeholder="Ex: Hobbies and Free time"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Tópicos (um por linha)</Label>
            <TextArea 
              value={topicsText} 
              onChange={handleTopicsChange}
              placeholder="Free&#10;Cultural Experiences Abroad&#10;Free&#10;Ideal Day Off&#10;Free"
            />
          </FormGroup>
          
          <Button type="submit">Atualizar Tema</Button>
        </ThemeForm>
      </AdminContainer>
    </Layout>
  );
}
