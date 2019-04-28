exports.validateEventBodyType = async(eventBody) => {
    try {
        let stringConstructor = 'string'.constructor
        if(eventBody.constructor == stringConstructor) {
            return JSON.parse(eventBody)
        } else {
            return eventBody
        }
    } catch (exc) {
        console.log(exc)
    }
}
