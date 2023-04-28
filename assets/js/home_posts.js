{
  //method to submit the form-data of new post by ajax
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post, data.data.user);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(' .delete-post-button',newPost));

          // call the create Post comment class
          new PostComments(data.data.post._id);
           

          if (data) {
            new Noty({
              type: "success",
              text: data.message,
              timeout: 1500,
              layout: "topRight",
            }).show();
          }
         
          
          newPostForm.trigger('reset');
        },
        error: function (err) {
          console.log(err.responseText);
          new Noty({
            type: "error",
            message: "Error Occured",
          });
        },
      });
    });
  };

  //method to create post in DOM
  let newPostDom = function (post, user) {
    return $(`<p>

    <li id="post-${post._id}">
            ${post.content}
        
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
        
    <br>
    <small>${user}</small>
    </p>
    <div class="post-comments">
        
            <form action="/comments/create" method="post">
            <input type="text" name="content" placeholder="type here to add comment">
           <!-- used to find the id of the post in db -->
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="comment">
            </form>

          
         <div class="post-comments-list">
            <ul id="post-comments-${post._id}">

            </ul>

         </div>  
    </div>

</li>`);
  };

  //method to delete a post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"), // getting the value of href in the a tag
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            type: "success",
            text: data.message,
            timeout: 1500,
            layout: "topRight",
          }).show();
        },
        error: function (err) {
          console.log(err.responseText);
        },
      });
    });
  };
  let convertToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        new PostComments(postId);
    });
}
  createPost();
  convertToAjax();
}
