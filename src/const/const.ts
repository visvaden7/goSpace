import {Message} from "../@types/domain.ts";

export const SERVER_URL = "https://gn50m.aixstudio.kr/"
export const LOADING_IMAGE = '/data/loading.gif';
export const assistantChar = '하르'

export const initMessage: Message[] = [
  {
    role: "assistant",
    content: "내 이름은 하르야~ 반가워~~ 이번에 우주로 가는 수학여행에 대한 의견을 정리해주는데 도움을 줄꺼야~!"
  },
  {
    role: "assistant",
    content: "우주여행에 대해서 어떤 주제를 가지고 고민했어?"
  }
];

export const chatbotBlockStylesByRole = {
  assistant: {
    messageClass: 'chatbot-message justify-start bg-[#7744ED] text-white text-left',
    userLabel: assistantChar,
    profile: '/data/profile1.svg',
  },
  user: {
    messageClass: 'chatbot-message justify-end bg-[#F7EE5C] text-black text-left',
    userLabel: '사용자',
    profile: '/data/profile2.svg'
  },
};
