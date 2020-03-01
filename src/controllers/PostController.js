const Post = require('./../models/Post');
const User = require('./../models/User');
const Startup = require('./../models/Startup');

module.exports = {
    
  async postProfile(req,res) {
    const {filename: key, mimetype } = req.file;
    const { userid } = req.headers;
 
    const url = `/files/${key}`;
    let query = {};

    if(mimetype === 'application/pdf'){
      query.resumeURL = url;
    }
    else {
      query.photoURL = url;
    }
    const response = await User.updateOne({ _id: userid }, query);

    return res.json(response);
  },

  async postStartup(req,res) {
    const {filename: key, mimetype } = req.file;
    const { startupid } = req.headers;
 
    const url = `/files/${key}`;
 
    
    const response = await Startup.updateOne({ _id: startupid }, { imageURL: url });

    return res.json(response);
  },


  async find(req,res) {
    const post = await Post.find();

    return res.json(post);
  },
}