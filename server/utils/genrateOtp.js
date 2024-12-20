import crypto from "crypto";

const GenrateOTP = () => {
  return crypto.randomInt(1000, 9999);
};

export default GenrateOTP;
