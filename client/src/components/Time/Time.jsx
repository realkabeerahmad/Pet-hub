import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

// --------------------------------------------------

const Time = ({ Pet, setPet, time, timeName }) => {
  console.log(timeName);

  const deleteTime = () => {
    const data = { _id: Pet._id, timeId: time._id };
    var url = "";
    if (timeName === "meal") {
      url = "http://localhost:8000/pet/deleteMealTime";
    } else if (timeName === "walk") {
      url = "http://localhost:8000/pet/deleteWalkTime";
    }
    axios
      .post(url, data)
      .then((res) => {
        alert(res.data.message);
        // handleClose();
        axios
          .post("http://localhost:8000/pet/showPet", data)
          .then((r) => {
            setPet(r.data.pet);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        mb: 2,
        p: 1,
        borderBottom: "1px solid #c2c2c2",
      }}
    >
      <Box sx={{ width: "33%", fontWeight: 500 }}>
        {time.name.toUpperCase()}:
      </Box>
      <Box sx={{ width: "33%" }}>{String(time.time).slice(11, 16)}</Box>
      <Button onClick={deleteTime} color="error">
        <DeleteIcon />
      </Button>
    </Box>
  );
};

export default Time;
