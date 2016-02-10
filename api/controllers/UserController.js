/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	

'new': function (req, res) {
	
	//res.redirect('/user/new');
	res.view();

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

show: function(req, res, next) {
User.findOne(req.param('id'), function foundUser (err, user ) {
	if (err) return next(err);
	if(!user) return next();
	res.view({
		user:user
	});
});

},

index: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        users: users
      });
    });
  },

    // render the edit view (e.g. /views/edit.ejs)
 edit: function(req, res, next) {

    // Find the user from the id passed in via params
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');

      res.view({
        user: user
      });
    });
  },

  // process the info from edit view
  update: function(req, res, next) {

    // if (req.session.User.admin) {
    //   var userObj = {
    //     name: req.param('name'),
    //     title: req.param('title'),
    //     email: req.param('email'),
    //     admin: req.param('admin')
    //   }
    // } else {
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email')
      }
    // }

    User.update(req.param('id'), userObj, function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);

        // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
        // User.publishUpdate(user.id, {
        //   name: user.name,
        //   action: ' has been destroyed.'
        // });

        // Let other sockets know that the user instance was destroyed.
        // User.publishDestroy(user.id);

      });        

      res.redirect('/user');

    });
  },



};

