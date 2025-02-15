const fs = require('fs');
const path = require('path');
const getLocalIPv4 = require('../utils/getLocalIPv4');

function updateEnvFile() {
  const localIP = getLocalIPv4();
  const Origin = `http://${localIP}:3001`;
  const envFilePath = path.join(__dirname, '../../../', '.env');

  try {
    let envData = '';
    if (fs.existsSync(envFilePath)) {
      envData = fs.readFileSync(envFilePath, 'utf8');
    }
    const key = 'FRONTEND_ORIGIN';
    const regex = new RegExp(`^${key}=.*$`, 'm');

    if (regex.test(envData)) {
      envData = envData.replace(regex, `${key}=${Origin}`);
    } else {
      if (envData.length > 0 && envData[envData.length - 1] !== '\n') {
        envData += '\n';
      }
      envData += `${key}=${Origin}\n`;
    }
    fs.writeFileSync(envFilePath, envData, 'utf8');
    console.log(`Updated ${key} in .env to ${Origin}`);
  } catch (err) {
    console.error('Error updating .env file:', err);
  }
}

module.exports = updateEnvFile;