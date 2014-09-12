Package.describe({summary: "Add Geolocation to a Post (Country, City)"});

Package.on_use(function (api) {

  api.use(['telescope-lib', 'telescope-base', 'iron-router', 'subs-manager', 'urlify2', 'ui'], ['client', 'server']);
  api.use(['templating'], ['client']);
  
  api.add_files(['lib/client/post_geo.html'], ['client']);
  api.add_files(['lib/client/helpers.js'], ['client']);
  api.add_files(['lib/client/css/geopost.css'], ['client']);
  
  api.add_files(['lib/geopost.js'], ['client', 'server']);

  api.add_files(['lib/server/server.js'], ['client', 'server']);

});