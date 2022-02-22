import { InjectedConnector } from '@web3-react/injected-connector'
import {
  MAIN_NET_ID,
  RINKEBY_NETWORK_ID,
  KOVAN_NETWORK_ID,
  GETH_NETWORK_ID,
} from '../constants/network.id'

export const injected = new InjectedConnector({
  supportedChainIds: [MAIN_NET_ID, RINKEBY_NETWORK_ID, KOVAN_NETWORK_ID, GETH_NETWORK_ID],
})

// export const walletconnect = new WalletConnectConnector({
//   rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
//   qrcode: true,
//   pollingInterval: 3000
// })
