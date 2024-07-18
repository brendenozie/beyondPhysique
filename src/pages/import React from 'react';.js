import React from 'react';
import { Card, Grid, Typography, Button, Box, Avatar, Container } from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite';
import BmiIcon from '@mui/icons-material/FitnessCenter';
import RunIcon from '@mui/icons-material/DirectionsRun';
import SleepIcon from '@mui/icons-material/Hotel';
import CaloriesIcon from '@mui/icons-material/LocalFireDepartment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/HelpOutline';

const Dashboard = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Here's your summary progress in health the last month.
        </Typography>
        <Grid container spacing={3}>
          {/* Progress for Today */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ p: 2, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'error.main', mx: 'auto', mb: 1 }}>
                <HeartIcon />
              </Avatar>
              <Typography variant="h6">Heart Rate</Typography>
              <Typography variant="h4" color="textSecondary">80 BPM</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ p: 2, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'info.main', mx: 'auto', mb: 1 }}>
                <BmiIcon />
              </Avatar>
              <Typography variant="h6">BMI</Typography>
              <Typography variant="h4" color="textSecondary">45.18</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ p: 2, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 1 }}>
                <RunIcon />
              </Avatar>
              <Typography variant="h6">Running</Typography>
              <Typography variant="h4" color="textSecondary">9000 Steps</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ p: 2, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 1 }}>
                <SleepIcon />
              </Avatar>
              <Typography variant="h6">Sleep</Typography>
              <Typography variant="h4" color="textSecondary">24:0 Score</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ p: 2, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 1 }}>
                <CaloriesIcon />
              </Avatar>
              <Typography variant="h6">Calories</Typography>
              <Typography variant="h4" color="textSecondary">0 Kcal</Typography>
            </Card>
          </Grid>

          {/* Today's Training Classes */}
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Today's Training Classes
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <FitnessCenterIcon fontSize="large" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">Health & Fitness Class</Typography>
                      <Typography color="textSecondary">Friday 6:00 a.m 1 hr</Typography>
                    </Box>
                    <Button variant="contained" color="primary" sx={{ ml: 'auto' }}>
                      Join
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Statistics */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Statistics
              </Typography>
              <Box sx={{ height: 200 }}>
                {/* Placeholder for chart */}
                <BarChartIcon fontSize="large" />
              </Box>
            </Card>
          </Grid>

          {/* Exercise Activity */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Exercise Activity
              </Typography>
              <Box sx={{ height: 200 }}>
                {/* Placeholder for activity chart */}
                <BarChartIcon fontSize="large" />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
