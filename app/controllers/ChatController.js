Message = require('../models/Message');
Chat = require('../models/Chat');

exports.createChat = (req, res) => {
    Chat.find({
        $or: [
            {
                $and: [
                    { first_member: req.userId },
                    { second_member: req.body.second_member },
                ]
            },
            {
                $and: [
                    { first_member: req.body.second_member },
                    { second_member: req.userId },
                ]
            }
        ]
    }).then(data => {
        if(!data.length) {
            const chat = new Chat({
                first_member: req.userId,
                second_member: req.body.second_member
            });
            chat.save().then(data => {
                res.send({
                    message: "Chat is successfully created"
                });
            })
        } else {
            res.send({
                message: "Chat is already exist"
            });
        }
    });
};
exports.removeChat = (req, res) => {
    Chat.findByIdAndDelete(req.params.id).then(data => {
        res.send({
            message: 'Chat was successfully deleted'
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.status(404).send({message: 'Chat was not found with provided id'});
            return;
        }
        res.status(500).send({message: err});
    })
}