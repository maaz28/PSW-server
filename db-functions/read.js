var exports = module.exports = {},
    utilsFunctions = require('../utils/functions'),
    productModel = require('../models/product'),
    adminModel = require('../models/admin'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    constants = require('../utils/constant');





exports.authenticateAdmin = async (user) => {
    try {
        let admin = await adminModel.find({email: user.email});
        if (utilsFunctions.isEmpty(admin)) {
            throw new Error(constants.responseMessages.emailNotFound)
        }
        let match = await bcrypt.compare(user.password, admin[0].password);
        if (!match) {
            throw new Error(constants.responseMessages.passwordNotMatch);
        }

        let token = jwt.sign({id: admin[0]._id}, constants.secret, {
            expiresIn: 84600
        });

        let returningUser = admin[0].toObject();
        delete returningUser.password;


        return {auth: true, token: token, user: returningUser}

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};


exports.getAllProducts = async () => {
  try {
      return productModel.find({});
  }  catch (e) {
      console.log(e);
      throw new Error(e);
  }
};

exports.getProductByCategory = async (category) => {
    try {
       return await productModel.find({category});
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

//
// exports.getEventById = async (eventId) => {
//     try {
//         let event = await eventModel.findById(eventId);
//         if (!event) {
//             throw new Error("No event found with given Id")
//         }
//         let eventObject = event.toObject();
//         delete eventObject.user.id;
//
//         return eventObject;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
// exports.getInvitations = async (userId) => {
//     try {
//         let user = await userModel.findById(userId)
//             .populate({
//                 path: 'invitations.sender',
//                 model: 'User'
//             }).populate({
//                 path: 'invitations.event',
//                 model: 'Event'
//             });
//         let invitations = [];
//         for (let i = 0; i < user.invitations.event.length; i++) {
//             invitations.push(user.invitations.event[i].toObject());
//             invitations[i].invitor_name = user.invitations.sender[i].name;
//             invitations[i].invitor_email = user.invitations.sender[i].email;
//         }
//         if (!user) {
//             throw new Error("No user found with given Id")
//         }
//         return invitations;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getUserInterestedEvents = async (userId) => {
//     try {
//         let user = await userModel.findById(userId)
//             .populate('interested_events');
//         if (!user) {
//             throw new Error("No user found with given Id")
//         }
//         return user.interested_events;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
// exports.getEventByUserId = async (userId) => {
//     try {
//         const events = await eventModel.find({"user.id": userId});
//         if (utilsFunctions.isEmpty(events)) {
//             throw new Error("No event found with given Id")
//         }
//         for (let i = 0; i < events.length; i++) {
//             delete events[0].user.id
//         }
//         return events;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getAllUsers = async () => {
//     try {
//         return await userModel.find({});
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getAllEvents = async () => {
//     try {
//         return await eventModel.find({});
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getUserById = async (userId) => {
//     try {
//         return await userModel.findById(userId);
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
// exports.getEventById = async (eventId) => {
//     try {
//         let event = await eventModel.findById(eventId);
//         if (!event) {
//             throw new Error("No event found with given Id")
//         }
//         let eventObject = event.toObject();
//         delete eventObject.user.id;
//
//         return eventObject;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//

