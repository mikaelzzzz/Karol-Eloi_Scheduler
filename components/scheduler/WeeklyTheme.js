import React from 'react';
import { 
  ThemeCard, 
  ThemeTitle, 
  ThemeContent, 
  QuestionLink, 
  TopicList, 
  TopicItem 
} from './StyledComponents';

const WeeklyTheme = ({ theme, topics }) => {
  return (
    <ThemeCard>
      <ThemeTitle>This Week's Theme</ThemeTitle>
      <ThemeContent>{theme}</ThemeContent>
      <QuestionLink href="#">👉 See Questions Here</QuestionLink>
      <TopicList>
        {topics.map((topic, index) => (
          <TopicItem key={index}>{topic}</TopicItem>
        ))}
      </TopicList>
    </ThemeCard>
  );
};

export default WeeklyTheme;
