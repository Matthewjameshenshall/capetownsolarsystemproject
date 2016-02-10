/**
 * TutorController
 *
 * @description :: Server-side logic for managing tutors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

new: function(req, res, next) {
	
User.findOne(req.param('id'), function foundUser (err, user ) {
	if (err) return next(err);
	if(!user) return next();
	res.view({
		user:user
	});
});

},

create: function(req, res, next) {


	User.create( req.params.all(), function userCreated (err, user) 
	{

		if (err) {
			console.log(err);
			req.session.flash = {
				err: err
			}

      console.log('error')
			return res.redirect('/user/new');
		}

		    req.session.authenticated = true;
        req.session.User = user;
		res.redirect('/user/show/' + user.id)
	
	});
},

};

