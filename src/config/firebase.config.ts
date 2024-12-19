export default () => ({
    firebase: {
        type: process.env.FIREBASE_TYPE,
        projectid: process.env.FIREBASE_PROJECT_ID,
        privatekeyid: process.env.FIREBASE_PRIVATE_KEY_ID,
        privatekey: process.env.FIREBASE_PRIVATE_KEY,
        clientemail: process.env.FIREBASE_CLIENT_EMAIL,
        clientid: process.env.FIREBASE_CLIENT_ID,
        authuri: process.env.FIREBASE_AUTH_URI,
        tokenuri: process.env.FIREBASE_TOKEN_URI,
        authcert: process.env.FIREBASE_AUTH_CERT_URL,
        clientcert: process.env.FIREBASE_CLIENT_CERT_URL,
        universaldomain: process.env.FIREBASE_UNIVERSAL_DOMAIN
    }
})