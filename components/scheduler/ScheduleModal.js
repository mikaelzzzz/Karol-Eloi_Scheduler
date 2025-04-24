import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  CloseButton, 
  TimeSlot, 
  TimeText, 
  SpotsText,
  FormGroup,
  Input,
  Button,
  CloseBtn
} from './StyledComponents';

const ScheduleModal = ({ isOpen, onClose, day, teacher, nationality, onSchedule, timeSlots = {} }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    school: '',
    email: ''
  });
  const [showForm, setShowForm] = useState(false);

  const defaultTimeSlots = [
    { time: '06:00pm - 06:30pm', spots: timeSlots['06:00pm - 06:30pm'] !== undefined ? timeSlots['06:00pm - 06:30pm'] : 3 },
    { time: '07:00pm - 07:30pm', spots: timeSlots['07:00pm - 07:30pm'] !== undefined ? timeSlots['07:00pm - 07:30pm'] : 3 },
    { time: '08:00pm - 08:30pm', spots: timeSlots['08:00pm - 08:30pm'] !== undefined ? timeSlots['08:00pm - 08:30pm'] : 3 }
  ];

  const handleTimeSelect = (index) => {
    if (defaultTimeSlots[index].spots > 0) {
      setSelectedTime(index);
      setShowForm(true);
    } else {
      alert('Este horário não possui vagas disponíveis.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.level && formData.email) {
      onSchedule && onSchedule({
        ...formData,
        time: defaultTimeSlots[selectedTime].time,
        day,
        teacher
      });
      
      // Reset form and close modal
      setFormData({
        name: '',
        level: '',
        school: '',
        email: ''
      });
      setSelectedTime(null);
      setShowForm(false);
      onClose();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Schedule for {day} — Teacher {teacher}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        {!showForm ? (
          <>
            <p style={{ marginBottom: '1rem' }}>Nationality: {nationality} {nationality === 'American' ? '🇺🇸' : nationality === 'Filipino' ? '🇵🇭' : nationality === 'Indian' ? '🇮🇳' : ''}</p>
            
            {defaultTimeSlots.map((slot, index) => (
              <TimeSlot 
                key={index} 
                selected={selectedTime === index}
                onClick={() => handleTimeSelect(index)}
                style={{ opacity: slot.spots > 0 ? 1 : 0.6 }}
              >
                <TimeText>{slot.time}</TimeText>
                <SpotsText>{slot.spots} spots left</SpotsText>
              </TimeSlot>
            ))}
            
            <CloseBtn onClick={onClose}>Fechar</CloseBtn>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '1rem' }}>Selected time: {defaultTimeSlots[selectedTime].time}</p>
            
            <FormGroup>
              <Input 
                type="text" 
                placeholder="Nome completo" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Input 
                type="text" 
                placeholder="Nível de inglês (e.g. A1)" 
                name="level" 
                value={formData.level} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Input 
                type="text" 
                placeholder="Escola de origem" 
                name="school" 
                value={formData.school} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Input 
                type="email" 
                placeholder="Email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <p style={{ color: '#ff9800', marginBottom: '1rem', fontSize: '0.9rem' }}>
              ⚠️ Certifique-se que o seu nível é compatível com os alunos já agendados nesse horário.
            </p>
            
            <Button onClick={handleSubmit}>Reservar</Button>
            
            <CloseBtn onClick={() => setShowForm(false)}>Voltar</CloseBtn>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ScheduleModal;
