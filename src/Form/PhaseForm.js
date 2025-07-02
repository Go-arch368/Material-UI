import React from 'react';
import {
  Typography,
  Box,
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
  const { control, handleSubmit } = useForm({
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

  const onSubmit = (data) => {
    console.log('Submitted:', data);
  };

  const renderDateField = (label, name) => (
    <Box sx={{ width: '100%', maxWidth: 600, pr: 2 }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {label}
                <Tooltip title={`More info about ${label}`}>
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <HelpOutlineIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
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
    </Box>
  );

  const renderSection = (title, fields) => (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{
          width: 8, height: 8, borderRadius: '50%',
          backgroundColor: '#F6C013', mr: 1
        }} />
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        maxWidth: '100%',
      }}>
        {fields.map(([label, name]) => renderDateField(label, name))}
      </Box>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', padding: '20px' }}>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" type="submit">Save</Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};

export default PhaseForm;
