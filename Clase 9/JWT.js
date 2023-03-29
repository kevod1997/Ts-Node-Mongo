import express from "express"
import jwt from "jsonwebtoken"

const tokenKey = "1lkj23lkJ=)(=)klJK=)(=)ioijk=)(I9opijOJI=)("

const app = express() 

app.get("/", (req, res) => {
    res.send(" <h1> JWT </h1> ")
})

//username + password 
//  body de la peticion (JSON o Form)
//  URL de la peticion ( /:username/:password  ó  ?username=aaa&password=aaa)

app.post("/login", (req, res) => {
    //Valido las credenciales 
    const payload = {
        username: "calitos_"
    }

    const token = jwt.sign(payload, tokenKey, {expiresIn: "8d"})

    //res.json({ ok: true , token: token })
    res.json({ ok: true , token })
})


const AuthenticationMiddleware = (req, res, next ) => {
    const token = req.header("Authorization")

    try{
        //jwt.verify(token, tokenKey, (err, data)=>{} )
        //const payload = jwt.verify(token, tokenKey)
        req.payloadToken = jwt.verify(token, tokenKey)
        next()
    }
    catch(error){
        res.json({ok: false, error})
    }
}


app.get("/verToken", AuthenticationMiddleware, (req, res) => {
    res.json( req.payloadToken )
})

app.listen(8080)