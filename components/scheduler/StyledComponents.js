import { useState } from 'react';
import styled from '@emotion/styled';

const Header = styled.header`
  padding: 1rem 0;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--dark-blue);
  margin-bottom: 2rem;
`;

const SchedulerContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DayCard = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DayName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const DayDate = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const TeacherName = styled.p`
  font-size: 1.2rem;
  color: #C8A887;
  margin-bottom: 0.5rem;
`;

const Flag = styled.span`
  margin-left: 5px;
`;

const ThemeCard = styled.div`
  background-color: var(--dark-teal);
  color: var(--white);
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ThemeTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const ThemeContent = styled.h3`
  font-size: 1.5rem;
  color: #C8A887;
  margin-bottom: 1.5rem;
`;

const QuestionLink = styled.a`
  display: flex;
  align-items: center;
  color: var(--light-blue);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TopicList = styled.ul`
  list-style-type: none;
  margin-left: 1rem;
`;

const TopicItem = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: "•";
    margin-right: 0.5rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: var(--white);
  border-radius: 10px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--dark-blue);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const TimeSlot = styled.div`
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: ${props => props.selected ? '#FFF8E1' : '#f9f9f9'};
  border: 1px solid ${props => props.selected ? '#FFD54F' : '#eee'};
`;

const TimeText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const SpotsText = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #C8A887;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #B69876;
  }
`;

const CloseBtn = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #C8A887;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
`;

export {
  Header,
  Title,
  SchedulerContainer,
  WeekGrid,
  DayCard,
  DayName,
  DayDate,
  TeacherName,
  Flag,
  ThemeCard,
  ThemeTitle,
  ThemeContent,
  QuestionLink,
  TopicList,
  TopicItem,
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
};
