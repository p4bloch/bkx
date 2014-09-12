var countryProperty = {
  propertyName: 'country',
  propertySchema: {
    type: String,
    optional: true
  }
}
var cityProperty = {
  propertyName: 'city',
  propertySchema: {
    type: String,
    optional: true
  }
}
var citySlugProperty = {
  propertyName: 'city_slug',
  propertySchema: {
    type: String,
    optional: true
  }
}
var countrySlugProperty = {
  propertyName: 'country_slug',
  propertySchema: {
    type: String,
    optional: true
  }
}
var tagsProperty = {
  propertyName: 'tags',
  propertySchema: {
    type: String,
    optional: true
  }
}

addToPostSchema.push(countryProperty);
addToPostSchema.push(cityProperty);
addToPostSchema.push(citySlugProperty);
addToPostSchema.push(countrySlugProperty);
addToPostSchema.push(tagsProperty);

// Add template to the post view
postModules.push({
  template: 'postGeo', 
  position: 'right-left'
});

// Edit helper to select country

UI.registerHelper('geo_is_selected', function(selected, country ){
  if(selected == country){
    return 'selected';
  }
})

//Router

var coreSubscriptions = new SubsManager({
  // cache recent 50 subscriptions
  cacheLimit: 50,
  // expire any subscription after 30 minutes
  expireIn: 30
});

Router.map(function() {

  this.route('posts_city', {
    
    path: '/city/:city',
    template: getTemplate('posts_list'),
    onBeforeAction: function () {
      // take the first segment of the path to get the view, unless it's '/' in which case the view default to 'top'
      // note: most of the time this.params.slug will be empty
      this._terms = {
        limit: this.params.limit || getSetting('postsPerPage', 10),
        category: this.params.slug,
        city: this.params.city
      };

      return [
        coreSubscriptions.subscribe('postsList', this._terms.city),  // not sure about if this works
        coreSubscriptions.subscribe('postsListUsers', this._terms)
      ];
    },
    data: function(){
      this._terms = {
        view: this.path == '/' ? 'top' : this.path.split('/')[1],
        limit: this.params.limit || getSetting('postsPerPage', 10),
        category: this.params.slug
      };
      var posts = Posts.find({'city_slug': this.params.city});
      var postsCount = posts.count();

      Session.set('postsLimit', this._terms.limit);

      return {
        postsList: posts,
        postsCount: postsCount
      };
    }

  });

  this.route('posts_country', {
    
    path: '/country/:country',
    template: getTemplate('posts_list'),
    onBeforeAction: function () {
      // take the first segment of the path to get the view, unless it's '/' in which case the view default to 'top'
      // note: most of the time this.params.slug will be empty
      this._terms = {
        limit: this.params.limit || getSetting('postsPerPage', 10),
        category: this.params.slug,
        country: this.params.country
      };

      return [
        coreSubscriptions.subscribe('postsList', this._terms.country), // not sure about if this works
        coreSubscriptions.subscribe('postsListUsers', this._terms)
      ];
    },
    data: function(){
      this._terms = {
        view: this.path == '/' ? 'top' : this.path.split('/')[1],
        limit: this.params.limit || getSetting('postsPerPage', 10),
        category: this.params.slug
      };
      var posts = Posts.find({'country_slug': this.params.country});
      var postsCount = posts.count();

      Session.set('postsLimit', this._terms.limit);

      return {
        postsList: posts,
        postsCount: postsCount
      };
    }

  });

});














