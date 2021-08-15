import styled from '@emotion/styled';
import { Avatar as MuiAvatar, Button, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { useWallet } from "../hooks/useWallet";
import { maskWallet } from "../util/address";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 25px;
  padding: 5px 15px 5px 15px;
  margin: 0 5px 0 5px;
`;

const WalletText = styled.div`
  margin-left: 10px;
`;

const Avatar = styled(MuiAvatar)`
  height: 32px;
  width: 32px;
`;



const UserAddress = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { web3Provider, address, connect, disconnect } = useWallet();

  const handleMenu = (event) => {
    setAnchorEl(event.target);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  }

  return (
    <Container>
      {web3Provider && address ? (
        <>
          <Button aria-controls="wallet-menu" aria-haspopup="true" onClick={handleMenu} variant="contained" color="secondary">
            <Avatar src="//www.gravatar.com/avatar/none?f=y&d=mm" sizes="xs" />
            <WalletText>{ maskWallet(address, 3) }</WalletText>
          </Button>
          <Menu id="wallet-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
          </Menu>
        </>
      ) : (
        <Button variant="contained" color="secondary" onClick={connect}>
          Connect Wallet
        </Button>
      )}
    </Container>
  )
}

export default UserAddress;
