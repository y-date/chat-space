$(function() {
  function buildMessage(message) {
    var content = message.content ? `<p class="main-message__content__text">${message.content}</p>` : "";
    var image = message.image ? `<img class="main-message__content__image" src=${message.image}>` : "";
    var html = `<div class="main-message" data-id=${message.id}>
                  <div class="main-message__info">
                    <div class="main-message__info__name">
                      ${message.user_name}
                    </div>
                    <div class="main-message__info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="main-message__content">
                    ${content}
                    ${image}
                  </div>
                </div>`
    return html;
  }

  function scrollBottom() {
    var scrollH = $('.main-messages')[0].scrollHeight;
    $('.main-messages').animate({scrollTop: scrollH}, 20 );
  }

  // メッセージの送信〜メッセージの表示
  $('#new_message').on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessage(message);
      $('.main-messages').append(html);
      $('.main-form__message')[0].reset();
      scrollBottom();
    })

    .fail(function() {
      alert('メッセージを入力してください')
    })

    .always(function() {
      $('.main-form__message__send-btn').removeAttr('disabled')
    })
  });

  // メッセージの表示の自動更新
  var reloadMessages = function() {
    if(window.location.pathname.match(/\/groups\/\d+\/messages/)) {
      if($('.main-messages')[0]){
        var last_message_id = $('.main-message:last').data('id');
      } else {
        last_message_id = 0
      }

      $.ajax({
        url: 'api/messages',
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })

      .done(function(messages) {
        var insertHTML = '';
        if (messages.length !== 0) {
          messages.forEach(function(message) { 
            insertHTML += buildMessage(message);
          });
          $('.main-messages').append(insertHTML);
          scrollBottom();
        }
      })

      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };

  $(function() {
    setInterval(reloadMessages, 5000);
  });
});