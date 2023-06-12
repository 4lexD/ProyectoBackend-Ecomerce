import 'dotenv/config';
import AppFactory from './presentation/factories/appFactory.js';

const runApp = async () => {

    const app = AppFactory.create();
    app.init();
    app.build();
    app.listen();
};

runApp();