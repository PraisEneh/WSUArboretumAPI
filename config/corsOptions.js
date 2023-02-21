// CORS is currently not in use unless that change is needed

// Cross Origin Resource Sharing
const whitelist = [
    'https://www.google.com',
];

const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            // no error and true origin
            callback(null, true);                
        }else{
            callback(new Error('Not Allowed by CORS'));
        }

    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;