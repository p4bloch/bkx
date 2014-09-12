var extendPost = function (post) {
  if(post.city){ // not all posts have URLs!
    post.city_slug = URLify2(post.city);
  }
  if(post.country){ // not all posts have URLs!
    post.country_slug = URLify2(post.country);
  }
  console.log(post);
  return post;
}

postSubmitServerCallbacks.push(extendPost);