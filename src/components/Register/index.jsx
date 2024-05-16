import React from 'react';
import { Box, Button, Typography, Container, Grid, Avatar, IconButton } from '@mui/material';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import models from '../../lib/fetchModelData';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";




function Register() {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useState("null");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const signUpData = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      location: location.trim(),
      occupation: occupation.trim(),
      description: description.trim(),
      username: username.trim(),
      password: password.trim(),
      avatar: avatar,
    };
    models.fetchRegister(signUpData).then((data) => {
      if (data) {
        console.log(data);
        navigate("/login")
      }
    });
  };


  return (
    <Box
      sx={{
        backgroundImage: 'url(https://res.cloudinary.com/prod/video/upload/fl_animated/q_60/onboarding-widget/one-question-variant/desktop-background.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          padding: 3,
          borderRadius: 2,
          boxShadow:'14px 14px 14px rgba(0, 0, 0, 0.8)',
          
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          fontFamily={'cursive'}
          fontSize={30}
        >
          Create an account
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2, textAlign: 'start' }}>
          <Grid container spacing={2}>
            {(<Grid item xs={12} sx={{ mb:2, textAlign: 'center' }}>
              <label htmlFor="file-input">
                <IconButton color="primary" component="span">
                <Avatar
                  alt="Avatar"
                  src={fileUrl}
                  sx={{ width: 70, height: 70 }}
                />
                </IconButton>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}

                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                  handleFileChange(e)
                }}
              />
            </Grid>)}
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                size="small"
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="location"
                label="Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                size="small"
                id="occupation"
                label="Occupation"
                name="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                name="password"
                label="Password"
                type="password"
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="checkRobot" color="primary" />}
                label="I'm not robot"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

        </Box>

      </Container>
    </Box>
  );
}
export default Register;