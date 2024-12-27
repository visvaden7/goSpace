import {Message} from "../@types/domain.ts";
import OpenAI from "openai";
import {YOUR_OPENAI_API_KEY} from "../const/YOUR_OPENAI_API_KEY.ts";
import {createMdSystemMessage, createPressSystemMessage, systemMessage, userSettingMessage} from "../const/prompt.ts";

// OpenAI API 설정
const openai = new OpenAI({
  apiKey: YOUR_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const chatApi = async ( messages: Message[], model: string, maxToken?:number) => {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: messages,
      ...(maxToken !== undefined && {max_tokens: maxToken})
    })
    return response.choices[0].message.content?.trim();
  } catch (err) {
    console.error('OpenAPI error 1: ', err);
  }
}

export const responseChat = async (chat: Message[]) => {
  const messages: Message[] = [
    { role: 'system', content: `${systemMessage}${userSettingMessage}` },
    ...chat,
  ];
  return await chatApi(messages, 'gpt-4o-mini')
}



export const summaryContext = async (text: string) => {
  const messages: Message[] = [{role: 'user', content: `summary this ${text} in token 30`}]
  return await chatApi(messages, 'gpt-4o-mini', 30)
}


export const createMd = async (chat: string) => {
  const messages: Message[] = [
    {role: 'system' ,content: createMdSystemMessage},
    {role: 'user' ,content: chat}
  ]
  return await chatApi(messages, 'gpt-4o')
}

export const createPress = async (chat: string) => {
  const messages: Message[] = [
    {role: 'system', content: createPressSystemMessage},
    {role: 'user', content: chat}
  ]
  return await chatApi(messages, 'gpt-4o-mini')
}