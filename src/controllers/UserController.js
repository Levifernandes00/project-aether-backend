const User = require('./../models/User');

module.exports = {

    async getUserById(req, res) {
        const { id } = req.headers;

        const user = await User.findById(id);

        return res.json(user);
    },

    async store(req, res) {
        const { name, email, phoneNumber, photoURL, resumeURL } = req.body;

        if(!name || !email || !phoneNumber){
            return res.json({ message: "Missing Information" });
        }

        const userExists = await User.findOne({ email });
        if(userExists){
            return res.json({ message: "User already exists" });
        }
        
        const userAdded = await User.create({
            name,
            email,
            phoneNumber,
            photoURL,
            resumeURL,
        })

        return res.json(userAdded);
    },

    async update(req, res) {
        const { name, email, phoneNumber, photoURL, resumeURL } = req.body;
        const { id } = req.headers;
        let query = {};

        
        if(email) 
            query.email = email;
        
        if(name) 
            query.name = name;
        
        if(phoneNumber) 
            query.phoneNumber = phoneNumber;
        
        if(photoURL) 
            query.photoURL = photoURL;

        if(resumeURL) 
            query.resumeURL = resumeURL;


        const startup = await Startup.updateOne({ _id: id }, query);

        return res.json(startup);
    },

}