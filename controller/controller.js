const signupModel = require('../model/signupmodel');
const secretkey = 'secretkey'
const jwt = require('jsonwebtoken');
const productModel = require('../model/productmodel');
exports.signup = async (req, res) => {
    console.log("Singup api hit....")
    try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        // console.log(firstname, lastname, username, email, password);
        const data = new signupModel({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
        });
        console.log('data has reached to save....')
        const result = await data.save();
        console.log('data saved....')
        return res.status(200).json({
            message: "Succefully Signup..."
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error", err
        });
    }

};
exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log("login API hit...")
        const user = await signupModel.findOne({ email: email });
        //console.log(user);
        if (user.email === email && user.password === password) {
            const username = user.username
            const token = jwt.sign({ email: user.email }, secretkey);
            return res.status(200).json({ message: "User Verified...", token, email, username });
        }
        else {
            return res.status(202).json({
                message: "Ivalid Password...."
            })
        }
    }
    catch (err) {
        return res.status(202).json({
            message: 'Invalid User'
        })
    }
};
exports.addproduct = async function (req, res) {
    try {
        let name = req.body.name;
        let price = req.body.price;
        let category = req.body.category;
        let imageurl = req.image;
        const user = await productModel.create({
            name: name,
            price: price,
            category: category,
            image: imageurl,
        })
        user.save();
        return res.status(200).json({
            message: "Product Added",
            user,
        })
    }
    catch (err) {
        return res.send(err)
    }

}


exports.getproduct = async (req, res) => {
    try {
        const users = await productModel.find();
        if (users[0] == undefined) {
            return res.status(202).json({
                message: "No Product...."
            })
        } else {
            return res.status(200).json({
                message: "Your Search Is...", users
            })
        }
    }
    catch (err) {
        return res.status(202).send(err.message)
    }
}
exports.delete = async (req, res) => {
    try {
      console.log("delete API hit");
      const  name  = req.query.name; 
      console.log(name);
      const product = await productModel.findOneAndDelete({ name });
      console.log(product);
      return res.status(200).send({
        message: "Your product is deleted",
      });
    } catch (err) {
      return res.status(202).send(err.message);
    }
  }

  exports.update = async (req, res) => {
    try {
      console.log("update API hit");
      const  name  = req.query.name; 
      console.log(name);
      const product = await productModel.findOneAndUpdate({ name } ,
         {
        $set: {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
      }
    );
      console.log(product);
      return res.status(200).send({
        message: "Your product is Updated",
      });
    } catch (err) {
      return res.status(202).send(err.message);
    }
  };
  