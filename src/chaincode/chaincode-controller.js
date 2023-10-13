const FabricOperation = require('../fabric/FabricOperation');
const FabricController = new FabricOperation();
const config = require('../../config/app');
//Checking the crypto module
var CryptoJS = require("crypto-js");

class chaincode {
    async createRecord(req) {
        req.body.userId = req.body.userId.toString();
        let sign = req.body.signature;
        console.log("sign :", sign)
        //Encrypting text
        var ciphertext = CryptoJS.AES.encrypt(sign, 'secret key 123').toString();
        console.log("signHash data :", ciphertext)

        req.body.signature = ciphertext
        console.log("req data", req.body)
        try {

            let data = {
                docType: req.docType, 
                idName : req.idName,
                [req.idName]: req.body[req.idName]
            }

            // check exists    
            // let existingRecord = await this.isRecordExists(data, data[req.idName]);
            // console.log(" existingRecord ",existingRecord)
            // if(existingRecord) {
            //     return Promise.reject({status:409, message: 'Record already exists'});
            // }

            let payload = req.body
            payload.xfarm_id = payload[req.idName]
            payload.docType = req.docType  

            return FabricController.invoke(
                config.user,
                config.channel_name,
                config.chaincode_name,
                'CreateXFarmRecord',
                payload

            );

        } catch (error) {
            return Promise.reject(error);
        }
    }

    async readRecords(data) {
        try {
            if (data) {
                return FabricController.query(
                    config.user,
                    config.channel_name,
                    config.chaincode_name,
                    'GetAllXFarmRecords',
                    JSON.stringify(data)
                );
            }
            else {
                return FabricController.query(
                    config.user,
                    config.channel_name,
                    config.chaincode_name,
                    'GetAllXFarmRecords',
                );
            }

        } catch (error) {
            console.log("error in identity", error)
            return Promise.reject(error);
        }
    }

    async isRecordExists(data, id) {
        let queryString = "{\"selector\":{\"docType\":\"" + data.docType + "\",\"" + data.idName + "\":\"" + id + "\"}}"
        console.log(data)
        let result = await FabricController.query(
            config.user,
            config.channel_name,
            config.chaincode_name,
            'ReadXFarmRecord',
            queryString
        );

        return result.status == 200;
    }


    async readRecordById(body, id) {
        try {

            let data = "{\"selector\":{\"docType\":\"" + body.docType + "\",\"" + body.idName + "\":\"" + id + "\"}}"
            console.log(data)
            let result = await FabricController.query(
                config.user,
                config.channel_name,
                config.chaincode_name,
                'ReadXFarmRecord',
                data
            );

            if (!result || result.status != 200) {
                return Promise.reject({ status: 404, message: 'Not found' });
            }
	        delete result.data.data.Key
            let orderId = result.data.data.Record.orderId	   
            console.log("orderId is :", orderId)
	        delete result.data.data.Record.orderId
            result.data.data.Record._id = orderId
	        return result

        } catch (error) {
            console.log("err is ", error)
            return Promise.reject(error);
        }
    }

    async readRecordByDocType(data) {
	try {        
	        let result = await FabricController.query(
                config.user,
                config.channel_name,
                config.chaincode_name,
                'GetRecordsByDocType',
                data
            );

            if (!result || result.status != 200) {
                return Promise.reject({ status: 404, message: 'Not found' });
            }
            let records = result.data.data
            records.forEach(element => {
  		    let orderId = element.Record.orderId        
            	element.Record._id = orderId
                delete element.Record.orderId
            });
            return result

        } catch (error) {
            console.log("err is ", error)
            return Promise.reject(error);
        }
    }


    async updateRecord(req) {
        try {

            let data = req.body
            data.id = req.params.id
            data.docType = req.docType
            data.idName = req.idName

            let queryString = "{\"selector\":{\"docType\":\"" + data.docType + "\",\"" + data.idName + "\":\"" + data.id + "\"}}"

            let existingRecord = await this.isRecordExists(data, data.id);
            if(!existingRecord) {
                return Promise.reject({status: 404, message: 'Record not found'});
            }

            data.Key = data.id
            let idName = req.idName 

            let newdata = Object.assign({
                [idName]: data.id
            })

            //removing the keys
            delete data.id
            delete data.idName

            const updatedata = {
                ...data,
                ...newdata,
                queryString: queryString
            };

            return FabricController.invoke(
                config.user,
                config.channel_name,
                config.chaincode_name,
                'UpdateXFarmRecord',
                updatedata
            );

        } catch (error) {
            console.log("err is ", error)
            return Promise.reject(error);
        }
    }

    async deleteRecord(req) {
        try {

            let data = {
                id: req.params.id,
                docType: req.docType,
                idName: req.idName
            }

            if(!req.params.id) {
                return Promise.reject({status:422, message: 'Invalid record id'});
            }

            let existingRecord = await this.isRecordExists(data, data.id);
            if(!existingRecord) {
                return Promise.reject({status: 404, message: 'Record not found'});
            }


            let queryString = "{\"selector\":{\"docType\":\"" + data.docType + "\",\"" + data.idName + "\":\"" + data.id + "\"}}"

            data.query = queryString            
            data.Key = data.id

            return FabricController.invoke(
                config.user,
                config.channel_name,
                config.chaincode_name,
                'DeleteXFarmRecord',
                data
            );

        } catch (error) {
            console.log("err is ", error)
            return Promise.reject(error);
        }
    }

    async readHistoryBykey(body, key) {
        console.log("history controller")
        try {

            let data = "{\"selector\":{\"docType\":\"" + body.docType + "\",\"" + body.idName + "\":\"" + key + "\"}}"
            console.log("query is :", data)
            let result = await FabricController.query(
                config.user,
                config.channel_name,
                config.chaincode_name,
                'GetRecordsHistory',
                data
            );
            console.log("result is :", result)
            if (!result || result.status != 200) {
                return Promise.reject({ status: 404, message: 'Not found' });
            }
            // return result
            return result

        } catch (error) {
            console.log("err is ", error)
            return Promise.reject(error);
        }
    }
}

module.exports = chaincode;