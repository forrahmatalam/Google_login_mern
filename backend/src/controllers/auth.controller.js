

 export const testAuth =  (req, res) => {
   res.send('Hello from test controller')
}

export const googleLogin = async (req, res) => {
    try{
res.send('Hello from google controller')
    }catch(err){
        res.status(400).send(err)
    }
}

