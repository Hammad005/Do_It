const mongoose = require('mongoose');
const dns = require('dns/promises');
dns.setServers(['1.1.1.1']);

const connectDB = async () => {
    //
    // console.log(await dns.getServers());
    
    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            dbName: 'Do-It',
        });
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;