const Discord = require('discord.js');
const mysql = require('mysql2')
const WebSocket = require('ws');
const {Client, GatewayIntentBits, PermissionFlagsBits, PermissionsBitField} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
let messageReceived = false
const ws = new WebSocket('ws://127.0.0.1:27014');
let dataLegivel = undefined
ws.on('message', function incoming(data) {
  dataLegivel = data.toString('utf-8')
  messageReceived = true;
});
const dbConfig = {
  host: 'localhost',
  user: 'wl',
  password: '77NyEfo8p08dBJT',
  database: 'vrpex'
};
// Conectar ao banco de dados
const connection = mysql.createConnection(dbConfig);
client.on('messageCreate', async message => {
if (!message.member) {
  return;
}
if (message.member == undefined) {
  return;
}

let perms = message.member.permissions;
if (!perms.has(PermissionsBitField.Flags.Administrator)){
  return;
} 
if (message.content.startsWith('!help')) {
  message.reply({content: "Lista de Comandos: \n Obs: Astericos indicam argumentos obrigatórios. \n !kick [ID]* [MOTIVO] - Kicka um usuário \n !ban [ID]* - Bane um usuário do jogo. \n !unban [ID]* - Desbane um usuário do jogo \n !limparinv [ID]* - Limpa o inventário e retira as armas do jogador. \n !anuncio [ANUNCIO]* - Envia um anúncio ao servidor. \n !rr - Reinicia o servidor. \n !addgroup [ID]* [GRUPO]* - Adiciona um usuário a determinado grupo. \n !removegroup [ID]* [GRUPO]* - Remove um usuário de um grupo. \n !god [ID]* - Dá god a um jogador. \n !matar [ID]* - Mata um jogador. \n !addmoney [ID]* [QUANTIDADE]* - Adiciona a quantidade definida na carteira do jogador. \n !removemoney [ID]* [QUANTIDADE]* - Remove a quantidade definida da carteira do jogador. \n !addcar [ID]* [CARRO]* - Adiciona um carro na garagem do jogador. \n !removecar [ID]* [CARRO]* - Remove um carro da garagem do jogador. \n !carlist [ID]* - Lista os veículos do jogador. \n !wl [ID]* - Adiciona um jogador a WL. \n !unwl [ID]* - Remove um jogador da WL.", ephemeral:true})
}
if (message.content.startsWith('!kick')) {
    var commandArgs = message.content.slice('!kick'.length).trim();
    var identifier = "k"
    sendToServer()   
}
if (message.content.startsWith('!ban')) {
  var commandArgs = message.content.slice('!ban'.length).trim();
  var identifier = "b"
  sendToServer()
  const args = message.content.split(' ');
  const dbUserId = args[1];
  if (!dbUserId) {
      return message.reply('Por favor, forneça um ID.');
  }
  const query = 'SELECT id FROM vrp_users WHERE id = ?';
  connection.query(query, [dbUserId], async (err, results) => {
      if (err) {
          console.error(err);
          return message.reply('Ocorreu um erro ao tentar verificar o ID no banco de dados.');
      }

      if (results.length > 0) {
          const updateQuery = 'UPDATE vrp_users SET banned = 1 WHERE id = ?';
          connection.query(updateQuery, [dbUserId], async (updateErr) => {
              if (updateErr) {
                  console.error(updateErr);
                  return message.reply('Ocorreu um erro ao tentar atualizar o banco de dados.');
              }
            }
          )
        }
        })
      }
if (message.content.startsWith('!unban')) {
  var commandArgs = message.content.slice('!unban'.length).trim();
  var identifier = "u"
  sendToServer()
  const args = message.content.split(' ');
  const dbUserId = args[1];
  if (!dbUserId) {
      return message.reply('Por favor, forneça um ID.');
  }
  const query = 'SELECT id FROM vrp_users WHERE id = ?';
  connection.query(query, [dbUserId], async (err, results) => {
      if (err) {
          console.error(err);
          return message.reply('Ocorreu um erro ao tentar verificar o ID no banco de dados.');
      }

      if (results.length > 0) {
          const updateQuery = 'UPDATE vrp_users SET banned = 0 WHERE id = ?';
          connection.query(updateQuery, [dbUserId], async (updateErr) => {
              if (updateErr) {
                  console.error(updateErr);
                  return message.reply('Ocorreu um erro ao tentar atualizar o banco de dados.');
              }
            }
          )
        }
        })
}
if (message.content.startsWith('!limparinv')) {
  var commandArgs = message.content.slice('!limparinv'.length).trim();
  var identifier = "l"
  sendToServer()
}
if (message.content.startsWith('!anuncio')) {
  var commandArgs = message.content.slice('!anuncio'.length).trim();
  var identifier = "a"
  sendToServer()
}
if (message.content.startsWith('!rr')) {
  var commandArgs = message.content.slice('!rr'.length).trim();
  var identifier = "r"
  sendToServer();
}
if (message.content.startsWith('!addgroup')) {
  var commandArgs = message.content.slice('!addgroup'.length).trim();
  var identifier = "g"
  sendToServer();
}
if (message.content.startsWith('!removegroup')) {
  var commandArgs = message.content.slice('!removegroup'.length).trim();
  var identifier = "p"
  sendToServer();
}
if (message.content.startsWith('!god')) {
  var commandArgs = message.content.slice('!god'.length).trim();
  var identifier = "x"
  sendToServer();
}
if (message.content.startsWith('!matar')) {
  var commandArgs = message.content.slice('!matar'.length).trim();
  var identifier = "y"
  sendToServer();
}
if (message.content.startsWith('!addmoney')) {
  var commandArgs = message.content.slice('!addmoney'.length).trim();
  var identifier = "z"
  sendToServer();
}
if (message.content.startsWith('!removemoney')) {
  var commandArgs = message.content.slice('!removemoney'.length).trim();
  var identifier = "d"
  sendToServer();
}
if (message.content.startsWith('!wl')) {
  const commandArgs = message.content.slice('!wl'.length).trim();
  const args = message.content.split(' ').slice(1);
  const userId = args[0];

  if (!userId) {
    return message.reply('Por favor, forneça um ID valido.');
  }

  const sql = 'UPDATE vrp_users SET whitelisted = 1 WHERE id = ? AND whitelisted = 0';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar whitelist:', err);
      return message.reply('Erro ao atualizar whitelist no banco de dados.');
    }

    if (results.affectedRows === 0) {
      return message.reply('Nenhum usuário encontrado com o ID: ' +userId+ ' ou o usuário já está na whitelist.');
    }

    message.reply('O ID: ' +userId+ ' foi adicionado à whitelist com sucesso.');
  });
}
if (message.content.startsWith('!unwl')) {
  const commandArgs = message.content.slice('!unwl'.length).trim();
  const args = message.content.split(' ').slice(1);
  const userId = args[0];

  if (!userId) {
    return message.reply('Por favor, forneça um ID valido.');
  }

  const sql = 'UPDATE vrp_users SET whitelisted = 0 WHERE id = ? AND whitelisted = 1';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar whitelist:', err);
      return message.reply('Erro ao atualizar o banco de dados.');
    }

    if (results.affectedRows === 0) {
      return message.reply('Nenhum usuário encontrado com o ID: ' +userId+ ' ou o usuario já esta sem wl.');
    }

    message.reply('O ID: ' +userId+ ' foi removido da whitelist com sucesso.');
  });
}
if (message.content.startsWith('!addcar')) {
  var commandArgs = message.content.slice('!addcar'.length).trim();
  var identifier = "f"
  const args = message.content.split(' ').slice(1);
  const userId = args[0];
  const vehicle = args[1];
  if (!userId || !vehicle) {
    return message.reply('Por favor, forneça um ID e um nome de carro valido.');
  }

  const sql = 'INSERT INTO vrp_user_vehicles (user_id, vehicle) VALUES (?, ?)';
  connection.query(sql, [userId, vehicle], (err, results) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      return message.reply('Erro ao inserir dados no banco de dados.');
    }
    message.reply('Veículo adicionado para o ID: ' +userId+ ' com sucesso');
  });
}
if (message.content.startsWith('!removecar')) {
  var commandArgs = message.content.slice('!removecar'.length).trim();
  var identifier = "h"
  const args = message.content.split(' ').slice(1); 
    const userId = args[0];
    const vehicle = args[1];

    if (!userId || !vehicle) {
      return message.reply('Por favor, forneça um ID e um nome de carro valido.');
    }

    const sql = 'DELETE FROM vrp_user_vehicles WHERE user_id = ? AND vehicle = ?';
    connection.query(sql, [userId, vehicle], (err, results) => {
      if (err) {
        console.error('Erro ao remover dados:', err);
        return message.reply('Erro ao remover dados do banco de dados.');
      }

      if (results.affectedRows === 0) {
        return message.reply('Nenhum veículo encontrado para o ID: ' +userId+ ' com as informações fornecidas.');
      }

      message.reply('Veículo removido do ID: ' +userId+ ' com sucesso');
    });
  }
