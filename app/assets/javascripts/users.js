$(function() {
    
  var userLists = $('#user-search-result');
  var memberLists = $('#chat-group-users');
  
  function getCorrectUsers(users) {
    var userIds = [];

    for(var i = 0; i < users.length; i++) {
      userIds.push(users[i].id);
    };

    $('#chat-group-users').find('input').each(function() {
      var input = parseInt($(this).attr("value"), 10);
      var userId = $.inArray(input, userIds);

      if(userId >= 0){
        users.splice(userId, 1);
        userIds.splice(userId, 1);
      }
    });
    return users;
  }

  function appendSearchedUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name="${user.name}">追加</div>
                </div>`
    userLists.append(html);
  }

  function appendErrMsg(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    userLists.append(html);
  }

  function appendUserToGroup(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    memberLists.append(html);
  }

  $('#user-search-field').on("keyup", function(e) {
    e.preventDefault();
    var input = $(this).val();

    $.ajax({
      url: '/users',
      type: "GET",
      data: {keyword: input},
      dataType: "json",
    })

    .done(function(users){
      userLists.empty();
      users = getCorrectUsers(users);
      
      if (users.length !== 0) {
        users.forEach(function(user) { 
          appendSearchedUser(user);
        });
      }
      else {
        appendErrMsg("一致するユーザーがいません");
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $('#user-search-result').on("click", ".chat-group-user__btn--add", function() {
    var id = $(this).attr("data-user-id");
    var name = $(this).attr("data-user-name");
    $(this).parent()[0].remove();
    appendUserToGroup(id, name);
  });

  $('#chat-group-users').on("click", ".js-remove-btn", function() {
    $(this).parent()[0].remove();
  });
});