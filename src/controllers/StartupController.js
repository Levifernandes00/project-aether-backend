const Startup = require('../models/Startup');

module.exports = {

    async index(req,res){
        const { user } = req.headers;

        const startups = await Startup.find({
            $and: [
                { responsible:{ $not: { $all: [user] } }},
                { applies:{ $not: { $all: [user] } }}
            ]
        });

        return res.json(startups);
    },

    async store(req, res) {
        const { name, bio, imageURL, categories, jobs } = req.body;
        
        if(!name || !bio || !imageURL || !categories || !jobs){
            return res.json({ message: "Informations missing" });
        }
        
        // const { id } = req.header;
        const startupExists = await Startup.findOne({ name });

        if(startupExists) 
            res.json({ message: "Startup already exists" });

        const startup = await Startup.create({
            name,
            bio, 
            imageURL,
            categories,
            jobs
        })
        
        return res.json(startup);
    },

    async update(req, res) {
        const { jobs, categories, name, imageURL, bio } = req.body;
        const { id } = req.headers;
        let query = {};

        if(jobs) 
            query.jobs = jobs;

        if(categories) 
            query.categories = categories;

        if(name) 
            query.name = name;

        if(imageURL) 
            query.imageURL = imageURL;

        if(bio) 
            query.bio = bio;


        const startup = await Startup.updateOne({ _id: id }, query);

        return res.json(startup);
    },

}