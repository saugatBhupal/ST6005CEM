const emailTemplates = {
  verificationEmailMessage: (username, token) => {
    return `
      <html>
        <head>
          <style>
            body {
              font-family: Albert Sans, Arial, sans-serif;
              background-color: #f4f7fa;
              margin: 0;
              padding: 0;
              color: #000000 !important;
            }
            .email-container {
              width: 50%;
              margin: 30px auto;
              background-color: #F7F9FC;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              padding: 20px;
              text-align: center;
            }
            .email-header {
              background-color: #001B6C;
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              font-size: 18px;
            }
            .highlight-username {
              font-weight: bold;
              color: #001B6C;
            }
            .email-content {
              margin: 20px 0;
              font-size: 14px;
              line-height: 1.6;
              color: #000000 !important;
            }
            .verification-code {
              background-color: #f0f8ff;
              border: 2px solid #001B6C;
              padding: 15px;
              font-size: 24px;
              font-weight: bold;
              color: #001B6C;
              margin: 20px 0;
              border-radius: 5px;
            }
            .footer {
              font-size: 14px;
              color: #777;
              margin-top: 20px;
              background-color: white;
              padding: 10px;
              border-radius: 0 0 8px 8px;
            }
            .footer a {
              color: #001B6C;
              text-decoration: none;
              font-weight: bold;
            }
            .footer p {
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              Verify Your Co-Sphere Account - Your Verification Code Inside
            </div>
            <div class="email-content">
              <p>Hello <span class="highlight-username">${username}</span>,</p>
              <p>Welcome to our Co-Sphere! We're thrilled to have you on board. To ensure the security of your account, we need to verify your email address. Please use the following verification code:</p>
              <div class="verification-code">
                ${token}
              </div>
              <p>Simply enter this code on the verification page to complete the process.</p>
              <p>If you didn't sign up for Co-Sphere or have any concerns about this email, please let us know immediately. Your security is our top priority.</p>
              <p>Thanks for choosing Co-Sphere. We can't wait for you to start engaging with the community!</p>
            </div>
            <div class="footer">
              Best,<br>
              The Co-Sphere Team<br><br>
              <a href="https://www.co-sphere.com/contact">Contact Us</a><br>
              <p>Need help? Visit our <a href="https://www.co-sphere.com/help">Help Center</a>.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  },

  verifiedEmailMessage: (username) => {
    return `Hello ${username},<br>
  
        Welcome to Co-Sphere! Your account (${username}) registered with this email has been verified.<br>
        
        Thanks for choosing Co-Sphere. We can't wait for you to start sharing your moments with the world!<br>
        
        Best,<br>
        The Co-Sphere Team`;
  },
  resetPasswordEmailMessage: (username, token) => {
    return `
            <html>
              <head>
                <style>
                  body {
                    font-family: Albert Sans, Arial, sans-serif;
                    background-color: #f4f7fa;
                    margin: 0;
                    padding: 0;
                    color: #000000 !important;
                  }
                  .email-container {
                    width: 50%;
                    margin: 30px auto;
                    background-color: #F7F9FC;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    text-align: center;
                  }
                  .email-header {
                    background-color: #001B6C;
                    color: white;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                    font-size: 18px;
                  }
                  .highlight-username {
                    font-weight: bold;
                    color: #001B6C;
                  }
                  .email-content {
                    margin: 20px 0;
                    font-size: 14px;
                    line-height: 1.6;
                    color: #000000 !important;
                  }
                  .verification-code {
                    background-color: #f0f8ff;
                    border: 2px solid #001B6C;
                    padding: 15px;
                    font-size: 24px;
                    font-weight: bold;
                    color: #001B6C;
                    margin: 20px 0;
                    border-radius: 5px;
                  }
                  .footer {
                    font-size: 14px;
                    color: #777;
                    margin-top: 20px;
                    background-color: white;
                    padding: 10px;
                    border-radius: 0 0 8px 8px;
                  }
                  .footer a {
                    color: #001B6C;
                    text-decoration: none;
                    font-weight: bold;
                  }
                  .footer p {
                    margin-top: 10px;
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="email-header">
                    Reset Your Co-Sphere Account Password
                  </div>
                  <div class="email-content">
                    <p>Hello <span class="highlight-username">${username}</span>,</p>
                    <p>We received a request to reset your password for your Co-Sphere account. If you made this request, please use the following code to reset your password:</p>
                    <div class="verification-code">
                      ${token}
                    </div>
                    <p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>
                    <p>For added security, this code will expire in 5 minutes. Please use it as soon as possible.</p>
                    <p>If you have any questions or concerns, feel free to contact our support team.</p>
                  </div>
                  <div class="footer">
                    Best,<br>
                    The Co-Sphere Team<br><br>
                    <a href="https://www.co-sphere.com/contact">Contact Us</a><br>
                    <p>Need help? Visit our <a href="https://www.co-sphere.com/help">Help Center</a>.</p>
                  </div>
                </div>
              </body>
            </html>
            `;
  },
};

module.exports = emailTemplates;
