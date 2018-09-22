const router = require('express').Router();
const dbOps = require('../db/cloudant-crud');
const htmlBuilder = require('../config/html-string');


router.get('/equipment/search', (req, res, next) => {
    if(!req.query.limit){
        next('must include limit param');
        return;
    }
    dbOps.getEquipmentList(req.query.limit, (err, body) => {
        if(err){
            next(err);
            return;
        }
        //res.json(body.rows);
        res.type('html');
        res.send(htmlBuilder(body.rows));
    });
});

router.get('/equipment/:equipmentNum', (req, res, next) => {
    if(!req.params.equipmentNum){
        next('equipment number not mentioned');
        return;
    }
    dbOps.findEquipment(parseInt(req.params.equipmentNum), (err, data) =>{
        if(err){
            next(err);
            return;
        }
        //res.json(data);
        res.type('html');
        res.send(htmlBuilder(data.docs));
    });

});

router.post('/equipment', (req, res, next) => {
    if(!req.body){
        next('equipment body not found');
        return;
    }
    dbOps.insertEquipment(req.body, (err, data) => {
        if(err){
            next(err);
            return;
        }
        if(!data.ok){
            next('data insert failed');
            return;
        }
        res.json('data insert success');
    });

});

module.exports = router;