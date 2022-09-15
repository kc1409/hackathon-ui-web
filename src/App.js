import logo from "./logo.svg";
import "./App.css";
import { Container, Drawer } from "@material-ui/core";
import DrawerMenu from "./Components/DrawerMenu";
import Image from "material-ui-image";

function App() {
  return (
    <div className="App">
      <Container
        maxWidth="md"
        style={{
          color: "#576490",
          paddingTop: 80,
          paddingHorizontal: 20,
          height: "100%",
          fontWeight: 900,
        }}
      >
        SAIL
      </Container>
      <Container
        maxWidth="md"
        style={{
          color: "#576490",
          paddingTop: 8,
          paddingHorizontal: 20,
          height: "100%",
        }}
      >
        Sentiment Analysis And Illustrations
      </Container>
      <Container
        maxWidth="md"
        style={{
          color: "#576490",
          paddingTop: 8,
          paddingHorizontal: 20,
          height: "100%",
          fontWeight: 200,
        }}
      >
        Welcome to SAIL , We have curated multiple fun sessions for you to
        explore. All the personal data gatherd and the results are confidential.
      </Container>
      <Container>
        <Image
          src={require("../src/assets/images/Psychologist.gif")}
          style={{ paddingLeft: 20 }}
        />
      </Container>

      <Container>
        <Button variant="contained" color="success">
          Success
        </Button>
      </Container>

      <DrawerMenu></DrawerMenu>
    </div>
  );
}

export default App;
