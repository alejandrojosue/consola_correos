import { inquirerMenu, pause, confirm, emailFiles } from './helpers/inquirer.js'
import { readDB, saveDB } from './helpers/saveFile.js';
import { inputEmail, send } from './util/email.js';
import Records from './models/records.js';
import { list } from './util/reader.js';
import ora from 'ora'

(async () => {
  const records = new Records()
  const recordsDB = readDB()
  if (recordsDB) records.loadRecordsFromArr(recordsDB);
  let opt = ''
  while (opt !== '0') {
    opt = await inquirerMenu()

    let dataEmail = {}, ok = true, dataRecord = {}
    switch (opt) {
      case '1':
        dataEmail = await inputEmail()
        if(!dataEmail) break;
        ok = await confirm('¿Seguro de enviar correo?')
        if (!ok) {
          console.warn('Correo no enviado.');
          break;
        }
        dataRecord = await send(dataEmail)
        records.create(dataRecord)
        break;
      case '2':
        dataEmail = await inputEmail()
        if(!dataEmail) break;
        const files = await emailFiles()

        dataEmail = { ...dataEmail, attachments: files }
        ok = await confirm('¿Seguro de enviar correo?')
        if (!ok) {
          console.warn('Correo no enviado.');
          break;
        }
        dataRecord = await send(dataEmail)
        records.create(dataRecord)
        break;
      case '3':
        await list()
        break;
      case '4':
        records.getAll()
        break;
    }
    await pause()
  }
  const spinner = ora('Guardando datos...').start()
  saveDB(records.listArr)
  spinner.succeed('🌟 Fin del programa. 🌟');
})()