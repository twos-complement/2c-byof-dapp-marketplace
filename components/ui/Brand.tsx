import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Typography } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoSquare = styled.div`
  ${({ theme }) => css`
    width: 25px;
    height: 25px;
    background-color: ${theme.colors.green};
    margin-right: 10px;
  `}
`;

const Brand = () => (
  <Container>
    <LogoSquare />
    <Typography variant="h6">
      The Marketplace 
    </Typography>
  </Container>
);

export default Brand;