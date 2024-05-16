import React, { useState , useEffect} from "react";
import { Button, Typography } from "@mui/material";
import "./styles.css";
import { useParams, Link } from "react-router-dom";
import models from "../../lib/fetchModelData";




/**
 * Define UserDetail, a React component of Project 4.
 */

function UserDetail() {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    models.fetchUser(userId).then((data) => {
      setUserInfo(data);
    });
  }, [userId]);
  console.log("userId:");
  console.log(userId);

  return (
    <>
      <Typography variant="h4">
        {" "}
        Name: {userInfo?.first_name} {userInfo?.last_name}{" "}
      </Typography>
      <Typography variant="h6"> Location: {userInfo?.location} </Typography>
      <Typography variant="h6">
        {" "}
        Description: {userInfo?.description}{" "}
      </Typography>
      <Typography variant="h6"> Occupation: {userInfo?.occupation} </Typography>
      <Link to={`/photos/${userId}`} key={userId}>
        <Button variant="contained" color="primary">
          {" "}
          View Photos{" "}
        </Button>
      </Link>
    </>
  );
}

export default UserDetail;
