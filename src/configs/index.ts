export default {
  serviceAccount: {
    type: process.env.SA_TYPE,
    projectId: process.env.SA_PROJECT_ID,
    privateKeyId: process.env.SA_PRIVATE_KEY_ID,
    privateKey: (process.env.SA_PRIVATE_KEY || '')?.replace(/\\n/gm, "\n"),
    clientEmail: process.env.SA_CLIENT_EMAIL,
    clientId: process.env.SA_CLIENT_ID,
    authUri: process.env.SA_AUTH_URI,
    tokenUri: process.env.SA_TOKEN_URI,
    authProviderX509CertUrl: process.env.SA_AUTH_PROVIDER,
    clientX509CertUrl: process.env.SA_CLIENT_X509,
  }
}
