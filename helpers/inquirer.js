import colors from 'colors'
import Inquirer from 'inquirer'
import Readline from 'readline'
import path from 'path';
import { read } from '../util/reader.js';

const questions = [{
    type: 'list',
    name: 'option',
    message: '¿Que desea hacer?',
    choices: [{
        value: '1',
        name: `${' 1.'.red} Enviar correo sin adjunto.`
    },
    {
        value: '2',
        name: `${' 2.'.red} Enviar correo con adjunto.`
    },
    {
        value: '3',
        name: `${' 3.'.red} Listar archivos.`
    },
    {
        value: '4',
        name: `${' 4.'.red} Listar bitácoras.`
    },
    {
        value: '0',
        name: `${' 0.'.red} Salir`
    }
    ]
}];

const inquirerMenu = async () => {
    const title = 'Seleccione una opción'
    const terminalWidth = process.stdout.columns;
    const padding = Math.floor((terminalWidth - title.length) / 2);
    console.clear();
    console.log('='.repeat(terminalWidth).green);
    console.log(`${' '.repeat(padding)}${title}`.green.bold)
    console.log('='.repeat(terminalWidth).green);
    const { option } = await Inquirer.prompt(questions);
    return option;
}

const pause = async () => {
    const question = [{
        type: 'input',
        name: 'continuar',
        message: `Presione ${'ENTER'.yellow} para continuar...`,
    }];
    await Inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor.'.yellow
            }
            return true;
        }
    }];
    const { desc } = await Inquirer.prompt(question);
    return desc;
}

const emailRecepientsError = async () => {
    const choices = [
        {
            value: 'a',
            name: 'a.'.green + ' Reescribir todos los correos.'
        },
        {
            value: 'b',
            name: 'b.'.green + ' Enviar solo a los correos correctos.'
        },
        {
            value: 'c',
            name: 'c.'.green + ' Cancelar todo.'
        },
    ]

    const questions = [{
        type: 'list',
        name: 'id',
        message: '¿Qué desea hacer?',
        choices
    }];
    const { id } = await Inquirer.prompt(questions);
    return id;
}

const emailFiles = async () => {
    const files = await read();

    if (!Array.isArray(files) || files.length === 0){
        return;
    }

    const choices = files.map((file, index)=>{
        
        return {
            value: {patn: path.join(process.cwd(), 'resource', file), filename: file},
            name: (index+1).toString().green + `. ${file}`
        }
    })

    const questions = [{
        type: 'checkbox',
        name: 'options',
        message: 'Elija un archivo.',
        choices
    }];

    const { options } = await Inquirer.prompt(questions);
    return options;
}

const confirm = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await Inquirer.prompt(question);
    return ok;

}


export {
    inquirerMenu,
    pause,
    readInput,
    emailRecepientsError,
    emailFiles,
    confirm,
}