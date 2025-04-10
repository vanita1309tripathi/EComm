const basicAuth=(req,res,next)=>{
    //Check if authorization header is empty
    const authHeader=req.headers("authorization");
    if(!authHeader){
        res.status(401).send("No authorization details found");
    }
    console.log(authHeader);
    //Extract Credentials
    const base64Cred=authHeader.replace("Basic","");
    //Decode Credentials
    const decodeCred= Buffer.from(base64Cred,'base64').toString('utf-8');
    console.log(decodeCred);
    const cred=decodeCred.split(':');

}
