import html2canvas from "html2canvas";

/**
 * 화면의 특정 요소를 캡처하고 Blob URL로 반환하는 함수
 * @param {HTMLElement} element - 캡처할 DOM 요소
 * @returns {Promise<string>} Blob URL을 반환
 */
export const captureElementToBlobUrl = async (element: HTMLElement): Promise<string> => {
  if (!element) throw new Error("Element is required for capture");
  const body = document.body
  // html2canvas로 캡처
  const canvas = await html2canvas(body, {
    useCORS: true,
    allowTaint: false,
    logging: true,
  });
  
  // Canvas를 Blob으로 변환
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const blobUrl = URL.createObjectURL(blob); // Blob을 URL로 변환
        resolve(blobUrl);
      } else {
        reject("Failed to generate Blob from canvas");
      }
    });
  });
};
