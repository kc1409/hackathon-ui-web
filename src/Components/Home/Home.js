import logo from "../../logo.svg";
import "./Home.css";
import { Container, Drawer } from "@material-ui/core";
import DrawerMenu from "../DrawerMenu";
import Image from "material-ui-image";
import Terms from "../TermsAndCondition";
function Home() {
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
          fontWeight: 200,
          fontSize: 12,
        }}
      >
        Welcome to SAIL , We have curated multiple fun sessions for you to
        explore. All the personal data gatherd and the results are confidential.
      </Container>
      <Container>
        <Image
          src={require("../../assets/images/Psychologist.gif")}
          style={{ paddingLeft: 20 }}
        />
      </Container>
      <Terms></Terms>
    </div>
  );
}

export default Home;
