import { toDataURL } from "qrcode";

const options = {
  width: 300,
  margin: 1,
};

export const getQRCode = (value) => {
  let qrValue = undefined;

  toDataURL(value, options, (err, url) => {
    if (err) {
      console.error(err);
      return;
    }
    qrValue = url;
  });

  return qrValue;
};