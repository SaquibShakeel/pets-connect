import { useCallback, useEffect, useState } from "react";
import { generate as shortid } from "shortid";

import { getQRCode } from "./QRCode";

const ShowQRCode = ({url}) => {
  const [qr, setQr] = useState("");

  const generateQRCode = useCallback(() => {
    const qrValue = getQRCode(url);
    if (!qrValue) return;
    setQr(qrValue);
  }, [url, setQr]);

  const downloadFile = useCallback(() => {
    const elm = document.createElement("a");
    elm.href = qr;
    elm.download = shortid();
    elm.click();
  }, [qr]);

  useEffect(() => {
    generateQRCode();
    }, []);

  return (
    <>
      {qr && (
        <div className="flex flex-col items-center justify-center relative group">
          <img src={qr} className="rounded-lg" />
          <div
            className="p-0 bg-black w-[300px] h-[300px] rounded-lg absolute top-0 left-0 opacity-0 group-hover:opacity-75 flex items-center justify-center text-2xl font-semibold z-10 cursor-pointer"
            onClick={downloadFile}
          >
            Download
          </div>
        </div>
      )}
    </>
  );
};

export default ShowQRCode;
