import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1.5rem;
  }
`;

const Brand = () => (
  <Container>
    <Typography variant="h6">
      <span>🥂</span> BYOF Marketplace 
    </Typography>
  </Container>
);

export default Brand;