class CustomErrorHandler extends Error{
       statusCode
       message

    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
    }
    static alreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }

    static timeExpire(message='Time expire') {
        return new CustomErrorHandler(500, message);
    }
    static wrongCredentials(message='Username or password is wrong!'){
        return new CustomErrorHandler (401,message);
    }
    static unAuthorized(message= 'unAuthorized') {
        return new CustomErrorHandler(401, message);
    }

    static notFound(message= 'not Found') {
        return new CustomErrorHandler(404, message);
    }
}
export default CustomErrorHandler;