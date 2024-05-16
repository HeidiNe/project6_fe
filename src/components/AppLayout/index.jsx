import React from "react";
import { Grid, Paper } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import TopBar from "../TopBar";
import UserList from "../UserList";
import UserDetail from "../UserDetail";
import UserPhotos from "../UserPhotos";
import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import NewPost from "../NewPost";

import useUserStore from '../../store/UserStore';
import models from "../../lib/fetchModelData";




const AppLayout = (props) => {
  const { auth, setAuth } = useUserStore();
  const {setUser} = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
      models.fetchUserProfile().then((data) => {
        setUser(data);
      });
    } else {
      setAuth(false);
      navigate("/login");   
    }

  }, [auth]);




  return (
    <Grid
      container
      spacing={1}
      direction="column"
      style={{ height: "100vh" }}
    >
      <Grid item>
        <TopBar />
      </Grid>

      <Grid container item style={{ flexGrow: 1  }}>
        {!!auth && (
          <Grid item sm={3} style={{ display: "flex" , padding:"0 2.5px 0 5px"}}>
            <Paper className="main-grid-item" style={{ flexGrow: 1 }}>
              <UserList loginUser={auth} />
            </Paper>
          </Grid>
        )}

        <Grid
          item
          sm={auth ? 9 : 12}
          style={{
            display: "flex",
            position: "relative",
            flexGrow: 1,
            padding: "0 5px 0 2.5px",
            
          }}
        >
          <Paper className="main-grid-item" style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/login" element={!auth && <Login />} />
              <Route path="/register" element={!auth && <Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/newpost" element={<NewPost />} />
              <Route path="/users/:userId" element={<UserDetail />} />
              <Route path="/photos/:userId" element={<UserPhotos />} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AppLayout;
