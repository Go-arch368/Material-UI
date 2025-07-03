import React from 'react';
import {
  Typography,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';
import axios from 'axios'; // ✅ API library

// Styled Components
const FormWrapper = styled.form`
  width: 100%;
  padding: 10px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #F6C013;
  margin-right: 8px;
`;

const BoldText = styled(Typography)`
  font-weight: bold;
`;

const DateFieldsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%;
`;

const DateFieldBox = styled.div`
  width: 100%;
  max-width: 600px;
  padding-right: 16px;
`;

const LabelWithIcon = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

// Yup schema
const schema = yup.object().shape({
  cancellationDate: yup.date().nullable(),
  targetedAwardDate: yup.date().nullable(),
  documentStart: yup.date().nullable(),
  documentEnd: yup.date().nullable(),
  marketStart: yup.date().nullable(),
  marketEnd: yup.date().nullable(),
  evaluationStart: yup.date().nullable(),
  evaluationEnd: yup.date().nullable(),
  awardStart: yup.date().nullable(),
  awardEnd: yup.date().nullable(),
});

const PhaseForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      cancellationDate: null,
      targetedAwardDate: null,
      documentStart: null,
      documentEnd: null,
      marketStart: null,
      marketEnd: null,
      evaluationStart: null,
      evaluationEnd: null,
      awardStart: null,
      awardEnd: null,
    },
    resolver: yupResolver(schema),
  });

  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
      console.log('Success:', response.data);
      alert('Form submitted successfully!');
      reset(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed.');
    }
  };

  const renderDateField = (label, name) => (
    <DateFieldBox key={name}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={
              <LabelWithIcon>
                {label}
                <Tooltip title={`More info about ${label}`}>
                  <IconButton size="small" style={{ marginLeft: 4 }}>
                    <HelpOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </LabelWithIcon>
            }
            format="DD/MM/YYYY"
            value={field.value || null}
            onChange={field.onChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
                helperText: ' ',
              },
            }}
          />
        )}
      />
    </DateFieldBox>
  );

  const renderSection = (title, fields) => (
    <Section key={title}>
      <SectionHeader>
        <Dot />
        <BoldText>{title}</BoldText>
      </SectionHeader>
      <DateFieldsWrapper>
        {fields.map(([label, name]) => renderDateField(label, name))}
      </DateFieldsWrapper>
    </Section>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        {renderSection('Staging', [
          ['Cancellation Date', 'cancellationDate'],
          ['Targeted Award Date', 'targetedAwardDate'],
        ])}
        {renderSection('Document Development Phase', [
          ['Document Development Phase Start Date', 'documentStart'],
          ['Document Development Phase End Date', 'documentEnd'],
        ])}
        {renderSection('Market Phase', [
          ['Market Phase Start Date', 'marketStart'],
          ['Market Phase End Date', 'marketEnd'],
        ])}
        {renderSection('Evaluation Phase', [
          ['Evaluation Phase Start Date', 'evaluationStart'],
          ['Evaluation Phase End Date', 'evaluationEnd'],
        ])}
        {renderSection('Award Phase', [
          ['Award Phase Start Date', 'awardStart'],
          ['Award Phase End Date', 'awardEnd'],
        ])}

        <ButtonRow>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" type="submit">Save</Button>
        </ButtonRow>
      </FormWrapper>
    </LocalizationProvider>
  );
};

export default PhaseForm;
