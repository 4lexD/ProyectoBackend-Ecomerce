import 'dotenv/config';
import AppFactory from './presentation/factories/appFactory.js';
import DbFactory from './data/factories/dbFactory.js';
import config from './config/config.js';
import { cronSchedule } from './shared/index.js';
import { userCleanup } from './presentation/cron/userCleanup.js';

const {DB,DB_URI} = config;
const runApp = async () => {
    const db = DbFactory.create(DB);
    db.init(DB_URI);

    const app = AppFactory.create();
    app.init();
    app.build();
    app.listen();

    cronSchedule('30 00 1 * *',userCleanup);
};

runApp();