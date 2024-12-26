import JSZip from "jszip";
import {saveAs} from 'file-saver';
import {SERVER_URL} from "../const/const.ts";

export const downloadFilesAsZip = async (text:string, imageList:string[]) => {
  const zip = new JSZip();
  // **1. 텍스트 파일 추가**
  zip.file("present_text.txt", text);
  // **2. 이미지 URL 리스트 추가**
  const imageUrls = [
    ...imageList
  ];
  // 이미지 다운로드 및 추가
  const imageFolder = zip.folder("images"); // 이미지 폴더 생성
  const imagePromises = imageUrls.map(async (url, index) => {
    try {
      let blob: Blob | null = null;
      
      // `blob:` URL인 경우 처리
      if (url.startsWith("blob:")) {
        // `blob:` URL에서 Blob 객체 가져오기
        const response = await fetch(url);
        blob = await response.blob();
      } else {
        // 일반 URL 처리
        const modifiedUrl = url.replace(SERVER_URL, "");
        const response = await fetch(`https://aichal.aixstudio.kr/api/${modifiedUrl}`);
        blob = await response.blob();
      }
      if(blob){
        const fileName = `image_${index + 1}.png`;
        imageFolder?.file(fileName, blob); // 이미지 파일 추가
      }
      
    } catch (error) {
      console.error(`이미지 다운로드 실패: ${url}`, error);
    }
  });
  // 모든 이미지 다운로드 완료 후 ZIP 생성
  await Promise.all(imagePromises);
  // **3. ZIP 파일 생성 및 다운로드**
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "files_for_present.zip"); // 압축 파일 저장
  });
};