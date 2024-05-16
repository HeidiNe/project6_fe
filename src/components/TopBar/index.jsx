import * as React from 'react';
import { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';

import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';
import { useNavigate } from "react-router-dom";
import useUserStore from '../../store/UserStore';


const LoginRegister = ['Login', 'Register'];

function TopBar(props) {
  const { auth, setAuth } = useUserStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleLoginRegister = (page) => {
    if (page === 'Login') {
      return navigate('/login');
    } else {
      return navigate('/register');
    }
  };

  const handleProfile = () => {
    return navigate('/profile');
  };

  const handleNewPost = () => {
    return navigate('/newpost');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate('/login');
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log("effect topbar  " + token)
    if (token) {
      setAuth(true);
    }
    else {
      setAuth(false);
    }
  }, [auth]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

          {/* icon des */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <MonochromePhotosIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >

              PHOTO SHARING
            </Typography>
          </Box>

          {/* icon modible */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <MonochromePhotosIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 0,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PHOTO SHARING
            </Typography>
          </Box>

          {/* Login _ Register des -> auth false */}
          {(!auth && <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
            {LoginRegister.map((page) => (
              <Button
                key={page}
                onClick={() => handleLoginRegister(page)}
                sx={{ my: 2, color: 'white', display: 'block', padding: '10px', margin: '0 10px' }}
              >
                {page}
              </Button>
            ))}
          </Box>)}

          {(auth && <Box>
            <IconButton onClick={handleProfile} sx={{ p: 0, m: 0 }}>
              {/* <Avatar
                alt="Remy Sharp"
                src={user.avatar}
                sx={{ mr: 3 }}
                onClick={handleProfile}
              /> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'initial',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'lavender',
                  textDecoration: 'none',
                }}
              >
                {user.first_name + " " + user.last_name}
              </Typography>
            </IconButton>
          </Box>)}

          {(auth && <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end' }}>



            <PostAddIcon
              onClick={handleNewPost}
              sx={{ my: 2, color: 'white', display: 'block', mr: 4, fontSize: 30 }}
            />

            <LogoutIcon
              onClick={handleLogout}
              sx={{ my: 2, color: 'white', display: 'block', mr: 4, fontSize: 30 }}
            />


          </Box>)}
        </Toolbar>
      </Container>
    </AppBar>
  );

}
export default TopBar;
