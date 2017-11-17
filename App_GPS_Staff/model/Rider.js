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
    
}
const arrRider = [
    new Rider(1, '0972258138', '10.7567498',  '106.6542277',  true),
    new Rider(2, '0913171587', '10.7733734',  '106.6857237',  false),
    new Rider(3, '0943253242', '10.7606982',  '106.658138',  true),
    new Rider(4, '0963452343', '10.799256',  '106.64214',  false),
    new Rider(5, '0958763421', '10.7767149',  '106.6836821',  true),
    new Rider(6, '0967332532', '10.761711',  '106.703373',  false),
    new Rider(7, '0990645323', '10.7703642',  '106.6729093',  true),
];
module.exports = Rider;