if (message.content.startsWith('!carlist')) {
  var commandArgs = message.content.slice('!carlist'.length).trim();
  const args = message.content.split(' ').slice(1); // Ignora o comando e pega os argumentos
  const userId = args[0];

  if (!userId) {
    return message.reply('Por favor, forneça um ID valido.');
  }
  
  const sql = 'SELECT vehicle FROM vrp_user_vehicles WHERE user_id = ?';
  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao listar veículos:', err);
      return message.reply('Erro ao listar veículos no banco de dados.');
    }

    if (results.length === 0) {
      return message.reply('Nenhum carro encontrado para o ID: '+userId+ '.');
    }

    const vehicles = results.map(row => `Veículo: ${row.vehicle}`).join('\n');
    message.reply(`**Carros do ID**: ${userId} \n${vehicles}`);
  });
}
function esperaAe() {
  if (messageReceived = false) {
  setTimeout(esperaAe, 200)
  }
  else {
    message.reply(dataLegivel)
    console.log(dataLegivel)
    messageReceived = false;
  }
}
function sendToServer() {
  const final = identifier + " " + commandArgs
  try {
    console.log('Enviando comando...')
    ws.send(final);
    console.log('Comando enviado ao servidor com sucesso.')
    setTimeout(esperaAe, 200)
  }
    catch (error) {
    console.error('Erro enviando mensagem ao WebSocket:', error);
    message.channel.send('Ocorreu um erro ao enviar a mensagem ao WebSocket, verifique o console.');
  }

}



});

ws.on('open', function open() {
  console.log('Conectado ao WebSocket');
});

client.login("MTI1MDMyOTI0NzA3MjEyOTEzNQ.GaaHhX.p_NdMhapVbdhxGp57qm7Ubs90PlWEBXQnTbxGM");