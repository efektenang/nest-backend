export const config = () => ({
    port: process.env.PORT || 3000,
    mongoUri: process.env.DATABASE_URI
})