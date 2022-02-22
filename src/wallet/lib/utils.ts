// import { Contract } from 'ethers'
// import { BigNumber } from '@ethersproject/bignumber'
// import * as PrysmNumber from '../../utils/big.number'
// import ethjsUnit from 'ethjs-unit'
// import * as ethApi from './eth.api'
// import ERC20ABI from '../constants/erc20.json'

export const web3Sign = async (token: string, address: any, library: any) => {
  const signature = await library.jsonRpcFetchFunc('personal_sign', [
    `Prysm One-Time Key : ${token}`,
    address,
  ])

  return signature
}

// export const getOwnAddressesWithBalance = async (account: string | undefined | null) => {
//   const addresses: any[] = []

//   const balances: any[] = []

//   if (account) {
//     const tokens = await ethApi.getTokensByAccount(account)
//     for (let i = 0; i < tokens.length; i++) {
//       if (tokens[i].contract_ticker_symbol == 'ETH') addresses.push('0x0')
//       else addresses.push(tokens[i].contract_address)

//       balances.push(PrysmNumber.toDecimal(tokens[i].balance, tokens[i].contract_decimals))
//     }
//   }
//   return {
//     addresses,
//     balances,
//   }
// }

// export const getBalanceByToken = async (
//   token,
//   library: any,
//   account: string | null | undefined,
// ) => {
//   if (token == null) return '0'
//   let balance = 0

//   try {
//     if (token.symbol === 'ETH') {
//       balance = (await ethApi.getEthBalance(account)) || 0

//       return PrysmNumber.toDecimal(balance.toString(), token.decimals)
//     }

//     const tixContract = new Contract(token.address, ERC20ABI, library.getSigner())
//     balance = await tixContract.balanceOf(account)
//     const decimals = await tixContract.decimals()

//     return PrysmNumber.toDecimal(balance.toString(), decimals)
//   } catch (err) {
//     console.log('getBalanceByToken', err)
//     return '0'
//   }
// }

// export const getEtherAmount = (amount) => {
//   if (amount == null || amount == '') return 0
//   const strAmount = PrysmNumber.toFixed(amount, 12)

//   return ethjsUnit.toWei(`${strAmount}`, 'ether').toString()
// }

// export const checkAllance = async (
//   sellTokenAddress,
//   proxyAddress,
//   amount: string,
//   library,
//   account,
// ): Promise<boolean> => {
//   const tix = new Contract(sellTokenAddress, ERC20ABI, library.getSigner())
//   const allowance = (await tix.allowance(account, proxyAddress)).toString()

//   console.log('checkAllance', { allowance, amount, proxyAddress, sellTokenAddress })
//   const r = PrysmNumber.compare(allowance, amount)
//   return r == -1
// }

// export const approveToken = async (
//   sellTokenAddress: string | null | undefined,
//   proxyContract: string,
//   account: string | null | undefined,
//   library: any,
// ) => {
//   const signer = library.getSigner()
//   const contract = new Contract(sellTokenAddress as string, ERC20ABI, library.getSigner())
//   console.log('approveToken 2', window.ethereum)
//   const maxApproval = BigNumber.from(2).pow(256).sub(1)
//   console.log('proxyContract', proxyContract)
//   const tix = await contract.approve(proxyContract, maxApproval)

//   const approvalTxData = {
//     from: account,
//     to: sellTokenAddress,
//     data: tix.getABIEncodedTransactionData(),
//   }
//   console.log('approveToken 2', approvalTxData)
//   return signer.sendTransaction(approvalTxData)
// }
