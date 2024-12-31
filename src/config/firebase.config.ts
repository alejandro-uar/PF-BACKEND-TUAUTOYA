export default () => {
    if(
        !process.env.FIREBASE_TYPE ||
        !process.env.FIREBASE_PROJECT_ID ||
        !process.env.FIREBASE_PRIVATE_KEY ||
        !process.env.FIREBASE_CLIENT_EMAIL ||
        !process.env.FIREBASE_CLIENT_ID ||
        !process.env.FIREBASE_AUTH_URI ||
        !process.env.FIREBASE_TOKEN_URI ||
        !process.env.FIREBASE_AUTH_CERT_URL ||
        !process.env.FIREBASE_CLIENT_CERT_URL
    ){
        throw new Error('Faltan variables de entorno de Firebase. Por favor revise su archivo .env.');
    }

    return {
        firebase: {
            type: process.env.FIREBASE_TYPE,
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            clientemail: process.env.FIREBASE_CLIENT_EMAIL,
            clientid: process.env.FIREBASE_CLIENT_ID,
            authuri: process.env.FIREBASE_AUTH_URI,
            tokenuri: process.env.FIREBASE_TOKEN_URI,
            authcert: process.env.FIREBASE_AUTH_CERT_URL,
            clientcert: process.env.FIREBASE_CLIENT_CERT_URL,
            universaldomain: process.env.FIREBASE_UNIVERSAL_DOMAIN
        }
    }
    
}