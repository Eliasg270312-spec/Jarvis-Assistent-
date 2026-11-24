const form=document.querySelector("#chat-form");
const input=document.querySelector("#prompt");
const messages=document.querySelector("#messages");
const mic=document.querySelector("#mic");

function addMessage(text,who){
  const row=document.createElement("div"); row.className=`message ${who}`;
  if(who==="jarvis"){const avatar=document.createElement("div");avatar.className="avatar";avatar.textContent="J";row.appendChild(avatar);}
  const bubble=document.createElement("div");bubble.className="bubble";
  if(who==="jarvis"){const sender=document.createElement("div");sender.className="sender";sender.textContent="JARVIS";bubble.appendChild(sender);}
  const content=document.createElement("div");content.textContent=text;bubble.appendChild(content);row.appendChild(bubble);messages.appendChild(row);messages.scrollTop=messages.scrollHeight;
}
function demoReply(text){
  const t=text.toLowerCase();
  if(t.includes("funktion")||t.includes("können")) return "Geplant sind ein echtes KI-Gehirn, natürliche Sprache, ein persönliches Gedächtnis, Recherche und Werkzeuge für deine Aufgaben. Aktuell bin ich noch im Demo-Modus.";
  if(t.includes("lernen")||t.includes("schule")) return "Gerne. Nenne mir das Fach und das Thema. Ich kann dir dann einen Lernplan erstellen und dich Schritt für Schritt abfragen. (Demo-Antwort)";
  if(t.includes("plan")||t.includes("heute")) return "Ich kann dir einen Tagesplan strukturieren. Schreibe mir deine Aufgaben und ungefähren Zeiten. (Demo-Antwort – ich kenne deinen Kalender noch nicht.)";
  return "Nachricht empfangen. Mein Chat-Interface funktioniert bereits, aber das KI-Gehirn ist noch nicht verbunden. Als Nächstes richten wir die sichere KI-Verbindung ein.";
}
function speak(text){
  if(!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);utterance.lang="de-DE";utterance.rate=1;
  window.speechSynthesis.speak(utterance);
}
function send(text){
  const clean=text.trim();if(!clean)return;
  addMessage(clean,"user");input.value="";
  const reply=demoReply(clean);
  setTimeout(()=>{addMessage(reply,"jarvis");speak(reply);},350);
}
form.addEventListener("submit",e=>{e.preventDefault();send(input.value);});
document.querySelectorAll(".quick").forEach(b=>b.addEventListener("click",()=>send(b.dataset.prompt)));
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SpeechRecognition){
  const recognition=new SpeechRecognition();recognition.lang="de-DE";recognition.interimResults=false;
  mic.addEventListener("click",()=>{try{recognition.start();mic.textContent="…";}catch(e){}});
  recognition.onresult=e=>{input.value=e.results[0][0].transcript;mic.textContent="⌁";form.requestSubmit();};
  recognition.onerror=()=>{mic.textContent="⌁";};
  recognition.onend=()=>{mic.textContent="⌁";};
}else{
  mic.title="Spracheingabe wird von diesem Browser nicht unterstützt";
  mic.addEventListener("click",()=>addMessage("Dieser Browser unterstützt die eingebaute Spracheingabe nicht. Bitte nutze zunächst die Texteingabe oder einen kompatiblen Browser.","jarvis"));
}
