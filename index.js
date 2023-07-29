const express = require('express');                           // import the installed express
const fb=require('./config');                                 // import the fibebase config
const db=fb.firestore();                                      // it is used to creat a db 
const app = express()                                  // create a new express application

app.use(express.urlencoded({extended:true}))                 //it is used to get information to the form from the backend 

app.set('view engine','ejs')                                  // set view engine

//GET METHOD 
app.get('/',async(req,res)=>{                                 //set get routing using call back function(req,res)
    const users=[]                                           
    const data = await db.collection('users').get()           //get a information from the DB
    data.forEach(e=>{users.push({...e.data(),id:e.id})})      //forEach is used to loop inside the every element (... spread operator)
    console.log(users);

    res.render('index', {data:users} )                       
})

//POST METHOD
 //set post routing 
app.post('/',async (req,res)=>{                                 

    console.log(req.body)                                       // req.body is used to check the data 
    //CREATE
    await db.collection('users').doc().set(req.body)            // Send a information to the DB(using a .set to send the (req.body) to the DB)
    res.redirect('/#saved') 
})

// GET > EDIT
app.get('/edit',async(req,res)=>{                               //set get EDIT routing using call back function(req,res)
    const id = req.query.id 
    const data= await db.collection('users').doc(id).get()      //get the particular doc id to edit the file from the DB
    console.log(data.data()); 
    if(data==undefined){
        res.redirect('/')
    }else{
    res.render('edit',{data:data.data()})                       //{data:data is used to send a data to the ejs}
}
})

//POST UPDATE METHOD
app.post('/edit',async (req,res)=>{
    const id=req.query.id                                       // using a query.id to update the edited document

    console.log(req.body)
    await db.collection('users').doc(id).update(req.body)       // it will used to update the value 
    res.redirect('/#saved')
})

//DELETE 
app.get('/delete',async(req,res)=>{
    const id=req.query.id      
    await db.collection('users').doc(id).delete()                //using a delect function to delete the particular document
    res.redirect('/#success')  
})

// email validation

app.get('/',(req,res)=> {
    res.sendfile('/index.ejs')
})
app.get('/emailvalidate',(req,res)=>{
    var email=req.query.email

    if(emailValidator.validate(email)){
        res.send("email is valid")

    }
    else{
        res.send("email is invalid")
    }
})



app.listen(3000,()=>console.log("Running Server..."))            // I have set the listen port in 3000




