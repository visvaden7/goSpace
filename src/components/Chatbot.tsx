import {FunctionComponent, CompositionEvent ,KeyboardEvent, useEffect, useRef, useState} from 'react';
import {Message} from '../@types/domain.ts';
import {chatbotBlockStylesByRole, initMessage, questionList} from "../const/const.ts";
import {Button} from "./Button.tsx";
import {responseChat} from "../api/ChatbotApi.ts";
// import {isRelevantAnswer} from "../api/ChatbotApi.ts";

// const renderBotMessage = (botMessage: string) => {
//   if (botMessage.startsWith("http")) {
//     return (
//       <img
//         src={botMessage}
//         alt="bot-image"
//         style={{ maxWidth: "100%", width: "200px", height: "200px" }}
//       />
//     );
//   } else {
//     return <span>{botMessage}</span>;
//   }
// };


export const Chatbot: FunctionComponent = () => {
  const [messages, setMessages] = useState<Message[]>(initMessage);
  const [input, setInput] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const conservationContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messages.length > 0 && conservationContainerRef.current) {
      const scrollElement = conservationContainerRef.current;
      scrollElement.classList.add("has-new-message");
      scrollElement.scrollTop = scrollElement.scrollHeight;
      setTimeout(() => {
        scrollElement.classList.remove("has-new-message");
      }, 500); // 애니메이션 지속 시간과 동일하게 설정
    }
  }, [messages]);
  
  const handleQuestion = async () => {
    const trimmedInput = input.trim()
    const isPreviousMessageAskingWhy = messages[messages.length - 2]?.content.includes('왜')
    if (trimmedInput){
      setMessages(prev => [...prev, {role: 'user', content: input}]);
      setInput(''); // 입력창 초기
      console.log(isPreviousMessageAskingWhy)
      if (isPreviousMessageAskingWhy) {
        setMessages(prev => [...prev, {role: 'assistant', content: questionList[currentQuestionIndex]}])
      } else {
        const botResponse = await responseChat(trimmedInput);
        if(botResponse) {
          setMessages(prev => [...prev, {role: 'assistant', content: botResponse}])
        }
      }
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (input.trim() && !isComposing) {
        handleQuestion(); // 엔터 키가 눌리면 질문 처리
      }
    }
  }
  
  const handleCompositionStart = () => {
    setIsComposing(true); // 한글 조합 중임을 표시
  };
  
  // 한글 입력이 끝났을 때 (조합 완료)
  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false); // 조합 완료 표시
    setInput(e.currentTarget.value)
  };
  
  return (
    <div className="flex flex-col w-[50%] mx-auto mt-20 p-4 from-black to-transparent rounded shadow-lg">
      <div className="responses mb-4 h-[500px] overflow-y-scroll max-h-[50%]" ref={conservationContainerRef}>
        {messages.map((response, index) => {
          if (response.role === 'system') {
            return null; // 시스템 메시지는 렌더링하지 않음
          }
          const isAssistant = response.role === 'assistant'
          const {messageClass, userLabel, profile} = chatbotBlockStylesByRole[response.role] || {}
          const profileClass = 'chatbot-profile rounded-full w-[100px]';
          
          return (
            <div className={`flex items-center gap-4 mb-3 mx-10 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`} key={index}>
              <img
                src={profile}
                alt="profile"
                className={profileClass}
              />
              <p className={`${messageClass} p-2 rounded`}>
                <strong>{userLabel}</strong> {response.content}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className={'flex gap-2'}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="질문을 입력하세요..."
          className="border p-2 rounded w-full mb-2"
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <Button onClick={handleQuestion} label={'질문하기'}/>
      </div>
    </div>
  );
};