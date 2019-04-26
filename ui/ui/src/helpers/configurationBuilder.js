/* eslint-disable */
let _config = {
    'dev': {
        'apiBase': 'https://emulrv2ys1.execute-api.us-east-1.amazonaws.com/test'
    },
    'test': {
        'apiBase': 'https://emulrv2ys1.execute-api.us-east-1.amazonaws.com/test'
    },
    'prod': {

    }
}

export default {
    getConfig () {
        switch (process.env.VUE_APP_APPENV) {
            case 'TEST':
                return _config.test
            case 'PROD':
                return _config.prod
            default:
                return _config.dev
        }
    }
}
