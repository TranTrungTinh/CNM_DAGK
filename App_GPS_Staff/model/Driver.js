const drivers = [
    {"name":"Trần Quang Vinh","lat":"10.7567498","lng":"106.6542277","state":false},
    {"name":"Trần Thành Nhân","lat":"10.7733734","lng":"106.6857237","state":false},
    {"name":"Trần Anh Tuấn","lat":"10.7606982","lng":"106.658138","state":false},
    {"name":"Trần Hồng Đức","lat":"10.799256","lng":"106.64214","state":false},
    {"name":"Trần Thái Tài","lat":"10.7767149","lng":"106.6836821","state":false},
    {"name":"Trần Bình Minh","lat":"10.761711","lng":"106.703373","state":false},
    {"name":"Trần Văn Hảo","lat":"10.7703642","lng":"106.6729093","state":false},
    {"name":"Trần Lê An","lat":"10.7343576","lng":"106.662861","state":false},
    {"name":"Trần Minh Phụng","lat":"10.747966","lng":"106.680795","state":false},
    {"name":"Trần Thanh Tân","lat":"10.762942","lng":"106.696895","state":false},

    {"name":"Nguyễn Thành Khang","lat":"10.7676031","lng":"106.6946885","state":false},
    {"name":"Nguyễn Văn Phúc","lat":"10.7815286","lng":"106.6746227","state":false},
    {"name":"Nguyễn Thiên An","lat":"10.775543","lng":"106.6628737","state":false},
    {"name":"Nguyễn Gia Bảo","lat":"10.7740856","lng":"106.6644146","state":false},
    {"name":"Nguyễn Trung Dũng","lat":"10.762214","lng":"106.668555","state":false},
    {"name":"Nguyễn Thái Dương","lat":"10.7772089","lng":"106.654023","state":false},
    {"name":"Nguyễn Hải Đăng","lat":"10.7584532","lng":"106.6678958","state":false},
    {"name":"Nguyễn Thành Đạt","lat":"10.743571","lng":"106.623853","state":false},
    {"name":"Nguyễn Phúc Điền","lat":"10.7637444","lng":"106.6645096","state":false},
    {"name":"Nguyễn Tài Đức","lat":"10.757306","lng":"106.655175","state":false},

    {"name":"Lê Mạnh Hùng","lat":"10.7712013","lng":"106.65537","state":false},
    {"name":"Lê Chấn Hưng","lat":"10.773414","lng":"106.6531431","state":false},
    {"name":"Lê Bảo Khánh","lat":"10.7722131","lng":"106.6497212","state":false},
    {"name":"Lê Khang Kiện","lat":"10.766789","lng":"106.649016","state":false},
    {"name":"Lê Đăng Khoa","lat":"10.762632","lng":"106.651315","state":false},
    {"name":"Lê Tuấn Kiệt","lat":"10.758642","lng":"106.646696","state":false},
    {"name":"Lê Thanh Liêm","lat":"10.7543848","lng":"106.6562814","state":false},
    {"name":"Lê Hiền Minh","lat":"10.748736","lng":"106.6378393","state":false},
    {"name":"Lê Thiện Ngôn","lat":"10.7458602","lng":"106.6530061","state":false},
    {"name":"Lê Thụ Nhân","lat":"10.7528542","lng":"106.6606011","state":false},

    {"name":"Võ Minh Nhật","lat":"10.795785","lng":"106.647692","state":false},
    {"name":"Võ Nhân Nghĩa","lat":"10.7971299","lng":"106.65778","state":false},
    {"name":"Võ Trọng Nghĩa","lat":"10.785669","lng":"106.650922","state":false},
    {"name":"Võ Trung Nghĩa","lat":"10.78661","lng":"106.646254","state":false},
    {"name":"Võ Khôi Nguyên","lat":"10.769225","lng":"106.651652","state":false},
    {"name":"Võ Hạo Nhiên","lat":"10.78","lng":"106.6329","state":false},
    {"name":"Võ Phước Nhi","lat":"10.783558","lng":"106.624745","state":false},
    {"name":"Võ Thanh Phong","lat":"10.7741419","lng":"106.6325712","state":false},
    {"name":"Võ Hữu Phước","lat":"10.769576","lng":"106.636252","state":false},
    {"name":"Võ Minh Quân","lat":"10.757356","lng":"106.652689","state":false},

    {"name":"Phan Đông Quân","lat":"10.7692094","lng":"106.6853914","state":false},
    {"name":"Phan Sơn Quân","lat":"10.7608753","lng":"106.6776389","state":false},
    {"name":"Phan Tùng Quân","lat":"10.7677613","lng":"106.6699985","state":false},
    {"name":"Phan Ái Quốc","lat":"10.7689974","lng":"106.680942","state":false},
    {"name":"Phan Thái Sơn","lat":"10.7741772","lng":"106.6780198","state":false},
    {"name":"Phan Trường Sơn","lat":"10.7722599","lng":"106.6865991","state":false},
    {"name":"Phan Thiện Tâm","lat":"10.7681542","lng":"106.6922242","state":false},
    {"name":"Phan Thạch Tùng","lat":"10.7753374","lng":"106.698464","state":false},
    {"name":"Phan An Tường","lat":"10.7818836","lng":"106.6990704","state":false},
    {"name":"Phan Anh Thái","lat":"10.771364","lng":"106.701255","state":false},

    {"name":"Phạm Thanh Thế","lat":"10.774777","lng":"106.7034311","state":false},
    {"name":"Phạm Chiến Thắng","lat":"10.7826863","lng":"106.7057547","state":false},
    {"name":"Phạm Toàn Thắng","lat":"10.789217","lng":"106.7041314","state":false},
    {"name":"Phạm Minh Triết","lat":"10.7895407","lng":"106.6934634","state":false},
    {"name":"Phạm Đình Trung","lat":"10.7888392","lng":"106.6848206","state":false},
    {"name":"Phạm Kiến Văn","lat":"10.7871879","lng":"106.6718701","state":false},
    {"name":"Phạm Nhân Văn","lat":"10.781888","lng":"106.6830109","state":false},
    {"name":"Phạm Khôi Vĩ","lat":"10.792317","lng":"106.692955","state":false},
    {"name":"Phạm Quang Vinh","lat":"10.803146","lng":"106.705314","state":false},
    {"name":"Phạm Uy Vũ","lat":"10.803051","lng":"106.692019","state":false},

    {"name":"Đặng Trường An","lat":"10.8108811","lng":"106.6916549","state":false},
    {"name":"Đặng Thiên Ân","lat":"10.813386","lng":"106.700089","state":false},
    {"name":"Đặng Minh Anh","lat":"10.809327","lng":"106.685235","state":false},
    {"name":"Đặng Quốc Bảo","lat":"10.8076558","lng":"106.7158283","state":false},
    {"name":"Đặng Đức Bình","lat":"10.801977","lng":"106.709133","state":false},
    {"name":"Đặng Hùng Cường","lat":"10.8160905","lng":"106.7076384","state":false},
    {"name":"Đặng Hữu Đạt","lat":"10.802185","lng":"106.720691","state":false},
    {"name":"Đặng Minh Đức","lat":"10.816219","lng":"106.719557","state":false},
    {"name":"Đặng Anh Dũng","lat":"10.792903","lng":"106.711298","state":false},
    {"name":"Đặng Đức Duy","lat":"10.7568995","lng":"106.7006083","state":false},

    {"name":"Bùi Huy Hoàng","lat":"10.753425","lng":"106.690393","state":false},
    {"name":"Bùi Mạnh Hùng","lat":"10.7590762","lng":"106.7069512","state":false},
    {"name":"Bùi Phúc Hưng","lat":"10.7466953","lng":"106.7019707","state":false},
    {"name":"Bùi Gia Hưng","lat":"10.7388266","lng":"106.7102855","state":false},
    {"name":"Bùi Gia Huy","lat":"10.736604","lng":"106.730391","state":false},
    {"name":"Bùi Quang Khải","lat":"10.7294065","lng":"106.7070984","state":false},
    {"name":"Bùi Minh Khang","lat":"10.7376804","lng":"106.6937269","state":false},
    {"name":"Bùi Gia Khánh","lat":"10.8031873","lng":"106.7434185","state":false},
    {"name":"Bùi Đăng Khoa","lat":"10.850497","lng":"106.764918","state":false},
    {"name":"Bùi Minh Khôi","lat":"10.847711","lng":"106.759933","state":false},

    {"name":"Huỳnh Trung Kiên","lat":"10.846247","lng":"106.778941","state":false},
    {"name":"Huỳnh Tuấn Kiệt","lat":"10.8607153","lng":"106.7714885","state":false},
    {"name":"Huỳnh Phúc Lâm","lat":"10.8638425","lng":"106.802052","state":false},
    {"name":"Huỳnh Bảo Long","lat":"10.8782309","lng":"106.8062104","state":false},
    {"name":"Huỳnh Anh Minh","lat":"10.8706812","lng":"106.7658936","state":false},
    {"name":"Huỳnh Ngọc Minh","lat":"10.8698184","lng":"106.7960072","state":false},
    {"name":"Huỳnh Hữu Nghĩa","lat":"10.8573896","lng":"106.6196232","state":false},
    {"name":"Huỳnh Tấn Phát","lat":"10.8346021","lng":"106.6202062","state":false},
    {"name":"Huỳnh Khôi Nguyên","lat":"10.8360141","lng":"106.6606995","state":false},
    {"name":"Huỳnh Chấn Phong","lat":"10.822154","lng":"106.639837","state":false},

    {"name":"Ngô Trường Phúc","lat":"10.8080653","lng":"106.6643618","state":false},
    {"name":"Ngô Minh Quân","lat":"10.8165144","lng":"106.6833659","state":false},
    {"name":"Ngô Minh Sang","lat":"10.806771","lng":"106.678616","state":false},
    {"name":"Ngô Đức Tài","lat":"10.8086916","lng":"106.6702963","state":false},
    {"name":"Ngô Hữu Tâm","lat":"10.8245159","lng":"106.6909979","state":false},
    {"name":"Ngô Đức Thắng","lat":"10.795553","lng":"106.675299","state":false},
    {"name":"Ngô Chí Thanh","lat":"10.7899986","lng":"106.6669781","state":false},
    {"name":"Ngô Đức Toàn","lat":"10.789171","lng":"106.675179","state":false},
    {"name":"Ngô Xuân Trường","lat":"10.7976337","lng":"106.6775426","state":false},
    {"name":"Ngô Kiến Văn","lat":"10.7977638","lng":"106.6891875","state":false}
];
module.exports = drivers;
// for(let i=0; i< drivers.length; i++){
    //     db().ref('cars').push(drivers[i]);
    // }