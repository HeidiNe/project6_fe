import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

import "./styles.css";
import models from "../../lib/fetchModelData";
import useUserStore from '../../store/UserStore';


function UserList() {
  const [userList, setUserList] = useState();
  const {setUserSelected} = useUserStore();

  useEffect(() => {
    models.fetchUserList().then((response) => {
      if(response.length > 0){
        setUserList(response);
      }
    });
  }, []);

  return (
    <div>
      <List component="nav">
        {userList?.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem sx={{ textDecoration: 'none' , fontFamily:"monospace"}}>
              <ListItemButton 
                component={Link} 
                to={`/users/${user._id}`} 
                sx={{ textDecoration: 'none', fontFamily:"monospace" }}
                onClick={() => {
                  console.log("userSelected :" );
                  console.log(user);
                  setUserSelected(user)}}
                
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={user.avatar} />
                </ListItemAvatar>
                <ListItemText 
                  primary={user.first_name + " " + user.last_name} 
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
