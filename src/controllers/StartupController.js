const Startup = require('../models/Startup');
const User = require('../models/User');

module.exports = {

    async index(req,res){
        const { userid } = req.headers;
        const user = await User.findById(userid);
       
        const startups = await Startup.find( { 
            $and: [
                { responsible:{ $not: { $all: [userid] } } },
                { applies:{ $not: { $all: [user._id] } } },
                { jobs: { $exists: true, $not: {$size: 0} } }
            ]
        });

        return res.json(startups);
    },

    async getStartupByUser(req, res){
        const { userid } = req.headers;
   
        const startups = await Startup.find( { responsible: { $all: [userid] } } );

        return res.json(startups);
    },

    async getStartupByCategory(req, res){
        const { category } = req.params;
        const { userid } = req.headers;

        const user = await User.findById(userid);

        const startups = await Startup.find( { 
            $and: [
                { responsible:{ $not: { $all: [userid] } } },
                { applies:{ $not: { $all: [user._id] } } },
                { jobs: { $exists: true, $not: {$size: 0} } },
                { categories: { $all: [category] } }
            ]
        });

        return res.json(startups);
    },

    async store(req, res) {
        const { name, bio, imageURL, responsible, categories, jobs } = req.body;
        
        if(!name || !bio || !imageURL || !categories){
            return res.json({ error: "Information missing" });
        }

        const startupExists = await Startup.findOne({ name });

        if(startupExists) 
            res.status(400).json({ error: "Startup already exists" });

        const startup = await Startup.create({
            name,
            bio, 
            imageURL,
            categories,
            jobs,
            responsible,
        })
        
        return res.json(startup);
    },

    async update(req, res) {
        const { jobs, categories, name, imageURL, bio, responsible } = req.body;
        const { startupId } = req.params;
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

        if(responsible) 
            query.responsible = responsible;


        const startup = await Startup.updateOne({ _id: startupId }, query);

        return res.json(startup);
    },

}