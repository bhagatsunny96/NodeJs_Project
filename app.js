// BACK-END

const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const Employees = require(path.join(__dirname+'/models/employee'));
const app = express();
const axios = require("axios");
const { table } = require("console");
mongoose.connect('mongodb://localhost/Demo-Project', {useNewUrlParser: true, useUnifiedTopology: true});
const con = mongoose.connection;
con.on("open",()=>{
    console.log("Database connection done....");
});
const port = 80;


app.use(express.urlencoded());
app.use(express.json());
app.set("view engine","ejs");

// END-POINTS...
app.get('/', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname+'/views/index.html'));
})

app.get('/home', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname+'/views/index.html'));
})

app.get('/index.html', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname+'/views/index.html'));
})

app.get('/registration', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname+'/views/registration.html'));
})
app.get('/registration.html', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname+'/views/registration.html'));
})
app.get('/login', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname+'/views/login.html'));
})
app.get('/login.html', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname+'/views/login.html'));
})


//Saving the form data : post request
app.post('/registration.html', (req, res)=>{
    var myData = new Employees(req.body);
    myData.save().then(()=>{
        res.status(200).sendFile(path.join(__dirname+'/views/success.html'));
    }).catch(()=>{
        res.status(400).send("Oops!! Something went wrong. Please try again after some time.")
    });
})

app.post('/login.html', async(req, res)=>{
    try {
        let email=req.body.email;
        let password=req.body.password;

        let e =await Employees.findOne({email:email});
        if(e.password===password)
        {
            axios.get("http://localhost/users")
                .then((response)=>{
                    res.status(200).render("mainpage.ejs",{Users:response.data,Email:email});
                }).catch((err)=>{
                    res.send(err);
                })
        }
        else
            res.send("You have entered wrong user credentials!!!!"); 
    } catch (error) {
        res.send("You have entered wrong user credentials!!!!");
    }
})

app.get('/update', (req, res)=>{
    axios.get("http://localhost/users",{params:{id:req.query.id}})
        .then((Data)=>{
            // console.log(id);
            res.render("update.ejs",{User:Data.data});
        }).catch((err)=>{
            res.status(400).send(err);
        })
    
})

app.post('/update', (req, res)=>{
    var myData = new Employees(req.body);
    myData.update().then(()=>{
        res.status(200).sendFile(path.join(__dirname+'/views/success.html'));
    }).catch(()=>{
        res.status(400).send("Oops!! Something went wrong. Please try again after some time.")
    });
})


const userRouter=require(path.join(__dirname+'/Routes/employees'));
app.use('/users',userRouter);

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
}); 