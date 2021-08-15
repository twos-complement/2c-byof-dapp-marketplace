import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  position: relative;
  height: 100vh;
  position: relative;
  background: url('/images/background.png');
  background-size: cover;

  :before {
    content: '';
    height: 100vh;
    width: 100%;
    position: absolute;
    background: rgba(31, 30, 34, 0.6);
    mix-blend-mode: multiply;
  }
`;

const GuestLayout = ({ children }) => (
  <Container>
    { children }
  </Container>
);

export default GuestLayout;