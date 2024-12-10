import {Message} from "../@types/domain.ts";

export const initMessage: Message[] = [
  {
    role: "assistant",
    content: "내 이름은 하루야~ 반가워~~ 이번에 우주로 가는 수학여행에 대한 의견을 정리해주는데 도움을 줄꺼야~!"
  },
  {
    role: "assistant",
    content: "우주에는 방사성원소가 많아, 그래서 어떤 방식으로 보호하고 싶어? 우주복? 아니면 전자기장?"
  }
];


export const systemMessage = "너는 하루라는 마스코트야, 주제는 수학여행 우주로가자 인데, 앞으로 질문과 답이 들어오면 그에 맞는 장표를 md 형태로 출력해줘, '---'이것을 장표 나누는 기준으로 할거고, 현재 제일 들어간 대화리스트에서 제일 마지막 assistant 의 질문과 user 의 답에 한해서만 장표를 만들어줘, 만약에 맥락상 위에 질문과 이어진다면, 하나로 정리해서 md로 만들어줘"

export const userSettingMessage = "뒤에 올 text 에 따라 왜 그런 선택을 했는지에 대해서 질문해줘 "


export const questionList = [
  "우주에는 방사성원소가 많아, 그래서 어떤 방식으로 보호하고 싶어? 우주복? 아니면 전자기장?",
  "우주선 추진장치에는 여러 가지가 있는데, 복합추진제, 아니면 분리추진체?",
  "우주복에는 가시광선영역과 비가시광선영역을 구분할 수 있는 기능을 추가할 수 있는데 어떤 것을 추가할래?",
];

// const ConversationHistory: Message[] = [
//   { role: "system", content: "너는 하루라는 마스코트야, 주제는 수학여행 우주로가자 인데, 앞으로 질문과 답이 들어오면 그에 맞는 장표를 md형태로 출력해줘, '---'이것을 장표 나누는 기준으로 할거고, 현재 제일 들어간 대화리스트에서 제일 마지막 assistant의 질문과 user의 답에 한해서만 장표를 만들어줘, 만약에 맥락상 위에 질문과 이어진다면, 하나로 정리해서 md로 만들어줘" },
//   { role: "assistant", content: "우주에는 방사성원소가 많아, 그래서 어떤 방식으로 보호하고 싶어? 우주복? 아니면 전자기장?" },
//   { role: 'user', content: "전자기장으로 하고싶어"},
//   { role: "assistant", content: "왜 전자기장으로 선택했어?" },
//   { role: "user", content: "그게 별다른 자원소모없이 우주를 유영해볼 수 있을 것 같아서"},
// ];

export const assistantChar = '하루'

export const chatbotBlockStylesByRole = {
  assistant: {
    messageClass: 'chatbot-message justify-start bg-pink-400 text-black',
    userLabel: assistantChar,
    profile: '/images/haru_profile.png',
  },
  user: {
    messageClass: 'chatbot-message justify-end bg-black text-white',
    userLabel: '사용자',
    profile: '/images/astranaut_profile1.png'
  },
};
export const YOUR_OPENAI_API_KEY = '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'

