const Chat = require('../model/chat_model');

// Variável para armazenar o nome do usuário e o histórico da conversa
let userName = '';
let conversationHistory = [
  { role: 'system', content: 'Você é um assistente útil.' } // Mensagem inicial do sistema
];

// Função para determinar a resposta do bot com base em regras pré-definidas
function getBotResponse(message) {
  const lowerCaseMessage = message.toLowerCase();

  // Palavras-chave para saudações, agradecimentos, ajuda, etc.
  const greetings = ['oi', 'olá', 'ola', 'hello', 'hi', 'helo', 'hellow', 'oiiii', 'oie', 'oiee','oii', 'bom dia', 'boa tarde', 'boa noite', 'Bom dia', 'Boa tarde', 'Boa noite', 'bom diaa' , 'boa tardee', 'boa noitee', 'bom diaaa'];
  const gratitude = ['obrigado', 'obg', 'vlw', 'muito obg', 'mt obrigado', 'muito obrigado', 'obrigada', 'valeu', 'obga', 'obgo'];
  const helpRequests = ['ajuda', 'pode me ajudar?', 'preciso de ajuda', 'socorro', 'pd me ajudar?', 'me helpa'];
  const wellBeing = ['como você está', 'tudo bem?', 'ta bem?', 'td bem?', 'cm vc ta?', 'td bem com vc?', 'td bem com voce?', 'tudo bem com você?', 'oii td bem?', 'oi tudo bem?','oie tudo bem?', 'oii, td bem?', 'oie, td bem?', 'oi td bem?', 'oie td bem?'];
  const introductions = ['meu nome é', 'me chamo', 'eu sou', 'sou a', 'sou o'];
  const helpWithLesson = ['estou em dúvida', 'não consigo encontrar', 'me ajude a achar', 'não encontro', 'onde está', 'não sei onde encontrar', 'preciso de ajuda com', 'me ajude com'];

  // Verifica se o usuário se apresentou
  if (!userName && introductions.some((intro) => lowerCaseMessage.includes(intro))) {
    const intro = introductions.find((intro) => lowerCaseMessage.includes(intro));
    userName = lowerCaseMessage.split(intro)[1]?.trim().split(' ')[0] || 'Usuário';
    return `Prazer em te conhecer, ${userName}! Como posso te ajudar hoje?`;
  }

  // Verifica saudações
  if (greetings.some((greet) => lowerCaseMessage.includes(greet))) {
    return `Olá${userName ? `, ${userName}` : ''}! Como posso ajudar você?`;
  }

  // Verifica perguntas sobre o bem-estar
  if (wellBeing.some((wb) => lowerCaseMessage.includes(wb))) {
    return `Eu sou apenas uma tartaruga e, como você deve saber, vivo bastante e estou super bem, obrigado! E você, como está?`;
  }

  // Verifica pedidos de ajuda
  if (helpRequests.some((help) => lowerCaseMessage.includes(help))) {
    return `Claro! Diga-me como posso ajudar.`;
  }

  // Responde a dúvidas sobre aulas
  if (helpWithLesson.some((help) => lowerCaseMessage.includes(help))) {
    return `Entendi! Parece que você precisa de ajuda com uma aula. Qual aula você está procurando ou qual dúvida você tem? Eu posso te ajudar a encontrar o que você precisa.`;
  }

  // Verifica agradecimentos
  if (gratitude.some((thanks) => lowerCaseMessage.includes(thanks))) {
    return `De nada! Sempre que precisar, estarei aqui.`;
  }

  // Resposta padrão se nenhuma regra for acionada
  return `Desculpe, não entendi. Pode reformular ou me dar mais detalhes?`;
}

// Controlador para adicionar mensagens e interagir com o bot
exports.addMessage = async (req, res) => {
  try {
    const { user, message } = req.body;

    // Salva a mensagem do usuário no banco de dados
    const userMessage = new Chat({ user, message, timestamp: new Date() });
    await userMessage.save();

    // Gera a resposta do bot
    const botMessageContent = getBotResponse(message);
    const botMessage = new Chat({ user: 'Bot', message: botMessageContent, timestamp: new Date() });
    await botMessage.save();

    // Retorna as mensagens para o frontend
    res.json({ userMessage, botMessage });
  } catch (error) {
    console.error('Erro ao adicionar mensagem:', error);
    res.status(500).json({ error: 'Erro ao processar a mensagem' });
  }
};

// Controlador para recuperar todas as mensagens do banco de dados
exports.getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Erro ao recuperar mensagens:', error);
    res.status(500).json({ error: 'Erro ao recuperar as mensagens' });
  }
};