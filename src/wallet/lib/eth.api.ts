import axios from 'axios'

const ETH_API_KEY = 'ckey_f8deb1540c5842b887c1088f4e2'

export const getTokensByAccount = async (account: string) => {
  const response = await axios.get(
    `https://api.covalenthq.com/v1/1/address/${account}/balances_v2/?key=${ETH_API_KEY}`,
  )

  if (typeof response !== 'undefined' && response !== null)
    return response.data.data.items
  return []
}

export const getEthBalance = async (account: string) => {
  const response = await axios.post(
    'https://eth-mainnet.alchemyapi.io/v2/3H-t2bbn3UrVw1nCwMs9FNCqEmmGGySS',
    {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_getBalance',
      params: [account, 'latest'],
    },
  )
  return parseInt(String(response.data.result), 16)
}
