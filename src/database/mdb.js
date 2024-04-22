'use strict';
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
// console.warn(MONGODB_URI);
if (!MONGODB_URI) {
  console.log(MONGODB_URI);
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

const connectMongo = async () => {
  try {
    // if (cached.conn) {
    //   return cached.conn;
    // }
    // if (!cached.promise) {
    //   const opts = {
    //     bufferCommands: false,
    //   };

    //   cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
    //     return mongoose;
    //   });
    //   cached.conn = await cached.promise;
    // }

    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });

    // if (cached.conn.readyState == 1) {
    //   return Promise.resolve(true);
    // }

    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log(error);
    // cached.promise = null;
    return Promise.reject(error);
  }
  // return cached.conn;
};

export default connectMongo;
