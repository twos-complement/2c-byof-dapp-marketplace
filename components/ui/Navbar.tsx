import styled from "@emotion/styled";
import { css } from '@emotion/react';
import { AppBar, Link, Toolbar as MuiToolbar, Typography } from "@material-ui/core";
import UserAddress from '../UserAddress';
import { red } from "@material-ui/core/colors";

const Logo = styled.div`
  ${({ theme }) => css`
    width: 25px;
    height: 25px;
    background-color: ${theme.colors.green};
    margin-right: 10px;
  `}
`;

const Toolbar = styled(MuiToolbar)`
  ${({ theme}) => css`
    background-color: ${theme.palette.navbar.main};
    color: ${theme.palette.navbar.contrastText};
    display: flex;
    justify-content: space-between;
  `}
`;

const LogoLink = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    a, h6 {
      color: ${theme.colors.contrastLightText};
    }
  `};
`;

const Navbar = () => (
  <AppBar position='static'>
    <Toolbar>
      <LogoLink>
        <Logo />
        <Typography variant="h6">
          BYOD Marketplace 
        </Typography>
      </LogoLink>
      <UserAddress />
    </Toolbar>
  </AppBar>
);

export default Navbar;