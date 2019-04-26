exports.build = async(statusCode, responseBody) => {
    let response = {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true 
        },
        body: JSON.stringify(responseBody)
    }
    return response;
}

exports.error = async(message) => {
    let errorObject = {
        message: message
    }
    return this.build(500, errorObject);
}