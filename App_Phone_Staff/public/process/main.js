let userLat = null; // kinh do nguoi dung
let userLng = null; // vi do nguoi dung

$('#manage_order').hide(0);
// $('#sign_in_container').show();


// check phone number
$('#phone').blur(() => {
    const phone = $('#phone').val();
    if(phone === '') return $('#phone').focus();
    if(isNaN(+phone)) return swal({
        title: "WARNING",
        text: "Chỉ nhập số !!!",
        icon: "warning"
    }).then(() => {
        $('#phone').val('');
        $('#phone').focus();
    });
    $.post('/history' , {phone} , resp => {
        $('.list-group').html('');
        if(resp.message) {
            const {history} = resp;
            history.forEach(e => {
               const content = `<li class="list-group-item list-group-item-info">${e.address}</li>`; 
               $('.list-group').append(content);             
            });
        }else {
            const content = `<li class="list-group-item list-group-item-info">This phone isn't hitories</li>`; 
            $('.list-group').append(content);
        }
        $('#address').focus();
    });
});

$('#btn_order').click(e => {
    e.preventDefault();
    const phone = $('#phone').val();
    const otherDetails = $('#otherDetails').val() || '';
    const vehicle = $('input[id=bike]:checked').val() ? true : false; // true: bike , flase: car
    const address = $('#address').val();    
    if(!userLat) return swal("WARNING","Vui lòng chọn địa chỉ","warning");
    const order = {
        phone: phone,
        address: address,
        lat: userLat,
        lng: userLng,
        other: otherDetails,
        bike: vehicle,
        state: false  // chua duoc xe xac nhan
    }
    $.post('/order', order , resp => {
        if(resp.message) return swal("SUCCESS","Đặt xe thành công","success");
        swal("FAIL","Try again!!!","error");
    });
    $('#phone').val('');
    $('#otherDetails').val('');
    $('#address').val('');
});

function autoComplete() {
    const input = document.getElementById('address');
    const searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();  
        if (places.length == 0) return swal("FAIL" , "Vui lòng nhập đúng địa chỉ" , "error");
        const userAddress = places[0].formatted_address;
        // resquest google maps javascript api to get lat & lng
        $.get('https://maps.googleapis.com/maps/api/geocode/json', {
            address: userAddress,
            key: 'AIzaSyAIla57DU_N_8Lzo1nXmePnghTu-60KTfQ'
        }, response => {
            const {lat , lng} = response.results[0].geometry.location
            userLat = lat;
            userLng = lng;
        });
    });
    
}

