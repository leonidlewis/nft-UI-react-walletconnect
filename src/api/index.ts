import axios from 'axios'

export const client = (contract: string) => {
  const defaultOptions = {
    baseURL: `https://deep-index.moralis.io/api/nft/contract/${contract}`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'T1NrDBhIKsknoSi92rt8XDnW72lz08miVpNfsBcOB0JVjhZcm0mdtX4j7TRHd37d',
    },
    // baseURL: "https://api.opensea.io/api/v1/",
  }

  let instance = axios.create(defaultOptions)

  instance.interceptors.request.use((config: any) => {
    return config
  })

  return instance
}
