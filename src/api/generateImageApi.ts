// import axios from "axios";
// import {REPLICATE_API_TOKEN} from "../const/const.ts";

// Replicate API를 호출하는 함수
// export const generateImagePage = async(prompt: string): Promise<string | null> => {
//   const apiUrl =
//     "https://api.replicate.com/v1/models/stability-ai/stable-diffusion-3.5-large/predictions";
//
//   try {
//     // 요청 본문 설정
//     const requestBody = {
//       input: {
//         prompt: `A image for presentation. Each frame contains highly detailed comic scenes including characters, actions. The overall page must have clean lines and vivid, dynamic artwork. Ensure that maintaining its format in every detail. contents is ${prompt} with no Dialogue balloons.`,
//         negative_prompt: "Ensure no frame distortions, blank or empty frames, or overlapping content outside of the frames. Avoid including any abstract or surreal elements. Ensure there are no deviations from the strict 2x2 grid structure. No horizontal or elongated frames, unequal frame sizes, or stretched or irregular panel shapes. No physical book textures or non-comic related elements are allowed. no ugly, no deformed, no noisy, no blurry, no distorted",
//         width: 346,
//         height: 172,
//         scheduler: "DPMSolverMultistep",
//         num_outputs: 1,
//         prompt_strength: 1,
//         num_inference_steps: 70,
//         // aspect_ratio: "1:1",
//         output_format: "png",
//         output_quality: 90,
//       },
//     };
//
//     // Axios 요청
//     const response = await axios.post(apiUrl, requestBody, {
//       headers: {
//         Authorization: `Bearer ${REPLICATE_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("check img", response);
//     // 결과 URL 반환
//     return response.data.urls.stream;
//   } catch (error) {
//     console.error("API 요청 중 오류 발생:", error);
//     return null; // 오류 발생 시 null 반환
//   }
// }

import OpenAI from "openai";

import {YOUR_OPENAI_API_KEY} from "../const/YOUR_OPENAI_API_KEY.ts";

const openai = new OpenAI({
  apiKey: YOUR_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateImage = async (prompt:string) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A professional and futuristic presentation cover image for the topic: ${prompt}. The design is cosmic-theme, Clean, modern, visually striking. **No text.**`,
      quality: "standard",
      size: "1024x1024", // 이미지 크기 설정
      n: 1,
    });
    // console.log(response.data[0].url);
    return response.data[0].url
  } catch (err) {
    console.error('OpenAPI error 1: ', err);
  }
  
}
