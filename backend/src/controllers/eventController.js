const { getEventsService } = require('../services/eventService');

const getEvents = async (req, res, next) => {
	try {
		const events = await getEventsService(req.user, req.query.date);
		res.json(events);
	} catch (error) {
		next(error);
	}
};

module.exports = { getEvents };
