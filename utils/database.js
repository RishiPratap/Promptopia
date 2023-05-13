import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
     mongoose.set('strictQuery', false);

    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    } 

    try{
        await mongoose.connect(process.env.DATABASE_URL, {
            dbName: "Promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('=> using new database connection');
    }catch(err){
        console.log(err)
    }
}
