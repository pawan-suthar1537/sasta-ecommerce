const ForgotPasswordTemplate = ({ name, otp }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 320px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #e74c3c; border-radius: 8px 8px 0 0;">
                            <i class="fas fa-key" style="font-size: 48px; color: #ffffff;"></i>
                            <h1 style="color: #ffffff; font-size: 24px; margin: 10px 0 0;">Reset Password</h1>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 20px;">
                            <p style="font-size: 16px; line-height: 1.5; color: #333333; margin: 0 0 15px;">Dear ${name},</p>
                            <p style="font-size: 14px; line-height: 1.5; color: #666666; margin: 0 0 20px;">We received a request to reset your password. Use the following One-Time Password (OTP) to proceed:</p>
                            <table role="presentation" style="margin: 0 auto;">
                                <tr>
                                    <td style="border-radius: 4px; background-color: #f1c40f; padding: 10px 20px;">
                                        <span style="font-size: 24px; font-weight: bold; color: #333333; letter-spacing: 5px;">${otp}</span>
                                    </td>
                                </tr>
                            </table>
                            <p style="font-size: 14px; line-height: 1.5; color: #666666; margin: 20px 0 0;">This OTP will expire in 1 Hour. If you didn't request a password reset, please ignore this email.</p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; text-align: center; background-color: #f8f8f8; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; font-size: 12px; color: #888888;">
                                <i class="fas fa-shield-alt" style="margin-right: 5px;"></i> 
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      
      `;
};

export default ForgotPasswordTemplate;
