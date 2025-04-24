import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Adicionar uma nova reserva
export const addReservation = async (reservationData) => {
  try {
    // Verificar se há vagas disponíveis
    const timeSlot = await getTimeSlot(reservationData.day, reservationData.time);
    
    if (timeSlot && timeSlot.spotsLeft > 0) {
      // Adicionar a reserva
      const docRef = await addDoc(collection(db, 'reservations'), {
        ...reservationData,
        createdAt: new Date()
      });
      
      // Atualizar o número de vagas disponíveis
      await updateTimeSlot(reservationData.day, reservationData.time, timeSlot.spotsLeft - 1);
      
      return { success: true, id: docRef.id };
    } else {
      return { success: false, error: 'Não há vagas disponíveis para este horário.' };
    }
  } catch (error) {
    console.error('Erro ao adicionar reserva:', error);
    return { success: false, error: error.message };
  }
};

// Obter todas as reservas para um dia e horário específicos
export const getReservations = async (day, time) => {
  try {
    const q = query(
      collection(db, 'reservations'), 
      where('day', '==', day),
      where('time', '==', time)
    );
    
    const querySnapshot = await getDocs(q);
    const reservations = [];
    
    querySnapshot.forEach((doc) => {
      reservations.push({ id: doc.id, ...doc.data() });
    });
    
    return reservations;
  } catch (error) {
    console.error('Erro ao obter reservas:', error);
    return [];
  }
};

// Obter informações sobre um horário específico (vagas disponíveis)
export const getTimeSlot = async (day, time) => {
  try {
    const docRef = doc(db, 'timeSlots', `${day}-${time}`);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Se o documento não existir, criar com 3 vagas disponíveis
      const newTimeSlot = { day, time, spotsLeft: 3 };
      await setDoc(docRef, newTimeSlot);
      return newTimeSlot;
    }
  } catch (error) {
    console.error('Erro ao obter informações do horário:', error);
    return null;
  }
};

// Atualizar o número de vagas disponíveis para um horário
export const updateTimeSlot = async (day, time, spotsLeft) => {
  try {
    const docRef = doc(db, 'timeSlots', `${day}-${time}`);
    await updateDoc(docRef, { spotsLeft });
    return true;
  } catch (error) {
    console.error('Erro ao atualizar informações do horário:', error);
    return false;
  }
};

// Obter o tema da semana
export const getWeeklyTheme = async () => {
  try {
    const docRef = doc(db, 'settings', 'weeklyTheme');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Tema padrão se não existir
      const defaultTheme = {
        theme: 'Hobbies and Free time',
        topics: [
          'Free',
          'Cultural Experiences Abroad',
          'Free',
          'Ideal Day Off',
          'Free'
        ]
      };
      
      await setDoc(docRef, defaultTheme);
      return defaultTheme;
    }
  } catch (error) {
    console.error('Erro ao obter tema da semana:', error);
    return null;
  }
};
