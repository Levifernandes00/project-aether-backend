const User = require('./../models/User');

module.exports = {

    async getUserById(req, res) {
        const { id } = req.headers;

        const user = await User.findById(id);

        return res.json(user);
    },

    async getUserByEmail(req, res) {
        const { email } = req.headers;

        const user = await User.findOne({ email });

        if(!user){
            return res.json({ error: "user does not exists" });
        }

        return res.json(user);
    },

    async store(req, res) {
        const { name, email, phoneNumber, photoURL, resumeURL } = req.body;

        if(!name || !email || !phoneNumber){
            if(! name) 
                return res.status(400).json({ error: "No name" });
            if(! email) 
                return res.status(400).json({ error: "No email" });
            if(! phoneNumber){

            }
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

    async updateUser(req, res) {
        const { name, email, phoneNumber, photoURL, resumeURL } = req.body;
        const { userId } = req.params;
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


        const user = await User.updateOne({ _id: userId }, query);

        return res.json(user);
    },

    async getUsers(req, res) {
        const users = await User.find();

        return res.json(users);
    },

}