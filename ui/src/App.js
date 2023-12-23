import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import "./index.css";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "absolute",
        height: "100%",
        width: "100%",
      }}
    >
      <Navbar />
      <Home />
      <Footer />
    </Box>
  );
};
function App() {
  return (
    <div style={{ height: "100%" }}>
      <Layout />
    </div>
  );
}

export default App;
