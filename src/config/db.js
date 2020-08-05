const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log(`DB conectada: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    };
};

module.exports = connectDB; 