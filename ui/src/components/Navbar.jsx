import { Box } from "@mui/material";
import React from "react";

function Navbar() {
  return (
    <Box
      sx={{
        backgroundColor: "#272727",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        minHeight: "15%",
        width: "100%",
        position: "absolute",
      }}
    >
      <Box
        sx={{
          color: "white",
          fontSize: "2.5em",
          fontWeight: "bold",
          marginLeft: 6,
        }}
      >
        SAT SCORE
      </Box>
    </Box>
  );
}

export default Navbar;
