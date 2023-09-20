const express =  require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '=',
    credentials: true,
    optionSuccessfulStatus: 200
}
app.use(cors(corsOptions))

const port = 8080
const server = app.listen(port,()=>{
    console.log(`server is running on port ${port}, Testing 1,2,3...`)
})

// install nodejs(LTS version) and npm
// add "proxy" : "http://localhost:8080" in the package.json of front end once the front end is setup
// type npm start after going to server folder to start the server
 