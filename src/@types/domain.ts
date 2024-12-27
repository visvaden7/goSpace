// 메시지 타입 정의
export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export interface LocationStateType {
  contents: string | string[],
  imageList: string[],
}

export interface BotResponseType {
  response: string
}