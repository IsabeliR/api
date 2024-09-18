const Chat = require('../model/chat_model');

// Função para determinar a resposta do bot
function getBotResponse(message) {
  const lowerCaseMessage = message.toLowerCase();

  // Arrays de palavras/frases para diferentes respostas
  const oi = ['oi', 'olá', 'oie', 'eae', 'oii'];
  const tdBem = ['como você está', 'tudo bem?', 'td bem?', 'ta bem?'];
  const despedida = ['adeus', 'tchau', 'tchauu'];

  if (oi.some(ola => lowerCaseMessage.includes(ola))) {
    return 'Olá! Como posso ajudar?';
  } 

  else if (tdBem.some(taBem => lowerCaseMessage.includes(taBem))) {
    return 'Sou apenas um código, mas estou funcionando perfeitamente!';
  } 
  else if (despedida.some(tchau => lowerCaseMessage.includes(tchau))) {
    return 'Até logo! Volte sempre!';
  } 
  else {
    return 'Desculpe, não entendi. Pode reformular?';
  }
}


exports.addMessage = async (req, res) => {
  try {
    const { user, message } = req.body;

    // Salva a mensagem do usuário
    const userMessage = new Chat({ user, message });
    await userMessage.save();

    // Gera uma resposta do bot
    const botMessage = new Chat({ user: 'Bot', message: getBotResponse(message) });
    await botMessage.save();

    // Envia as mensagens salvas para o frontend
    res.json({ userMessage, botMessage });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar a mensagem' });
  }
};

// Controlador para recuperar todas as mensagens
exports.getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao recuperar as mensagens' });
  }
};
