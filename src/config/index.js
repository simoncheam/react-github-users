import * as dotenv from 'dotenv';


dotenv.config();


export const auth0_config = {

    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,




}

export default {
    auth0_config
}