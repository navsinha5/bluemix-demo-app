const db = require('./cloudant-init');

const getEquipmentList = function(limit, callback){
    db.list({include_docs: true, limit: limit}, (err, body) => {
        if(err){
            console.log(err);
            callback(err);
            return;
        }
        console.log(body);
        callback(null, body);
    });
}

const findEquipment = function(equipmentNum, callback){
    db.find({selector: {"equipmentNum": equipmentNum}}, (err, body) => {
        if(err){
            console.log(err);
            callback(err);
            return;
        }
        console.log(body);
        callback(null, body);
    });
}

const insertEquipment = function(equipment, callback){
    db.find({selector: {"equipmentNum": equipment.equipmentNum}}, (err, body) => {
        if(err){
            callback(err);
            return;
        }
        if(!body.docs[0]){
            db.insert(equipment, (err, body) =>{
                if(err){
                    callback(err);
                    return;
                }
                console.log(body);
                callback(null, body);
            });
            return;
        }
        console.log(body);
        callback('record already exits');
    });
}

module.exports = {
    getEquipmentList: getEquipmentList,
    findEquipment: findEquipment,
    insertEquipment: insertEquipment
}
