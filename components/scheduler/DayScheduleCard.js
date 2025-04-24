import React from 'react';
import { 
  DayCard, 
  DayName, 
  DayDate, 
  TeacherName, 
  Flag 
} from './StyledComponents';

const countryFlags = {
  'American': '🇺🇸',
  'Filipino': '🇵🇭',
  'Indian': '🇮🇳',
  'British': '🇬🇧',
  'Canadian': '🇨🇦',
  'Australian': '🇦🇺'
};

const DayScheduleCard = ({ day, date, teacher, nationality, onClick }) => {
  const flag = countryFlags[nationality] || '';
  
  return (
    <DayCard onClick={onClick}>
      <DayName>{day}</DayName>
      <DayDate>{date}</DayDate>
      <TeacherName>
        Teacher {teacher} <Flag>{flag}</Flag>
      </TeacherName>
    </DayCard>
  );
};

export default DayScheduleCard;
