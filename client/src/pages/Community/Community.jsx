import { AddCircle } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import React from "react";

const Community = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          display: "flex",
          backgroundColor: "white",
          borderRadius: 2,
          p: 2,
          m: 1,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
        }}
      >
        <TextField
          color="success"
          sx={{ width: "100%" }}
          placeholder="Add Post"
        />
        <Button color="success" variant="contained" sx={{ ml: -5 }}>
          <AddCircle />
        </Button>
      </Box>
      <Box
        sx={{
          width: 400,
          height: 400,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          contain: "content",
          m: 1,
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 25,
              height: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              contain: "content",
              marginRight: "5px",
            }}
          >
            <img
              src={"http://localhost:8000/" + user.Image}
              alt=""
              style={{ height: 25 }}
            />
          </Box>
          {user.firstName}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 300,
            contain: "content",
            // borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://dailytimes.com.pk/assets/uploads/2022/08/01/pets-3715733_1920.jpg"
            alt=""
            style={{
              height: "100%",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: 400,
          height: 400,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          contain: "content",
          m: 1,
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 25,
              height: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              contain: "content",
              marginRight: "5px",
            }}
          >
            <img
              src={"http://localhost:8000/" + user.Image}
              alt=""
              style={{ height: 25 }}
            />
          </Box>
          {user.firstName}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 300,
            contain: "content",
            // borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://dailytimes.com.pk/assets/uploads/2022/08/01/pets-3715733_1920.jpg"
            alt=""
            style={{
              height: "100%",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: 400,
          height: 400,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          contain: "content",
          m: 1,
        }}
      >
        <Box
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 25,
              height: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              contain: "content",
              marginRight: "5px",
            }}
          >
            <img
              src={"http://localhost:8000/" + user.Image}
              alt=""
              style={{ height: 25 }}
            />
          </Box>
          {user.firstName}
        </Box>
        <Box
          sx={{
            width: "100%",
            height: 300,
            contain: "content",
            // borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://dailytimes.com.pk/assets/uploads/2022/08/01/pets-3715733_1920.jpg"
            alt=""
            style={{
              height: "100%",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Community;
