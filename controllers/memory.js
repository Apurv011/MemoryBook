const mongoose = require('mongoose');
const Memory = require('../models/memory');
const fs = require('fs');

exports.getAllMemories = (req, res, next) => {
	Memory
		.find()
		.exec()
		.then(memories => {
			const response = {
				count: memories.length,
				memories: memories.map(memory => {
					return {
						_id: memory._id,
						user_id: memory.user_id,
						title: memory.title,
						content: memory.content,
						author_name: memory.author_name,
						date: memory.date,
						image: memory.image
          }
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.getOneMemory = (req, res, next) => {
    const memoryId = req.params.memoryId;
    Memory
        .findById(memoryId)
        .select('_id title content user_id author_name date image')
        .exec()
        .then(memory => {
            return res.status(201).json(memory);
        })
        .catch(error => {
            next(error);
        });
};

exports.createOneMemory = (req, res, next) => {
	const memory = createMemory(req);

	memory
		.save()
		.then(memory => {
			res.status(200).json({
				message: 'Memory Added Successfully!',
				memory: {
          _id: memory._id,
					user_id: memory.user_id,
          title: memory.title,
          content: memory.content,
					date: memory.date,
					image: memory.image
				}
			});
		})
		.catch(error => {
			next(error);
		});
};

exports.deleteOneMemory = (req, res, next) => {
	const memoryId = req.params.memoryId;
	Memory
		.remove({ _id: memoryId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted Memory Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};


function createMemory(req) {
	var img;
	if (typeof req.file === "undefined"){
  	img = "images\\default_memory_pic.jpg";
  }
  else{
    img = req.file.path;
  }
	return new Memory({
		_id: new mongoose.Types.ObjectId(),
		user_id: req.body.user_id,
		title: req.body.title,
		content: req.body.content,
		author_name: req.body.author_name,
		date: req.body.date,
		image	: img
	});
}
