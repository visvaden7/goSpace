import {useState} from "react";
import {Button} from "./Button.tsx";

import {generateImage} from "../api/generateImageApi.ts";
import {summaryContext} from "../api/ChatbotApi.ts";
import reload from '../assets/images/ic_undo@2x.png'

interface Props {
  contents: {
    text: string;
    idx: number;
  }
  onEdit: (updateText: string, idx: number) => void;
  onImageAdd: (image: string) => void;
}

export const ContentEditor = ({contents: {text, idx}, onEdit, onImageAdd}:Props) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isText, setIsText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const createImage = async (prompt: string) => {
    if(imageList.length === 3) {
      alert("이미지는 3번만 만들 수 있어요.")
      return;
    }
    setIsLoading(true)
    if(isLoading) {
      alert('이미지를 만들고 있어요. 조금만 기다려 주세요.')
      return;
    }
    try {
      const summarizedPrompt = await summaryContext(prompt) || prompt
      const response = await generateImage(summarizedPrompt)
      if(response && imageList.length < 3){
        onImageAdd(response)
        setImageList(prev => [...prev, response]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangeContent = async (prompt:string) => {
    setIsText(!isText)
    setIsReadOnly(true);
    setIsLoading(true);
    const response = await generateImage(prompt)
    if(response){
      onImageAdd(response)
      setImageList(prev => [...prev, response])
    }
    setIsLoading(false)
  }
  
  return (
    <div className={'flex justify-between gap-10'}>
      <textarea
        defaultValue={text}
        onChange={(e) => onEdit(e.target.value, idx)}
        className={
          'w-[512px] h-[346px] bg-[#EDEDED] font-pretendard font-bold text-black resize-none p-4'
        }
        readOnly={isReadOnly}
      />
      
      {
        isText ? (
          <div className={'w-[346px] flex justify-end items-center'}>
            <Button label={isReadOnly ? '더 수정하고 싶어요' : '수정완료'}
                    className={`w-[160px] h-[160px] ${!isReadOnly ? 'bg-[#F9F162]' : 'bg-[#EDEDED]'} rounded-full`}
                    onClick={() => setIsReadOnly(!isReadOnly)}/>
            <Button label={'완벽해요'} className={`w-[160px] h-[160px] ${isReadOnly ? 'bg-[#7744ED]' : 'bg-[#EDEDED]'} rounded-full ml-[20px]`}
                    onClick={() => isReadOnly ? handleChangeContent(text) : alert('‘수정 완료’ 버튼을 누른 후 이미지를 만들 수 있어요.')}/>
          </div>
        ) : (
          <div className={'flex flex-col justify-end'}>
            <div className={''}>
              <img src={isLoading ? '/data/loading_image.gif' : imageList[imageList.length - 1]} alt="" className={'w-[346px] h-[346px]'}/>
            </div>
            <div className={'flex justify-end mt-[12px]'} onClick={() => createImage(text)}>
              <img src={reload} alt={'reload'} className={'w-[24px] h-[24px]'}/>
              <p className={'text-black ml-[10px]'}>{imageList.length} / 3</p>
            </div>
          </div>
        )
      }
    </div>
  )
}