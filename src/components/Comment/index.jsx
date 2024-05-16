import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import models from '../../lib/fetchModelData';



function Comment ({ comment }) {

  const [userComment, setUserComment] = React.useState({});
  
  React.useEffect(() => {
    models.fetchUser(comment.user_id).then((data) => {
      setUserComment(data);
    });
  }, [comment.user_id]);  

  return (
    <Box>
      <Box>
      <ListItem alignItems="flex-start" sx={{padding:0, m:0}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={userComment?.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={userComment?.first_name + " " + userComment?.last_name}
          secondary={comment.time}
        />
      </ListItem>
        <Typography
          variant="subtitle1"
          color="black">
          {comment.content}
          </Typography>

      </Box>
      <Divider />
    </Box>
  )
}

export default Comment;