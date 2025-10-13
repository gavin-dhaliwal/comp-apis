export const magicLinkTemplate = url => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f5;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .content {
            padding: 40px 30px;
        }
        .content h2 {
            color: #1f2937;
            font-size: 22px;
            margin-bottom: 16px;
        }
        .content p {
            color: #6b7280;
            font-size: 16px;
            margin-bottom: 16px;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .magic-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 48px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .magic-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .info-box {
            background-color: #f9fafb;
            border-left: 4px solid #667eea;
            padding: 16px;
            margin: 24px 0;
            border-radius: 4px;
        }
        .info-box p {
            margin: 0;
            font-size: 14px;
            color: #4b5563;
        }
        .footer {
            background-color: #f9fafb;
            padding: 24px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer p {
            color: #9ca3af;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        .security-notice {
            color: #ef4444;
            font-size: 14px;
            margin-top: 24px;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            .header {
                padding: 30px 20px;
            }
            .header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Verify Your Login</h1>
            <p>Secure authentication request</p>
        </div>
        
        <div class="content">
            <h2>Hello there!</h2>
            <p>We received a request to sign in to your account. Click the button below to verify your identity and complete your login.</p>
            
            <div class="button-container">
                <a href="${url}" class="magic-button">Verify & Sign In</a>
            </div>
            
            <div class="info-box">
                <p><strong>⏱️ This link will expire in 5 minutes</strong></p>
                <p>For your security, this magic link can only be used once.</p>
            </div>
            
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #667eea; font-size: 14px;">${url}</p>
            
            <p class="security-notice">⚠️ <strong>Didn't request this?</strong><br>
            If you didn't try to sign in, please ignore this email. Your account remains secure.</p>
        </div>
        
        <div class="footer">
            <p>This email was sent by <strong>Your Company Name</strong></p>
        </div>
    </div>
</body>
</html>
    `;
};
