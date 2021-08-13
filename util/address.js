export function maskWallet(address = "", width = 10) {
    if (!address) {
      return "";
    }
    return `${address.slice(0, width)}...${address.slice(-width)}`;
  }