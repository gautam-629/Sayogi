import crypto from 'crypto';
import {HASH_SECRET} from '../config/index.js'
class HashService{
    static hashOtp(data){
        return crypto.createHmac('sha256',HASH_SECRET).update(data).digest('hex');
    }
}

export default HashService;

//data:Float64Array
 //  crypto.randomBytes(64).toString('hex')