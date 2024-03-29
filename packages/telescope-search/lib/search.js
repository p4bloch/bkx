// push "search" template to navItems
navItems.push('search');

Searches = new Meteor.Collection("searches", {
  schema: new SimpleSchema({
    _id: {
      type: String,
      optional: true
    },
    timestamp: {
      type: Date
    },
    keyword: {
      type: String
    }
  })
});

Searches.allow({
  update: isAdminById
, remove: isAdminById
});

// XXX
// TODO: find a way to make the package use the same isAdminById as the rest of the app
isAdminById=function(userId){
  var user = Meteor.users.findOne(userId);
  return !!(user && isAdmin(user));
};


// search post list parameters
viewParameters.search = function (terms, baseParameters) {
  // if query is empty, just return parameters that will result in an empty collection
  if(typeof terms.query == 'undefined' || !terms.query)
    return {find:{_id: 0}}

  // log current search in the db
  if(Meteor.isServer)
    logSearch(terms.query);

  var parameters = deepExtend(true, baseParameters, {
    find: {
      $or: [
        {title: {$regex: terms.query, $options: 'i'}},
        {url: {$regex: terms.query, $options: 'i'}},
        {body: {$regex: terms.query, $options: 'i'}},
        {city: {$regex: terms.query, $options: 'i'}},
        {country: {$regex: terms.query, $options: 'i'}},
      ]
    }
  });
  return parameters;
}