const { findOne } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const getProfile = async (req, res) => {
	try {
		const _id = req.params.id;
		
        const profileid = await findOne("profile", {_id});

        if(!_id) {
            return res.status(404).send({ status: 404, message: "No User Found" });
        }
		
		
		return res.status(200).send({ status: 200, profileid });
		
	} catch (e) {
		console.log(e);
		return res.status(400).send({ status: 400, message: e.message });
	}
};

module.exports = getProfile;
