import React from "react";
import CSVReader, { IFileInfo } from "react-csv-reader";

export const UploadFile = () => {
  const handleForce = (data: Array<any>, fileInfo: IFileInfo) => {
    console.log(data, fileInfo);
  };

  const handleDarkSideForce = (error: any) => {
    console.log("error", error);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <div>
      <h5 className="mb-5">Select CSV with Holders</h5>
      <CSVReader
        cssClass="csv-reader-input"
        onFileLoaded={handleForce}
        onError={handleDarkSideForce}
        parserOptions={papaparseOptions}
        inputId="ObiWan"
        inputName="ObiWan"
        inputStyle={{ color: "green" }}
      />
    </div>
  );
};
