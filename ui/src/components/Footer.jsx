import { Box } from "@mui/material";
import React from "react";
function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#272727",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        minHeight: "12%",
      }}
    >
      <Box
        sx={{
          color: "white",
          fontSize: "1em",
          fontWeight: "400",
          marginLeft: 6,
        }}
      >
        This assignment is made by Aakash Shivanshu for{" "}
        <span style={{ fontSize: "20px", fontWeight: "500", color: "teal" }}>
          Precize
        </span>
      </Box>
    </Box>
  );
}

export default Footer;
