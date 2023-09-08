const config = {
    NODE_ENV: process.env.NODE_ENV,
    NODE_PORT: process.env.NODE_PORT,
    DB: process.env.DB,
    DB_URI: process.env.DB_URI,
    SECRET_KEY_STRIPE: process.env.SECRET_KEY_STRIPE,
    TESTS_DB_URI: process.env.TESTS_DB_URI,
    PORT: process.env.PORT,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    SMTP_KEY: process.env.SMTP_KEY,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_SECURE_SSL: process.env.SMTP_SECURE_SSL,
    SMTP_SENDER_NAME: process.env.SMTP_SENDER_NAME,
    SMTP_SENDER_EMAIL_DEFAULT: process.env.SMTP_SENDER_EMAIL_DEFAULT,
};
  
export default config;