import {Message} from "../@types/domain.ts";
import OpenAI from "openai";
import {systemMessage, userSettingMessage, YOUR_OPENAI_API_KEY} from "../const/const.ts";


/*
error list:
1. response error
2. valid error
* */

// OpenAI API 설정
const openai = new OpenAI({
  apiKey: YOUR_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const responseChat = async (chat: string) => {
  const messages: Message[] = [
    {role: 'system', content: systemMessage},
    {role: 'user', content: `${userSettingMessage} ${chat}`}
  ]
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 300,
    })
    
    return response.choices[0].message.content?.trim();
  } catch (err) {
    console.error('OpenAPI error 1: ', err);
  }
}

export const validateContext = async (conservationHistory: Message[]) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: conservationHistory,
      max_tokens: 10
    })
  return response.choices[0].message.content?.trim();
  } catch(err) {
    console.error('OpenAPI error 2: ', err);
  }
}
//
// // OpenAI API 설정
//
// const openai = new OpenAI({
//   apiKey: YOUR_OPENAI_API_KEY
// });
//
// // 질문 리스트
//
//
// // 대화 기록
// const conversationHistory = [
//   { role: "system", content: "너는 하루라는 마스코트야, 주제는 수학여행 우주로가자..." },
// ];
//
// // GPT를 사용하여 답변과 질문의 관련성 판단
// export async function isRelevantAnswer(question:string, answer:string) {
//   const prompt = `
// 질문과 답변이 주어졌습니다. 유저의 답변이 질문과 관련이 있는지 판단해주세요.
// - 질문: ${question}
// - 답변: ${answer}
//
// 결과를 "예" 또는 "아니요"로만 응답하세요.`;
//
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o", // GPT-4o-mini 모델 사용
//     messages: [
//       { role: "system", content: "유저의 답변이 질문과 관련 있는지 예/아니요로 판단해주세요." },
//       { role: "user", content: prompt },
//     ],
//     max_tokens: 10,
//     temperature: 0,
//   });
//
//   const result = response.data.choices[0].message.content.trim();
//   return result === "예";
// }
//
// // // 대화 진행
// // async function handleConversation() {
// //   // 처리된 질문 수 확인
// //   const processedQuestions = conversationHistory.filter(
// //     (msg) => msg.role === "assistant" && questionList.includes(msg.content)
// //   ).length;
// //
// //   // 다음 질문 가져오기
// //   const nextQuestion = questionList[processedQuestions];
// //   if (!nextQuestion) {
// //     console.log("모든 질문이 처리되었습니다!");
// //     return;
// //   }
// //
// //   // assistant가 질문하기
// //   conversationHistory.push({ role: "assistant", content: nextQuestion });
// //   console.log(`Assistant: ${nextQuestion}`);
// //
// //   // 유저의 답변 입력 (여기서는 사용자 입력을 가정)
// //   const userAnswer = "오늘 점심 뭐 먹지?"; // 예시 답변 (질문과 무관)
// //
// //   // GPT로 관련성 판단
// //   const relevant = await isRelevantAnswer(nextQuestion, userAnswer);
// //
// //   if (relevant) {
// //     // 답변이 관련 있는 경우
// //     conversationHistory.push({ role: "user", content: userAnswer });
// //     console.log("유저의 답변이 질문과 관련이 있습니다.");
// //     console.log("Markdown 출력:");
// //     console.log(generateMarkdown(conversationHistory));
// //     // 다음 질문으로 진행
// //     handleConversation();
// //   } else {
// //     // 답변이 관련이 없는 경우
// //     console.log("Assistant: 답변이 질문과 관련이 없는 것 같아요. 다시 생각해볼래요?");
// //     console.log(`Assistant: ${nextQuestion}`);
// //   }
// // }
// //
// // // Markdown 생성
// // function generateMarkdown(conversationHistory) {
// //   const lastAssistantMessage = conversationHistory
// //     .slice()
// //     .reverse()
// //     .find((msg) => msg.role === "assistant");
// //   const lastUserMessage = conversationHistory
// //     .slice()
// //     .reverse()
// //     .find((msg) => msg.role === "user");
// //
// //   if (lastAssistantMessage && lastUserMessage) {
// //     return `## 질문: ${lastAssistantMessage.content}\n\n- **답변**: ${lastUserMessage.content}`;
// //   }
// //   return "대화 내역이 없습니다.";
// // }
// //
// // // 대화 시작
// // handleConversation();
