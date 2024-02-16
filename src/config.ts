export const config = () => ({
    port1: process.env.PORT1 || 3000,
    port2: process.env.PORT2 || 5000,
    mongoUri: process.env.DATABASE_URI
})