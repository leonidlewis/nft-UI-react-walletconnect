import React, { useEffect, useState } from "react";
import Web3 from "web3";
import _ from "lodash";
import { erc721ABI } from "../ABI";
import { AbiItem } from "web3-utils";
import { client } from "../api";
import { NFTs } from "../constant";
import { CSVLink } from "react-csv";

const pageSize = 500;

export default function Collections() {
  const [owners, setOwners] = useState([]);
  const [ownerAddress, setOwnerAddress] = useState({} as any);
  const [csvData, setCsvData] = useState([] as any);
  const [loading, setLoading] = useState(true);
  const [nftInLoading, setNftInLoading] = useState(NFTs[0].name);
  // const web3 = new Web3(
  //   new Web3.providers.HttpProvider(
  //     "https://mainnet.infura.io/v3/7508f7ba9c264307bb581a120634b6f5"
  //   )
  // );
  let tokenIndex: number = 0;
  let currentAddress: string = NFTs[tokenIndex].address;

  useEffect(() => {
    getOwners(0);
  }, []);

  let lists: any = {};
  let owners_all: any = {};
  let owner_list: any = {};

  const getOwners = (offset: number, token?: any) => {
    const address = token ? token.address : currentAddress;
    client(address)
      .get(
        `/owners?chain=eth&chain_name=mainnet&format=decimal&offset=${offset * pageSize
        }&order=token_id.ASC`
      )
      .then((res) => {
        const more: [] = res.data.result;
        if (more.length !== 0) {
          more.forEach((x: any) => {
            owner_list[x.owner_of] = 1;
          });
          offset++;
          getOwners(offset);
        } else {
          lists[tokenIndex] = owner_list;
          owners_all = { ...owners_all, ...owner_list };
          const ownerKeys = Object.keys(owners_all) as [];
          setOwners(Object.keys(owners_all) as []);
          setOwnerAddress(lists);
          setCsvData(
            [['0x', ...NFTs.map(nft => nft.name)],
            ...ownerKeys.map((owner) => [
              owner,
              ...NFTs.map((nft, ind) =>
                lists[ind] && lists[ind][owner] ? 1 : 0
              ),
            ])
            ]
          );
          tokenIndex++;
          owner_list = {};

          if (tokenIndex < NFTs.length) {
            setNftInLoading(NFTs[tokenIndex].name);
            currentAddress = NFTs[tokenIndex].address;
            getOwners(0, NFTs[tokenIndex]);
          } else {
            setLoading(false);
          }
        }
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between px-4">
        <div >
          {loading && <h5 className="float-start">Loading... {nftInLoading}</h5>}
        </div>
        <div>
          <h1>Holders</h1>
        </div>
        <CSVLink data={csvData}>Download CSV</CSVLink>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">0x</th>
            {NFTs.map((nft, index) => (
              <th key={index} className={nft.style}>
                {nft.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {owners.length > 0 &&
            owners.map((owner: any, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{owner}</td>
                {NFTs.map((nft, ind) => (
                  <td key={ind}>
                    {ownerAddress[ind] && ownerAddress[ind][owner] ? 1 : 0}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
