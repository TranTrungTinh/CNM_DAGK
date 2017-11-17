class Driver{
    constructor(id,name,lat,lng,state){
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.state = state;
    }
    static getAllRider() {
        return arrDriver;
    }
    
}
const arrDriver = [
    new Driver(1, 'Nguyen Thanh Nhan', '10.7567498',  '106.6542277',  false),
    new Driver(2, 'Bui Quoc Thanh', '10.7733734',  '106.6857237',  false),
    new Driver(3, 'Tran Trung Kien', '10.7606982',  '106.658138',  false),
    new Driver(4, 'Le Thanh Nhan', '10.799256',  '106.64214',  false),
    new Driver(5, 'Ly Hung', '10.7767149',  '106.6836821',  false),
    new Driver(6, 'Van Chi Dung', '10.761711',  '106.703373',  false),
    new Driver(7, 'Le Anh Khoa', '10.7703642',  '106.6729093',  false),
];
module.exports = Driver;