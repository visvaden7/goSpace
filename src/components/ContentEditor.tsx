import {useState} from "react";
import {Button} from "./Button.tsx";
// import mockUpImage from "/src/assets/images/astranaut_profile1.png";
import {generateImage} from "../api/generateImageApi.ts";
import {summaryContext} from "../api/ChatbotApi.ts";

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
    if(response)onImageAdd(response)
    if(response) setImageList(prev => [...prev, response])
  }
  return (
    <div className={'flex gap-[47px]'}>
      <textarea
        defaultValue={text}
        onChange={(e) => onEdit(e.target.value, idx)}
        className={
          'w-[512px] h-[172px] bg-[#EDEDED] resize-none p-4 rounded-lg'
        }
        readOnly={isReadOnly}
      />
      
      {
        isText ? (
          <div className={'w-[30%] flex justify-between'}>
            <Button label={isReadOnly ? '수정하고 싶어요' : '수정X'}
                    className={'w-[160px] aspect-[1/1] bg-[#F9F162] rounded-full'}
                    onClick={() => setIsReadOnly(!isReadOnly)}/>
            <Button label={'완벽해요'} className={'w-[160px] aspect-[1/1] bg-[#7744ED] rounded-full ml-[20px]'}
                    onClick={() => handleChangeContent(text)}/>
          </div>
        ) : (
          <div className={'flex'}>
            <div>
              <img src={imageList[imageList.length - 1]} alt="" className={'w-[300px]'}/>
            </div>
            <Button label={'(이미지)새로고침'} className={'w-[160px] aspect-[1/1] bg-[#F9F162] rounded-full'}
                    onClick={() => createImage(text)}/>
            <Button label={'(이미지)완벽해요'} className={'w-[160px] aspect-[1/1] bg-[#7744ED] rounded-full'}
                    onClick={() => console.log('완벽')}/>
            {imageList.length} / 3
          </div>
        )
      }
    </div>
  )
}