const Vendor = require("../models/Vendor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Secret = process.env.MYNAME;
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const usermail = await Vendor.findOne({ email });
    // console.log(usermail);
    if (usermail) {
      return res.status(401).json({ message: "this email is already taken" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newvendor = new Vendor({
      username,
      email,
      password: hashedpassword,
    });
    await newvendor.save();

    res.status(201).json({ message: "registration successfully" });
  } catch (error) {
    res.status(501).json({ message: "server side error" });
    console.log(error);
  }
};
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      res.status(401).json({ message: "incorrect email and password" });
    }
    const token = jwt.sign({ vendorId: vendor._id }, Secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "login successfully", token });
    // console.log(token);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "server side error" });
  }
};

const getAllvendors = async (req, res) => {
  try {
    const vendor = await Vendor.find().populate("Firm");
    res.json({ vendor });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "server is error" });
  }
};

const getVendorbyId = async (req,res)=>{
    const vendorId = req.params.id
    try{
const vendor = await Vendor.findById(vendorId).populate('Firm')
if(!vendor){
  return res.status(401).json({message:'vendor is not found'})
}

res.status(200).json({vendor})
    }catch(error){
        console.log(error)
        res.status(500).json({error:'internal servor error'})
    }
}
module.exports = { vendorRegister, vendorLogin, getAllvendors,getVendorbyId };
