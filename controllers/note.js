const mongoose = require('mongoose');
const Note = require('../models/note');
const fs = require('fs');

exports.getAllNotes = (req, res, next) => {
	Note
		.find()
		// .select('_id name price')
		.exec()
		.then(notes => {
			const response = {
				count: notes.length,
				notes: notes.map(note => {
					return {
						_id: note._id,
						user_id: note.user_id,
						title: note.title,
						content: note.content,
						author_name: note.author_name,
						date: note.date,
						image: note.image
          }
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.getOneNote = (req, res, next) => {
    const noteId = req.params.noteId;
    Note
        .findById(noteId)
        .select('_id title content user_id author_name date image')
        .exec()
        .then(note => {
            return res.status(201).json(note);
        })
        .catch(error => {
            next(error);
        });
};

exports.createOneNote = (req, res, next) => {
	const note = createNote(req);

	note
		.save()
		.then(note => {
			res.status(200).json({
				message: 'Note Added Successfully!',
				note: {
          _id: note._id,
					user_id: note.user_id,
          title: note.title,
          content: note.content,
					date: note.date,
					image: note.image
				}
			});
		})
		.catch(error => {
			next(error);
		});
};


exports.deleteOneNote = (req, res, next) => {
	const noteId = req.params.noteId;
	Note
		.remove({ _id: noteId })
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted Note Successfully!',
				result: result
			});
		})
		.catch(error => {
			next(error);
		});
};


function createNote(req) {
	return new Note({
		_id: new mongoose.Types.ObjectId(),
		user_id: req.body.user_id,
		title: req.body.title,
		content: req.body.content,
		author_name: req.body.author_name,
		date: req.body.date,
		image	: req.file.path
	});
}
