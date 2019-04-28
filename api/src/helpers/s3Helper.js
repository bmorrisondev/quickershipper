/* eslint-disable */
// TODO: Remove this when implemented
var AWS = require('aws-sdk')

function putObjectToS3(bucket, key, data){
    return new Promise((resolve, reject) => {
        let s3 = new AWS.S3()
        var params = {
            Bucket : bucket,
            Key : key,
            Body : data
        }
        s3.putObject(params, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}