$(function() {
  function buildMessage(message) {
    var content = message.content ? `<p class="main-message__content__text">${message.content}</p>` : "";
    var image = message.image ? `<img class="main-message__content__image" src=${message.image}>` : "";
    var html = `<div class="main-message">
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
    return html
  }

  $('#new_message').on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    function scrollBottom() {
      var currentPos = $('.main-messages').scrollTop();
      var lastMsgPos = $('.main-messages > .main-message:last').offset().top;
      var lastMsgScrollPos = currentPos + lastMsgPos;
      $('.main-messages').animate({scrollTop: lastMsgScrollPos}, 0 );
    }

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
      scrollBottom();
      $('.main-form__message__box__text').val('');
      $('.main-form__message__box__image__file').val('');
    })

    .fail(function() {
      alert('メッセージを入力してください')
    })

    .always(function() {
      $('.main-form__message__send-btn').removeAttr('disabled')
    })
  });
});