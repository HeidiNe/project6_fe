import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { ImageListItem } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Comment from "../Comment";
import List from '@mui/material/List';





import models from "../../lib/fetchModelData";

const CustomTextField = styled(TextField)({
  '& .MuiInput-underline:before': {
    borderBottomColor: 'rgba(136, 136, 136, 0.8)',
    borderBottomWidth: '0.5px',
  },
  '&:hover fieldset': {
    borderColor: 'rgba(136, 136, 136, 0.8)',
    borderWidth: '1px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgba(136, 136, 136, 0.8)',
    borderBottomWidth: '1px',
  },
});



function UserCard({ user, userCurrent, post }) {
  const theme = useTheme();

  const [comment, setComment] = useState("");
  const [istFavorite, setIsFavorite] = useState(false);
  const [countFavorite, setCountFavorite] = useState(0);
  const [countComment, setCountComment] = useState(0);
  const [commentList, setCommentList] = useState([]);



  const handleFavoriteReact = (postID) => {

    models.fetchFavoriteReact(postID).then((data) => {
      console.log(data);
      setIsFavorite(!istFavorite);
      models.fetchFavoriteCount(postID).then((data) => {
        setCountFavorite(data.count);
      });
    });

  };


  const handleAddComment = (postID) => {
    const dataComment = {
      content: comment.trim()
    }
    console.log(dataComment);
    if (dataComment.content !== "") {
      models.fetchCommentAdd(postID, dataComment).then((data) => {
        console.log(comment);
        commentList.push(data);
        setCommentList(commentList);
        setComment("");
        models.fetchCommentCount(postID).then((data) => {
          setCountComment(data.count);
        });
      });

    }
  };



  useEffect(() => {
    models.fetchFavoriteCount(post._id).then((data) => {
      setCountFavorite(data.count);
    });
    models.fetchCommentCount(post._id).then((data) => {
      setCountComment(data.count);
    });
    models.fetchFavoriteCheck(post._id).then((data) => {
      setIsFavorite(data.isFavorite);
    });
    models.fetchCommentList(post._id).then((data) => {
      setCommentList(data);
      console.log(data);
    });


  }, [post._id]);


  return (
    <ImageListItem key={post.image}>
      <Card sx={{ display: 'flex' }}>

        <CardMedia
          component="img"
          sx={{ width: 550 }}
          image={post.image}
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto', width: '670px' }}>
            <CardHeader
              avatar={
                <Avatar
                  alt={user?.first_name + " " + user?.last_name}
                  src={user?.avatar}
                />
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={user?.first_name + " " + user?.last_name}
              subheader={post.time}
            />
            <CardContent sx={{ paddingTop: '5px', paddingBottom: 0, margin: 0 }}>
              <Typography variant="body1" color="CaptionText">
                {post.caption}
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
              <IconButton onClick={() => { handleFavoriteReact(post._id) }}
              >
                {istFavorite ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteIcon />}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {countFavorite}
              </Typography>
              <IconButton aria-label="share" >
                <ChatIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {countComment}
              </Typography>
            </CardActions>
            <Divider />
            <Container maxWidth="xl" sx={{overflowY:"auto", maxHeight: 300}}>
              <Box sx={{ bgcolor: '#cfe8fc', display: 'flex', flex:'1 1 auto' , flexGrow:1}} >
                <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                  {commentList.map((comment) => (
                    <Comment comment={comment} />
                  ))}
                </List>
              </Box>
            </Container>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', }}>
            <Avatar alt="Travis Howard"
              sx={{ mb: 2, mr: 2, ml: 4 }}
              src={userCurrent.avatar} />
            <CustomTextField
              multiline
              fullWidth
              variant="filled"
              placeholder="Write a caption..."
              sx={{ border: '0', mb: 2, mt: 1 }}
              value={comment}
              onChange={(e) => {
                console.log(comment)
                setComment(e.target.value)
              }}

            />
            <IconButton
              aria-label="fingerprint"
              color="secondary"
              sx={{ mb: 1, mt: 2, mr:4 }}
              onClick={() => { handleAddComment(post._id) }}
            >
              <SendIcon color="info" />
            </IconButton>
          </Box>

        </Box>
      </Card>
    </ImageListItem>
  );
}

export default UserCard;