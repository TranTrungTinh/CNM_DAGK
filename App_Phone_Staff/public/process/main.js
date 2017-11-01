let userLat = null; // kinh do nguoi dung
let userLng = null; // vi do nguoi dung

$('#btn_order').click(e => {
    e.preventDefault();
    const phone = $('#phone').val();
    const otherDetails = $('#otherDetails').val() || '';
    const vehicle = $('input[id=bike]:checked').val() ? true : false; // true: bike , flase: car
    if(phone === '') return swal("Loi","Chua nhap so dien thoai","error");    
    if(!userLat) return swal("Canh bao","Vui long chon dia chi","warning");
    const order = {
        phone: phone,
        lat: userLat,
        lng: userLng,
        other: otherDetails,
        bike: vehicle
    }
    $.post('/order', order , result => {
        if(result.message) return swal("Thanh cong","Order thanh cong","success");
        swal("That bai","Vui long thu lai","error");
    });
    
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

