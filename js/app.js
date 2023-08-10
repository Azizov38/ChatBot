const showBtn = document.querySelector('.show-chatbot-toggle'),
      body = document.querySelector('body'),
      sendBtn = document.querySelector('.bx-send'),
      messageIntput = document.querySelector('.textarea'),
      chatBox = document.querySelector('.chatbox');

const API_KEY = "YOUR API KEY HERE"


let userMessage;

const generateRespone = (incomingChat)=>{
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const mesElement = incomingChat.querySelector('p');

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL,requestOptions).then(res =>res.json()).then(data=>{
        mesElement.textContent = data.choices[0].message.content;
        chatBox.scrollTo(0,chatBox.scrollHeight)
    }).catch(err=>{
        mesElement.textContent = 'Something went wrong, try again';
    }).finally(()=>{
        chatBox.scrollTo(0,chatBox.scrollHeight);
    })

}

const createMessage = (message,mesStatus)=>{
    const liMessage = document.createElement("li");
    liMessage.classList.add('chat', mesStatus);
    let content = mesStatus === "out" ? `<p></p>`:` <i class="bx bx-bot"></i>
                                                              <p></p>`;
    liMessage.innerHTML = content;
    liMessage.querySelector('p').textContent = message
    return liMessage;
}

const addMessage = ()=>{
    userMessage = messageIntput.value.trim();
    if(!userMessage) return;
    chatBox.appendChild(createMessage(userMessage,'out'));

    messageIntput.value = '';

    setTimeout(()=>{
        const incomingChat = createMessage('Thinking...','in')
        chatBox.appendChild(incomingChat)
        generateRespone(incomingChat)
    },500)
}



showBtn.addEventListener('click',()=>{
    body.classList.toggle('show-chatbot')
});

sendBtn.addEventListener('click',addMessage);

window.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addMessage()
    }
});
