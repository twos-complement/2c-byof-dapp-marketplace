import styled from '@emotion/styled';
import { Avatar, Typography } from '@material-ui/core';
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



const UserAddress = () => {
  const { web3Provider, address, connect, disconnect } = useWallet();
  return (
    <Container>
      <Avatar src="//www.gravatar.com/avatar/none?f=y&d=mm" sx={{ with: 40, height: 40 }} />
      {web3Provider && address ? (
        <button onClick={disconnect}>{ maskWallet(address) }</button>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </Container>
  )
}

export default UserAddress;
