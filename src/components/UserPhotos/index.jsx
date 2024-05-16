import React, { useEffect } from "react";
import ImageList from '@mui/material/ImageList';

import UserCard from "../UserCard";

import { useState } from "react";
import { useParams } from "react-router-dom";
import models from "../../lib/fetchModelData";


function UserPhotos() {
  const { userId } = useParams();
  const [pots, setPots] = useState([]);
  const [user, setUser] = useState();
  const [userCurrent, setUserCurrent] = useState();


  useEffect(() => {
    models.fetchPostListByUser(userId).then((data) => {
      if (data.length > 0) {
        setPots(data);
      }
    });
    models.fetchUser(userId).then((data) => {
      setUser(data);
    });

    models.fetchUserProfile().then((data) => {
      setUserCurrent(data);
    });

  }, [userId]);

  return (
    <ImageList
      sx={{
        width: '100%', height: 835,
        alignItems: 'center',
        margin: 'auto',
        padding: '0',
      }}
      cols={1}
      rowHeight={560}>
      {pots?.map((item) => (
        <UserCard key={item._id} user={user} post={item} userCurrent={userCurrent}/>
      ))}
    </ImageList>
  );
}

export default UserPhotos;
