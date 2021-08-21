const express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db = mongojs('mongodb://localhost:27017/tasty-fusion',['users','items','cart']);

const router = express.Router();

router.post("/register", (req, res) => {
    console.log(req.body.model.email);
  
    db.users.save(req.body.model, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send("success");
      }
    });
  });

  router.post("/check-login", (req, res) => {
    var email = req.body.email;
    console.log(email);
  
    var password = req.body.password;
  
    db.users.findOne(
      { email: req.body.email, password: req.body.password },
      (err, user) => {
        if (err || !user) {
          res.status(404).send("Not found");
        } else {
          console.log(user);
          res.send(user);
        }
      }
    );
  });




  router.get('/getItemData', (req,res) =>{
    db.items.find((err, items) =>{
        if(err)
            res.send(err);
        else
            res.send(items)
    })

});

router.put('/updateItems/:id', (req,res) =>{
    console.log(req.body.newItem);
    var updtObj = req.body.newItem;

    var newvalues = {
   $set: updtObj
}
    db.items.updateOne({_id:mongojs.ObjectId(req.params.id)}, newvalues, (err, result) =>{
        if(err){
            res.send(err);
        }
        else{
             db.items.find((err, items) =>{
             if(err)
                 res.send(err);
            else
                res.send(items);
            })
        }
    })
})

router.post('/createItem', (req,res)=>{
    db.items.save(req.body.items, (err, result)=>{
        if(err)
            res.send(err);
        else{
            db.items.find((err, items) =>{
             if(err)
                 res.send(err);
            else
                res.send(items)
            })
            
        }
    })

})


router.delete('/deleteItem/:id',function(req,res,next){
  db.items.remove({
      _id:mongojs.ObjectId(req.params.id)
  },'',function(err,result){
      if(err){
          res.send(err)
      }
      else{
          res.json(result);
      }
  });
});



router.post('/add-items-to-cart', (req,res) =>{
  console.log(req.body.addedItems);
  console.log(req.body._id);

  let cartPrice = 0;

  db.cart.findOne({_id:mongojs.ObjectId(req.body._id)},(err, cartData) =>{
     
      if(err || !cartData){ 
          console.log("not found")
          cartPrice = 0;

  db.cart.update(

  { _id: mongojs.ObjectId(req.body._id)}
, {
    $set: { totalPrice: cartPrice + req.body.addedItems.price }
  , $push: { items: req.body.addedItems        
  }
}, {upsert:true, new:true}, function(err, success){
     if (err) {
      console.log(err);
      res.status(500).send("Error");
      } else {
        res.status(200).send("cart updated");
      }
});
      }
      else{          
          console.log("found"); 
          cartPrice = cartData.totalPrice;     


var newQuantity = 0;
var updateFlag=false;
for(var i = 0; i < cartData.items.length; i++) {
if(cartData.items[i]._id == req.body.addedItems._id) {
  newQuantity = cartData.items[i].quantity + 1;
  console.log("req.body.addedItems.quantity" + newQuantity)
updateFlag = true;
  break;

}
else{
    continue;
}}

if(updateFlag == true){
  console.log("inside update");
db.cart.update( { _id: mongojs.ObjectId(req.body._id),
"items._id": req.body.addedItems._id},
{$set:{totalPrice: cartPrice + req.body.addedItems.price,
"items.$.quantity":  newQuantity}
},(err,result) =>{
  if(err){
      console.log(err);
      res.status(500).send("Error");
  }

  else{
      res.status(200).send("cart updated");
      console.log(result);
  }

})
}
else if(updateFlag == false){
    console.log("inside new");
  db.cart.update(
  { _id: mongojs.ObjectId(req.body._id),
  }
, {
    $set: { totalPrice: cartPrice + req.body.addedItems.price }
  , $push: { items: req.body.addedItems      
  }
}, {}, function(err, success){
     if (err) {
      console.log(err);
      res.status(500).send("Error");
      } else {

        res.status(200).send("cart added");
        console.log(success);
      }
});
}
     }
  })
 
})

router.get('/get-cart-details/:_id' , (req,res)=>{
  db.cart.find({_id:mongojs.ObjectId(req.params._id)}, (err,result) =>{
      if(err || !result){
          res.status(404).send("Cart data not found");
      }
      else{
          res.send(result);
      }

  })
});

router.delete('/clearCart/:_id', (req,res) =>{
  console.log("clear cart called");
   db.cart.remove({
      _id:mongojs.ObjectId(req.params._id)
  },'',function(err,result){
      if(err){
          res.send(err);
          res.status(500).send("Error");
      }
      else{
         res.status(200).send("Cart Data Deleted");
      }
  });

});

router.post('/delete-item' ,(req,res) =>{
   let cartPrice = 0;

  db.cart.findOne({_id:mongojs.ObjectId(req.body._id)},(err, cartData) =>{
      if(err){

      }

      else{
           cartPrice = cartData.totalPrice;    
           let oldQuantity = 0;

           for(var i = 0; i < cartData.items.length; i++) {
if(cartData.items[i]._id == req.body.itemToDel._id) {
  oldQuantity = cartData.items[i].quantity;
}
}

         db.cart.update(
  { _id: mongojs.ObjectId(req.body._id),
  }
, {
    $set: { totalPrice: cartPrice - (req.body.itemToDel.price * oldQuantity) }
  , $pull: { "items": { _id:req.body.itemToDel._id}
  }
}, {}, function(err, success){
     if (err) {
      console.log(err);
       res.status(500).send("Error");

  } else {
       res.status(200).send("cart item removed");
      console.log("success");
          //console.log(success)
      }
}); 
      }

  })

})

router.post('/decrease-item', (req,res) =>{

   let cartPrice = 0;

  db.cart.findOne({_id:mongojs.ObjectId(req.body._id)},(err, cartData) =>{
      if(err || !cartData){

      }
      else{          
          console.log("found"); 
          cartPrice = cartData.totalPrice;     


let newQuantity = 0;
var updateFlag=false;
for(var i = 0; i < cartData.items.length; i++) {
if(cartData.items[i]._id == req.body.itemToDecrement._id) {
  newQuantity = cartData.items[i].quantity - 1;
  console.log("req.body.itemToDecrement.quantity" + newQuantity)
updateFlag = true;
  break;

}
else{
    continue;
}}

if(updateFlag == true){
  console.log("inside update");
db.cart.update( { _id: mongojs.ObjectId(req.body._id),
"items._id": req.body.itemToDecrement._id},
{$set:{totalPrice: cartPrice - req.body.itemToDecrement.price,
"items.$.quantity":  newQuantity}
}, (err,result) =>{
  if(err){
      console.log(err);
      res.status(500).send("Error");
  }

  else{
      res.status(200).send("cart updated");
      console.log(result);
  }
})
}
      }
  })
})


module.exports = router;