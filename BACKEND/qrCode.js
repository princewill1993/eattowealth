import QRCode from "qrcode";

const url = "www.eattowealth.com";

// QRCode.toFile("qrcode.png", url, { version: 4, errorCorrectionLevel: "H" })
//   .then(() => {
//     console.log("QR code generated successfully");
//   })
//   .catch((err) => {
//     console.error("Error generating QR code", err);
//   });

const generateQR = async (url) => {
  try {
    await QRCode.toFile("qrcode.png", url, {
      version: 5,
      width: 1090,
      errorCorrectionLevel: "H",
    });
    console.log("QR code with high error correction generated successfully");
  } catch (err) {
    console.log("Error generating QR code", err);
  }
};

generateQR(url);
