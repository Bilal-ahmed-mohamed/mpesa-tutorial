import express from "express";
import dotenv from "dotenv";
import { getAccessToken } from "./lib/auth.js";
import { stkPush } from "./lib/stkPush.js";
dotenv.config();
const app  = express();
app.use(express.json())


// initate the stk push

// callback endpoint

app.post("/initiate", async (req,res) => {
 console.log("endpoint inafanya");
 try {
    // phonenumber , amoiunt , product_name

    const {phoneNumber , amount , productName} = req.body;

    // database logic to store transaction details 
    

    // 1. get access token
    const accessToken = await getAccessToken()

    // 2. initiate stk push
    const initateStkResponse = await stkPush(accessToken , phoneNumber , amount , productName)
      res.json({
        success: true,
        initateStkResponse
      })
    




 } catch (error) {
    res.status(500).json({
        success: false,
        error: error.message || "failed to get access token"
    })
 }
 
})

// callback endpoint
app.post('/callback' , async(req,res) => {
try {
     const stkCallbackData = req.body.Body;

     let status = null
     if (stkCallbackData.ResultCode === 0) {
      status = "Success"
     } else {
      status = "Failed"
     }
     
   //   database logic to update the transaction status
   // /status to be pending


     res.json({status, stkCallbackData})

   
} catch (error) {
   res.status(500).json({error: 'something went wrong'})
}
})
app.listen(3000, () => console.log("server started successfully")
 );

