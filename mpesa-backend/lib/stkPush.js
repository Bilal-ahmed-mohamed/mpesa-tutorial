const generateTimeStamp = () => {

    const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
   
    return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export async function stkPush(accessToken, phoneNumber , amount , productName) {
    try {
        // / shortcode , passkey . callbackurl 
    // phoneumbr , amount

    const shortCode  = process.env.MPESA_SHORTCODE
    const passkey = process.env.MPESA_PASSKEY
    const callbackUrl = process.env.MPESA_CALLBACK_URL

    const timestamp = generateTimeStamp();

    // convert to base64

    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');
    console.log(password);
    
    const requestBody = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PhoneNumber: phoneNumber,
        PartyB: shortCode,
        CallBackURL: callbackUrl,
        AccountReference: "turfs",
        TransactionDesc: "paymet of a turf"
    }

    const res = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(requestBody)
})

         const data = await res.json()
         console.log(data);
         

            return data;

    } catch (error) {
        console.log(error);
        
    }

    
}