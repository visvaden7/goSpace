// 메시지 타입 정의
export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};
