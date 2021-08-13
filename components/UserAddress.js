import { useWallet } from "../hooks/useWallet";
import { maskWallet } from "../util/address";

const UserAddress = () => {
  const { web3Provider, address, connect, disconnect } = useWallet();
  return (
    <>
      {web3Provider && address ? (
        <>
         <button onClick={disconnect}>{ maskWallet(address) }</button>
        </>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </>
  )
}

export default UserAddress;
