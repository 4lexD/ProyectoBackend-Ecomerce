import { Command } from 'commander';
import RoleManager from '../../domain/managers/roleManager.js';
import logger from '../../shared/pino/logger.js';

const AddRoleCommand = new Command('addRole');

AddRoleCommand
  .version('0.0.1')
  .description('Add role')
  .option('-n, --name <name>', 'Nombre del rol')
  .option('-p, --permissions <permissions>', 'Permisos separados por comas')
  .action(async (env) => {
    const permissionsArray = env.permissions.split(',').map(p => p.trim());
    const payload = {
      name: env.name,
      permissions: permissionsArray,
    };

    const roleManager = new RoleManager();
    try {
      const result = await roleManager.addOne(payload);
      logger.info('Rol añadido correctamente:');
      logger.info(result);
    } catch (error) {
      logger.error('Error al añadir el rol:', error.message);
    }
  });

export default AddRoleCommand;