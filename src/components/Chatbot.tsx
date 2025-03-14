import {CompositionEvent, FunctionComponent, KeyboardEvent, useEffect, useRef, useState} from 'react';
import {Message} from '../@types/domain.ts';
import {chatbotBlockStylesByRole, initMessage} from "../const/const.ts";
import {Button} from "./Button.tsx";
import {responseChat} from "../api/ChatbotApi.ts";
import character from './../assets/images/haru.png'
import {useNavigate} from 'react-router-dom'

export const Chatbot: FunctionComponent = () => {
  const [messages, setMessages] = useState<Message[]>(initMessage);
  const [input, setInput] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false)
  const conservationContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (messages.length > 0 && conservationContainerRef.current) {
      const scrollElement = conservationContainerRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);
  
  useEffect(() => {
    if(inputRef.current){
      inputRef.current.focus();
    }
  }, []);
  
  const handleQuestion = async () => {
    const trimmedInput = input.trim()
    
    if (trimmedInput) {
      const updatedMessages: Message[] = [
        ...messages,
        {role: 'user', content: trimmedInput}
      ];
      setMessages(updatedMessages);
      setInput(''); // 입력창 초기
      
      // const botResponse = await responseChat(`questionList : ${questionMapping[matchedKeyword]} input: ${trimmedInput}`);
      const botResponse = await responseChat(updatedMessages);
      if (botResponse) {
        if (botResponse.includes('결과정리')) {
          navigate('/results', {state: {response: botResponse}})
        }
        setMessages(prev => [...prev, {role: 'assistant', content: botResponse}])
      }
    }
  }
  
  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (input.trim() && !isComposing) {
        await handleQuestion(); // 엔터 키가 눌리면 질문 처리
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
    <div className={'relative w-full h-[90%]'}>
      <div className='absolute w-[30%] left-[0%] top-[10%] animate-slow-floating-rotating'>
        <img src={character} alt={'character'}/>
      </div>
      <div
        className="relative flex flex-col w-[50%] h-[100%] mx-auto mt-[42px] bg-gradient-to-b from-[#FFFFFF] to-[#DCCDFF] text-black rounded-[30px] shadow-2xl p-4">
        <div className="responses my-10 h-full overflow-y-scroll" ref={conservationContainerRef}>
          {messages.map((response, index) => {
            if (response.role === 'system') {
              return null;
            }
            const isAssistant = response.role === 'assistant'
            const {messageClass, userLabel, profile} = chatbotBlockStylesByRole[response.role] || {}
            const profileClass = 'chatbot-profile rounded-full w-[100px]';
            return (
              <div
                className={`flex items-center gap-6 mb-[67px] mx-10 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
                key={index}>
                <img
                  src={profile}
                  alt="profile"
                  className={profileClass}
                />
                <p
                  className={`${messageClass} font-pretendard max-w-[603px] text-[18px] p-[16px] rounded-[8px] break-keep`}>
                  <strong>{userLabel === '사용자' ? '' : userLabel}</strong> {response.content}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className={'flex w-[100%] h-[70px] mb-[15px] mx-auto rounded-[8px] overflow-hidden'}>
          <input
            type="text"
            value={input}
            ref={inputRef}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요."
            className="p-4 w-full bg-white font-pretendard"
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
          <Button onClick={handleQuestion} label={'보내기'}
                  className={'w-[150px] font-[20px] bg-[#7744ED] text-white font-pretendard'}/>
        </div>
      </div>
    </div>
  );
};
