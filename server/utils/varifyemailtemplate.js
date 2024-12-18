const VerifyEmailTemplate = ({ name, url }) => {
  return `
    <p>Dear ${name}</p>
    <p> thankyou for register at sasta ecom<p/>
    <a href=${url}> varify email</a>
    `;
};

export default VerifyEmailTemplate;
