export async function getAccessToken(params) {

    try {
    const consumerKey =  process.env.MPESA_CONSUMER_KEY
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET


//   convert to base 64


const auth = Buffer.from(`${consumerKey}:${consumerSecret }`).toString('base64')

const res = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials" , 
    {   method: 'GET',
        headers: {
            "Authorization": `Basic ${auth}`
        }
    }

)

  const data =  await res.json();
  return data.access_token
    } catch (error) {
        console.log(error);
        
    }
  
}