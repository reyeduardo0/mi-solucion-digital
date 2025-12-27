document.addEventListener('DOMContentLoaded', () => {
    const chatIcon = document.getElementById('chatbot-icon');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');
    const typingIndicator = document.getElementById('typing-indicator');

    let isChatOpen = false;

    // --- 1. ABRIR / CERRAR CHAT ---
    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatWindow.classList.add('active');
            chatInput.focus();
        } else {
            chatWindow.classList.remove('active');
        }
    }

    if (chatIcon) chatIcon.addEventListener('click', toggleChat);
    if (chatClose) chatClose.addEventListener('click', toggleChat);

    // --- 2. ENVIAR MENSAJES ---
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Añadir mensaje del usuario
        addMessage(message, 'user');
        chatInput.value = '';

        // Simular respuesta del bot
        showTyping();

        // Simular "pensamiento" de la IA con un tiempo aleatorio
        const thinkTime = Math.random() * 1000 + 1000; // 1-2 segundos

        setTimeout(() => {
            const botResponse = getBotResponse(message);
            hideTyping();
            addMessage(botResponse, 'bot');
        }, thinkTime);
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // --- 3. FUNCIONES AUXILIARES ---
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTyping() {
        if (typingIndicator) typingIndicator.style.display = 'block';
        scrollToBottom();
    }

    function hideTyping() {
        if (typingIndicator) typingIndicator.style.display = 'none';
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // --- 4. LÓGICA DE RESPUESTA "IA" SIMPLE ---
    function getBotResponse(input) {
        input = input.toLowerCase();

        // Base de conocimiento simple
        if (input.includes('hola') || input.includes('buenos') || input.includes('saludos')) {
            return "¡Hola! ¿En qué puedo ayudarte a mejorar tu negocio hoy?";
        }
        else if (input.includes('precio') || input.includes('costo') || input.includes('tarifa')) {
            return "Nuestras tarifas dependen del alcance del proyecto. Sin embargo, ofrecemos consultorías iniciales gratuitas para evaluar tus necesidades. ¿Te gustaría agendar una?";
        }
        else if (input.includes('servicios') || input.includes('haces') || input.includes('ofreces')) {
            return "Ofrecemos desarrollo de software a medida, dashboards de Business Intelligence (Power BI/Tableau), automatización RPA y soluciones de Big Data.";
        }
        else if (input.includes('contacto') || input.includes('email') || input.includes('correo')) {
            return "Puedes contactarme directamente en reyeduardo0@gmail.com o a través de mis redes sociales en el pie de página.";
        }
        else if (input.includes('dashboard') || input.includes('bi') || input.includes('datos')) {
            return "Soy experto en transformar datos en decisiones. Puedo crear dashboards interactivos como los que ves en esta página para tu empresa.";
        }
        else if (input.includes('web') || input.includes('página') || input.includes('sitio')) {
            return "Desarrollo sitios web modernos, rápidos y optimizados para SEO. ¿Tienes algún diseño en mente?";
        }
        else {
            return "Interesante pregunta. Como soy una IA en entrenamiento, quizás sea mejor que Eduardo te responda personalmente. ¿Quieres que te deje su contacto?";
        }
    }
});
