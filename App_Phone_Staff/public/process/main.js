let userLat = null; // kinh do nguoi dung
let userLng = null; // vi do nguoi dung
// check phone number
$('#phone').blur(() => {
    const phone = $('#phone').val();
    if(phone === '') return $('#phone').focus();
    if(isNaN(+phone)) return swal({
        title: "WARNING",
        text: "Vui long chi nhap so!",
        icon: "warning"
    }).then(() => {
        $('#phone').val('');
        $('#phone').focus();
    });
    $('#address').focus();
    
});

$('#btn_order').click(e => {
    e.preventDefault();
    const phone = $('#phone').val();
    const otherDetails = $('#otherDetails').val() || '';
    const vehicle = $('input[id=bike]:checked').val() ? true : false; // true: bike , flase: car
    const address = $('#address').val();    
    if(!userLat) return swal("WARNING","Vui long chon dia chi","warning");
    const order = {
        phone: phone,
        address: address,
        lat: userLat,
        lng: userLng,
        other: otherDetails,
        bike: vehicle,
        state: false  // chua duoc xe xac nhan
    }
    $.post('/order', order , result => {
        if(result.message) return swal("SUCCESS","Order thanh cong","success");
        swal("That bai","Vui long thu lai","error");
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
        if (places.length == 0) return swal("Dia chi sai" , "Vui long nhap dung dia chi" , "error");
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

