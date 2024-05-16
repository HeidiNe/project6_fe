
import { Box, Typography, Container, Divider, TextField, Button, ImageListItem, Avatar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import React, { useState } from 'react';
import {useNavigate } from "react-router-dom";


import useUserStore from '../../store/UserStore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import models from '../../lib/fetchModelData';



const CustomTextField = styled(TextField)({
  '& .MuiInput-underline:before': {
    borderBottom: '', // Loại bỏ viền dưới trước khi nhập
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none', // Loại bỏ viền dưới sau khi nhập
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: 'none', // Loại bỏ viền dưới khi di chuột vào
  },
});


/**
 * Define UserDetail, a React component of noneProject 4.
 */

function NewPost() {
  const [imageUrl, setImageUrl] = useState(null);
  const { user } = useUserStore();
  const [image, setImage] = useState();
  const [caption, setCaption] = useState();
  const navigate = useNavigate();


  
  const handleBack = (event) => {
    setImageUrl(false);

  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  


  const handleSubmit = (event) => {
    event.preventDefault();

    const postData = {
      caption: caption,
      image: image,
    };
    models.fetchPostAdd(postData).then((data) => {
      if (data) {
        console.log(data);
        navigate("/profile")
      }
    });
  };

  return (
    <Box

      sx={{
        backgroundColor: 'rgba(16, 15, 15, 0.5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // overflow: 'auto',

      }}
    >

      <Container
        maxWidth="sm"

        sx={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          height: '95%',
          // overflow: 'auto'
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
          <IconButton color="primary" component="span" sx={{ pt: 1 }} onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h5"
            gutterBottom
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.025rem',
              color: 'inherit',
              textDecoration: 'none',
              pt: 1
            }}
          >
            Create new post
          </Typography>
          <Button 
            variant="text" sx={{ pt: 1 }}
            onClick={handleSubmit}
          >
            Share
          </Button>

        </Box>
        <Divider />

        <IconButton sx={{ p: 0, m: 0, mt: 2 }}>
          <Avatar alt="Travis Howard" src={user.avatar} sx={{ width: 30, height: 30 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'initial',
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            {user.first_name + " " + user.last_name}
          </Typography>
        </IconButton>
        <CustomTextField
          multiline
          fullWidth
          variant="standard"
          placeholder="Write a caption..."
          rows={4}
          sx={{ border: '0', mb: 2, mt: 1 }}
          value={caption}
          onChange={(e) => {
            console.log(caption)
            setCaption(e.target.value)}}
        />


        <Box>

          <Box sx={{
            width: '100%',
            height: 0,
            paddingBottom: '100%',
            position: 'relative',
            border: '1px solid rgba(191, 189, 189, 0.5)',
            borderRadius: '5px',
            boxSizing: 'border-box',
            display:'flex',
            justifyContent:'center',
          }}>

            <ImageListItem key={imageUrl} sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: 1,
            }}>
              {imageUrl && (
                <img
                  srcSet={imageUrl}
                  src={imageUrl}
                  alt="{item.title}"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </ImageListItem>
            {!imageUrl && (<label htmlFor="file-input">
              <Button
                component="span"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  mt:30
                }}
              >
                Chose a photo
              </Button>
            </label>)}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}

              onChange={(e) => {
                setImage(e.target.files[0]);
                handleFileChange(e)
              }}
            />

          </Box>

        </Box>


      </Container>
    </Box>




  );
}

export default NewPost;
