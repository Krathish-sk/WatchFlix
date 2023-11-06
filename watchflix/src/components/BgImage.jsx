import styled from "styled-components";
import bImage from "../assets/login.jpg";

export default function BgImage() {
  return (
    <Container>
      <img src={bImage} alt="background" />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
`;
