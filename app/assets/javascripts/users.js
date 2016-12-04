$(document).ready(function() {
  var $userForm = $('#add-user-form');
  var $getUsers = $('#get-users');
  var $userFirstName = $('#user-first-name');
  var $userLastName = $('#user-last-name');
  var $userPhoneNumber = $('#user-phone-number');
  var $firstNameShow = $('#first_name_show');
  var $lastNameShow = $('#last_name_show');
  var $phoneNumberShow = $('#phone_number_show');
  var $showBox = $('#show-box');
  var $showBoxCancel = $('#show-cancel');
  var $close = $('#close');
  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  $('.flash').hide().delay(800).fadeIn(800).delay(4000).fadeOut(800)

  $userForm.submit(function(e) {
    e.preventDefault();
    var requestType, requestUrl;
    if($(this).data('user-id')) {
      requestType = "PUT";
      // console.log($(this).data('user-id'))
      requestUrl =  BASEURL + '/users/' + $(this).data('user-id');
    } else {
      requestType = "POST";
      requestUrl = BASEURL + '/users';
    }
    $.ajax({
      type: requestType,
      url: requestUrl,
      dataType: 'JSON',
      data: { user: {
        first_name: $userFirstName.val(),
        last_name: $userLastName.val(),
        phone_number: $userPhoneNumber.val()
      }}
    }).success(function(data) {
      $userForm[0].reset();
      $userFirstName.focus();
      loadUsers();
    }).fail(function(data){
      
    });
  });

  $(document).on('click', '.show-user', function() {
    var userId = $(this).parent().attr('id')
    $.ajax({
      type: 'GET',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON'
    }).success(function(data) {
      console.log(data)
      $firstNameShow.text(data.first_name)
      $lastNameShow.text(data.last_name)
      $phoneNumberShow.text(data.phone_number)
      $showBox.css('display', 'block')
      $showBoxCancel.css('display', 'block')
    }).fail(function(data) {

    });
  });

  $(document).on('click', '.delete-user', function() {
    var userId = $(this).parent().attr('id')
    $.ajax({
      type: 'DELETE',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON'
    }).success(function(data) {
      $("#" + userId).remove();
    }).fail(function(data) {

    });
  })

  $(document).on('click', '.edit-user', function() {
    var userId = $(this).parent().attr('id')
    $.ajax({
      type: 'GET',
      url: BASEURL + '/users/' + userId,
      dataType: 'JSON'
    }).success(function(data) {
      $userFirstName.val(data.first_name).focus();
      $userLastName.val(data.last_name);
      $userPhoneNumber.val(data.last_name);
      $userForm.attr('data-user-id', userId);
    }).fail(function(data) {

    });
  })

  function loadUsers() {
    var $users = $('#users');
    $users.empty()

    $.ajax({
      type: 'GET',
      url: BASEURL + '/users',
      dataType: 'JSON'
    }).success(function(data) {
      for(var i = 0; i < data.length; i++) {
        var user = data[i];
        $users.append('<div id=' + user.id + '>' + user.first_name + " " + user.last_name + ' - <button class="blue btn show-user"><i class="material-icons">visibility</i></button><button class="purple btn edit-user"><i class="material-icons">edit</i></button><button class="red btn delete-user"><i class="material-icons">delete</i></button><br><br></div>');
      }
    }).fail(function(data) {

    });
  }

  $showBoxCancel.click(function(){
    $showBox.css('display', 'none')
    $showBoxCancel.css('display', 'none')
  })

  $close.click(function(){
    $showBox.css('display', 'none')
    $showBoxCancel.css('display', 'none')
  })

  $getUsers.click(function() {
    loadUsers()
  });

});
