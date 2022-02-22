import React from "react";

export const NFTCollection = ({ collection }: any) => {
  console.log(collection);
  return (
    <tr>
      <td className="d-flex align-items-center">
        <img src={collection.image_url} className="nft-logo rounded-circle" alt="" />
        <p className="ms-2 mb-0">{collection.name}</p>
      </td>
      <td>{collection.stats.total_volume}</td>
      <td>{collection.stats.floor_price}</td>
      <td>{collection.stats.num_owners}</td>
      <td>{collection.stats.count}</td>
      <td></td>
    </tr>
  );
};
