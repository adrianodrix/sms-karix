/** 
import { Karix } from 'karix-api'

var client = new Karix({
    accountId: process.env.KARIX_ACCOUNT_ID,
    accountToken: process.env.KARIX_ACCOUNT_TOKEN,
    host: process.env.KARIX_HOST || "https://api.karix.io"
});

var message = {
  "channel": "sms",
  "source": "+5521960105675",
  "destination": [
    "+5544997563119"
  ],
  "content": {
    "text": "Hey, Rick. It's Rick.",    
  },  
}

client.sendMessage(message, (err, data) => {
  console.log(err || data);
}) 
*/