const {S3Client, GetObjectCommand, PutObjectCommand, S3}  = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const dotenv=require('dotenv')
dotenv.config()

const client =new S3Client({
    region:'eu-north-1',
    credentials:{
        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey:process.env.SECRET_KEY
    }
})

const getDataURL=async(key)=>{

    // with the help of these command object, and getSignedUrl, this will create a pre-signed url for GET OBJECT

const command=new GetObjectCommand({
    Bucket:'aditya-rawat-bucket-1',
    Key:key
})
const url=await getSignedUrl(client,command);
    console.log( url);
return url;
}

// getDataURL('sky.png')

// putting object

const putDataURL=async (fileName,contentType)=>{
    const command=new PutObjectCommand({
        Bucket:'aditya-rawat-bucket-1',
        Key:`uploads/${fileName}`,
        ContentType:contentType
    })
    const url=await getSignedUrl(client,command);
    console.log(url);
return url
}

putDataURL(`image-${Date.now()}.png`,"image/png")






