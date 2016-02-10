/**
 * Allow a logged-in user to see, edit and update her own profile
 * Allow admins to see everyone
 */

module.exports = function(req, res, ok) {

  var sessionUserMatchesId = req.session.User.id == req.param('id');

  //not ===??

  console.log("1") ;
  console.log(req.session.User.id) ;
  console.log (typeof (req.session.User.id)); //number
  console.log("2") ;
  console.log(req.param('id'));
  console.log (typeof (req.param('id'))); //string
  console.log("3") ;
  console.log(sessionUserMatchesId);
  console.log(User.admin)

  var isAdmin = req.session.User.admin;

  // The requested id does not match the user's id,
  // and this is not an admin
  if (!(sessionUserMatchesId || isAdmin)) {
    var noRightsError = [{name: 'noRights', message: 'You must be an admin.'}]
    req.session.flash = {
      err: noRightsError
    }
    // console.log(sessionUserMatchesId);
    // console.log(isAdmin);
    res.redirect('/session/new');
    return;
  }

  ok();

};