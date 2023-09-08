import { Command } from 'commander';
import UserManager from '../../domain/managers/userManager.js';
import logger from '../../shared/pino/logger.js';
import mongoose from 'mongoose';

const AddUserCommand = new Command('addUser');

AddUserCommand
  .version('0.0.1')
  .description('Add user')
  .option('-e, --email <email>', 'User`s email')
  .option('-fn, --firstName <firstName>', 'User`s first name')
  .option('-ln, --lastName <lastName>', 'User`s last name')
  .option('-p, --password <password>', 'User`s password')
  .option('-a, --age <age>', 'User`s age')
  .option('-ia, --isAdmin <isAdmin>', 'User`s isAdmin')
  .option('-r, --roleId <roleId>', 'Role ID to assign to the user')
  .action(async(env) =>
  {
    const payload = {
      ...env,
      age: +env.age,
      isAdmin: env.isAdmin === 'true',
      role: mongoose.Types.ObjectId(env.roleId)
    };

    const manager = new UserManager();
    const user = await manager.create(payload);

    if(user)
    {
      logger.info('User created successfully');
    }
  });

export default AddUserCommand;