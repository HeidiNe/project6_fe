import { Box, Button, Typography, Container} from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import models from '../../lib/fetchModelData';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/UserStore';



function Login() {
  const navigate = useNavigate();
  const { setAuth } = useUserStore();
  const [status, setStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      username: username.trim(),
      password: password.trim(),
    };
    models.fetchLogin(loginData).then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setAuth(true);
        setStatus(true);
        navigate("/");
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
      {status && (<Alert icon={<CheckIcon fontSize="inherit" />} 
        severity="success"
        sx={{
          position: 'absolute', 
          top: 0,
          right: 0,
        }}
        >
        Login successfully.
      </Alert>)}

      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
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
          Photos sharing
        </Typography>

        <Box 
          component="form" 
          noValidate 
          sx={{ mt: 1 , textAlign: 'start'}}
        >  
          <TextField
            required
            id="username"
            name='username'
            label="Username"
            fullWidth
            margin='normal'
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            required
            type='password'
            id="password"
            name='password'
            label="Password"
            fullWidth
            margin='normal'
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox name="checked" color="primary" />}
            label="I'm not robot"
          />

          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign in
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
export default Login;