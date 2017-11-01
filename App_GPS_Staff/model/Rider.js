class Rider{
    constructor(id,phone,lat,lng,vehicle,other){
        this.id = id;
        this.phone = phone;
        this.lat = lat;
        this.lng = lng;
        this.vehicle = vehicle;
        this.other = other;
    }
    static getAllRider() {
        return arrRider;
    }
    static addNewRider(phone,lat,lng,vehicle,other) {
        const rider = new Rider(arrRider.length,phone,lat,lng,vehicle,other);
        arrRider.push(rider);
    }
}
const arrRider = [
    new Rider(1, '0972258138', '10.7567498',  '106.6542277',  true, 'normal'),
    new Rider(2, '0913171587', '10.7733734',  '106.6857237',  false, 'premium'),
    new Rider(3, '0958134590', '10.7606529',  '106.6892934',  true, 'normal')
];
module.exports = Rider;