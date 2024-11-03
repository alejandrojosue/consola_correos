import nodemailer from 'nodemailer';
import ora from 'ora'
import { readInput, emailRecepientsError, confirm } from '../helpers/inquirer.js'
import { emailValidate } from '../helpers/emailValidate.js';

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'sistemaoperativoindependiente@gmail.com',
    pass: 'biyvxblpoqqutson'
  }
};

export const send = async ({ subject = '', body = '', recipients = '', attachments = [] }) => {
  const message = {
    from: 'sistemaoperativoindependiente@gmail.com',
    to: recipients,
    subject,
    text: body,
    attachments
  };
  const spinner = ora('Enviando correo...').start()
  try {
    const transport = nodemailer.createTransport(config);
    await transport.sendMail(message);
    spinner.succeed('Correo enviado correctamente');
    return `Correo enviado correctamente a: ${recipients}`
  } catch (error) {
    spinner.fail('Error al enviar el correo.');
    console.error(error);
    return `Error al enviar el correo: ${error}`
  }
};

export const inputEmail = async () => {
  let opt = '', recipients = ''
  do {
    opt = ''
    recipients = await readInput('Ingrese los correo destinatarios:')
    const { invalidEmails, validEmails } = await emailValidate({ recipients })
    if (invalidEmails.length > 0) {
      console.warn(`Los correos ${invalidEmails.join(',').red} no son válidos`)
      opt = await emailRecepientsError()
    }
    if (opt === 'b') recipients = validEmails.join(',')
  } while (opt === 'a')
  if (opt === 'c') return null;
  const subject = await readInput('Ingrese el título del correo:')
  const body = await readInput('Ingrese el mensaje: ')
  return { subject, body, recipients }
};

export const inputFileEmail = async () => {
  let file = []

  return {file}
}
