const $ = require('jquery');
const swal = require('sweetalert');

$.get('/renewtoken', resp => {
  if(resp.error) {
      $('#manage_order').hide();
      $('#sign_in_container').show();
      return;
  }
  $('#sign_in_container').hide();
  $('#manage_order').show();
});

// $('#manage_order').hide(0);
// $('#sign_in_container').show();
$('#sign_in').click(e => {
  e.preventDefault();
  const username = $('#username').val() || '';
  const password = $('#password').val() || '';
  if(username == '' || password == '') return swal('WARNING','Chưa nhập username hoặc password','warning');

  $.post('/signin' , {username , password} , resp => {
      if(resp.error) return swal('FAIL','Sai tên tài khoản hoặc mật khẩu','error');
      $('#sign_in_container').hide(1000);
      $('#manage_order').show(1000);
  });
});