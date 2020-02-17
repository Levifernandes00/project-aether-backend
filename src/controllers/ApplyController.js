const Startup = require('./../models/Startup');
const User = require('./../models/User');

module.exports = {
    
    async apply(req,res) {
        const { startupId } = req.params;
        const { userid } = req.headers;

        const startup = await Startup.findById(startupId);
        const user = await User.findById(userid);

        if( !startup || !user) {
            return res.status(400).json({ error: "something went wrong" });
        }

        startup.applies.push(user._id);

        await startup.save();

        return res.json(startup);
    }




}