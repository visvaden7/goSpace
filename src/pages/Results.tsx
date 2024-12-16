import {FunctionComponent, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {createMd} from "../api/ChatbotApi.ts";
import {ContentEditor} from "../components/ContentEditor.tsx";
import {Button} from "../components/Button.tsx";
import character1 from '../assets/images/charac1.png';

export const Results: FunctionComponent = () => {
  const location = useLocation();
  const response = location.state?.response || ''
  const navigate = useNavigate()
  const [contents, setContents] = useState<string[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  
  useEffect(() => {
    if (response) {
      createMd(response).then(res => {
        if (res) {
          let result = ''
          result += res
          const slides = result.split('---')
          setContents(slides)
        } else {
          console.log('데이터가 없습니다.')
        }
      })
    }
  }, [response])
  //TODO: API: 이미지를 불러내는 API
  //TODO: 파일 다운로드 기능 -> text, png, pdf
  
  const handleSendData = () => {
    navigate('/press',{state: {response: {contents: contents, imageList: imageList}}})
  }
  
  const handleEditContents = (text: string, idx: number) => {
    const updatedContents = [...contents];
    updatedContents[idx] = text
    setContents(updatedContents)
  }
  
  
  return (
    <div>
      <p className={'mb-[30px] mt-[40px] text-[40px] text-center'}>이렇게 정리해봤는데 어때?</p>
      {/*<p className={'text-white'}>결과 내용 : {response}</p>*/}
      {/*<p className={'text-white'}>123{contents}</p>*/}
      <img src={character1} alt={'haru'} className={'absolute'}/>
      <div className={'flex flex-col w-[960px] h-[836px] bg-white p-[40px] rounded-[30px] gap-10 mx-auto overflow-scroll no-scrollbar'}>
        {contents.map((content, idx) => {
          return (
            <ContentEditor contents={{text: content.trim(), idx: idx}} onEdit={handleEditContents}
                           onImageAdd={(image:string) => setImageList(prev => [...prev, image])} key={idx}/>
          )
        })}
        <Button label={'모두 완벽해요'} onClick={handleSendData} className={'bg-[#9162FF] text-white h-[40px]'}/>
      </div>
    </div>
  );
};