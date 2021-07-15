const mongoose = require('mongoose');
const Diary = require('../models/diary');

exports.getAllDays = (req, res, next) => {
	Diary
		.find()
		.exec()
		.then(days => {
			const response = {
				count: days.length,
				days: days.map(day => {
					return {
						_id: day._id,
						user_id: day.user_id,
						title: day.title,
						content: day.content,
						date: day.date,
          }
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.getOneDay = (req, res, next) => {
    const dayId = req.params.dayId;
    Diary
        .findById(dayId)
        .select('_id title content user_id date')
        .exec()
        .then(day => {
            return res.status(201).json(day);
        })
        .catch(error => {
            next(error);
        });
};

exports.createOneDay = (req, res, next) => {
	const day = createDay(req);

	day
		.save()
		.then(day => {
			res.status(200).json({
				message: 'Day Added Successfully!',
				memory: {
          _id: memory._id,
					user_id: memory.user_id,
          title: memory.title,
          content: memory.content,
					date: memory.date,
				}
			});
		})
		.catch(error => {
			next(error);
		});
};


exports.deleteOneDay = (req, res, next) => {
	const dayId = req.params.dayId;
	Diary
		.remove({ _id: dayId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted Day Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};


function createDay(req) {
	return new Diary({
		_id: new mongoose.Types.ObjectId(),
		user_id: req.body.user_id,
		title: req.body.title,
		content: req.body.content,
		date: req.body.date,
	});
}
