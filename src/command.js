import { exit } from 'shelljs';
import { program } from 'commander';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import AddUserCommand from './presentation/commands/addUser.js';
import AddRoleCommand from './presentation/commands/addRole.js';
import logger from './shared/pino/logger.js';
import config from './config/config.js';
const {DB_URI} = config
void (async() =>
{
  try
  {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    program.addCommand(AddUserCommand);
    program.addCommand(AddRoleCommand);

    await program.parseAsync(process.argv);

    exit();
  }
  catch (error)
  {
    await logger.error(error);
    exit();
  }
})();