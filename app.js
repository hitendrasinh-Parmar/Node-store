const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// {"_id":{"$oid":"5f638fa84377d343d76eb560"},"name":"Hit","email":"hit@12.com","cart":{"items":{}}}
app.use((req, res, next) => {
    User.findById('5f68d1334a0ef00e28aa6c7c')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Hitendra:0LFvi0J1wGEfNKzI@cluster0.qm0uc.mongodb.net/shop?retryWrites=true&w=majority'
)
.then( result => {
  User.findOne().then( user => {
    if(!user){
      const user = new User({
        name:'hit',
        email: 'hit@hit.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
 
  console.log('connected!');
 
  app.listen(3000)})
.catch( err => console.log(err));



// 8th module completed
// 9 ih 7  tjPlWohwVZcvWTK4 157.32.254.230  
// mongodb+srv://hitendra:<password>@cluster0.ppfvb.mongodb.net/<dbname>?retryWrites=true&w=majority