import React, { useEffect, useState } from "react";

import { GetAccountFromKeystore } from "../../helpers/crypto";

const ImportFromFilerBodyComponent = ({ cb, defaultPath }) => {
  let fileReader;

  useEffect(() => {
    if (defaultPath) {
      handleFileChosen(defaultPath);
    }
  });

  const handleFileRead = () => {
    const content = fileReader.result;
    cb(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <>
      <input
        className="form-file-input form-control"
        type="file"
        id="input-file"
        accept=".json"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
    </>
  );
};

const Keystore = ({ cb, back }) => {
  const [keystore, setKeystore] = useState("");
  const [pwd, setPwd] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  return (
    <div className="modal-content">
      <div className="modal-header border-bottom-0">
        <h5 className="modal-title" id="exampleModalLabel">
          Connect with Key Store
        </h5>
      </div>
      <div className="modal-body">
        <form className="" >
          <div className="form-group">
            <ImportFromFilerBodyComponent cb={setKeystore} />
          </div>
          <div className="">{statusMessage}</div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={pwd}
              onChange={(x) => setPwd(x.target.value)}
            />
          </div>
          <button
            className="btn btn-rounded btn-info mb-2"
            onClick={(e) => {
              e.preventDefault();
              const account = GetAccountFromKeystore(keystore, pwd);
              if (account === null) {
                setStatusMessage("Invalid Password / Keystore");
              } else {
                setStatusMessage("Successfully got the account");
              }
              cb(account);
            }}
          >
            Submit
          </button>
          <div></div>
        </form>
      </div>
      <div className="modal-footer border-top-0 d-flex justify-content-center">
        <button
          onClick={back}
          type="button"
          className="back"
          data-dismiss="modal"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Keystore;
