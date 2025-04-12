import jwt from 'jsonwebtoken'
const jwtAuth=(req,res,next)=>{

    // Read the token
    const token=req.headers['authorization'];

    //If no token, return error
    if(!token){
        res.status(401).send("Unauthorised access");

    }
    // Check if token is valid
    try{
       const payload= jwt.verify(token,'AuyVfihGQo');
       console.log(payload);
       req.userId=payload.userId;
       next();
    }
    catch(err){
        res.status(401).send("Invalid Token");
    }
   
}
export default jwtAuth;
//  The basic idea:
// User logs in → server verifies the user → creates a token.

// That token contains encoded info (like email or userId).

// The client (browser/frontend) stores the token (e.g., in localStorage).

// On every next request, the client sends that token in the Authorization header.

// The server uses jwt.verify() to check if it's valid and not expired.

