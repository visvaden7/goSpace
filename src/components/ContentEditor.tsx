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
  
  const createImage = async (prompt: string) => {
    //TODO: 이미지 생성 API
    console.log("prompt" , prompt)
    const summarizedPrompt = await summaryContext(prompt) || prompt
    console.log('summarized', summarizedPrompt)
    const response = await generateImage(summarizedPrompt)
    // const response = mockUpImage
    if(response && imageList.length < 3){
      onImageAdd(response)
      setImageList(prev => [...prev, response]);
    }
  }

  const handleChangeContent = async (prompt:string) => {
    setIsText(!isText)
    setIsReadOnly(true);
    const response = await generateImage(prompt)
    if(response) onImageAdd(response)
    if(response) setImageList(prev => [...prev, response])
  }
  
  return (
    <div className={'flex justify-between'}>
      <textarea
        defaultValue={text}
        onChange={(e) => onEdit(e.target.value, idx)}
        className={
          'w-[512px] h-[346px] bg-[#EDEDED] text-black resize-none p-4'
        }
        readOnly={isReadOnly}
      />
      
      {
        isText ? (
          <div className={'w-[346px] flex justify-end items-center'}>
            <Button label={isReadOnly ? '수정하고 싶어요' : '수정X'}
                    className={'w-[160px] h-[160px] bg-[#F9F162] rounded-full'}
                    onClick={() => setIsReadOnly(!isReadOnly)}/>
            <Button label={'완벽해요'} className={'w-[160px] h-[160px] bg-[#7744ED] rounded-full ml-[20px]'}
                    onClick={() => handleChangeContent(text)}/>
          </div>
        ) : (
          <div className={'flex flex-col justify-end'}>
            <div className={''}>
              <img src={imageList[imageList.length - 1]} alt="" className={'w-[346px] aspect-square'}/>
            </div>
            <div className={'flex justify-end mt-[12px]'} onClick={() => createImage(text)}>
              <img src={reload} alt={'reload'} className={'w-[24px] h-[24px]'}/>
              <p>{imageList.length} / 3</p>
            </div>
          </div>
        )
      }
    </div>
  )
}