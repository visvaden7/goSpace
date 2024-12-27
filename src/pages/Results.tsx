import {FunctionComponent, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {createMd} from "../api/ChatbotApi.ts";
import {ContentEditor} from "../components/ContentEditor.tsx";
import {Button} from "../components/Button.tsx";
import character1 from '../assets/images/charac1.svg';
import {BotResponseType} from "../@types/domain.ts";

export const Results: FunctionComponent = () => {
  const location = useLocation();
  const { response } = location.state as BotResponseType
  const navigate = useNavigate()
  const [contents, setContents] = useState<string[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const [checkList, setCheckList] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClickNext = (idx: number) => {
    setCheckList(prev => {
      if (!prev.includes(idx)) {
        return [...prev, idx]
      }
      console.log(prev)
      return prev
    })
  }
  
  useEffect(() => {
    if (response) {
      setIsLoading(true)
      createMd(response).then(res => {
          if (res) {
            const slides = res.split('---').filter(it => it !== '')
            setContents(slides)
          } else {
            console.error('데이터가 없습니다.')
          }
        })
        .catch((err) => {
          console.error('데이터 로드 실패 : ', err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [response])
  
  const handleSendData = () => {
    if (checkList.length < 6) {
      alert('이미지 생성 후, 진행 가능합니다.')
      return;
    }
    navigate('/press', {
      state:
        {response: {contents: contents, imageList: imageList}}
    })
  }
  
  const handleEditContents = (text: string, idx: number) => {
    const updatedContents = [...contents];
    updatedContents[idx] = text
    setContents(updatedContents)
  }
  
  
  return (
    <div className={'relative h-full overflow-hidden'}>
      <p className={'mb-[30px] mt-[40px] text-[40px] font-nanumSquareRoundEB text-center text-white'}>이렇게 정리해봤는데 어때?</p>
      {isLoading ?
        (
          <div
            className={'relative w-[40%] h-[75%] rounded-[30px] bg-[#001F34] mx-auto mt-20 overflow-hidden'}>
            <div className={'relative flex w-full h-full items-center justify-center'}>
              <img src={'/data/loading.gif'} alt={'loading'} className={'absolute object-cover'}/>
              <img src={'/data/star.png'} alt={'loading_star'} className={'absolute object-cover'}/>
            </div>
          </div>
        ) : (
          <div className={'relative h-screen overflow-hidden'}>
            <img src={character1} alt={'하르'} className={'absolute bottom-[40%] left-[10%] animate-floating'}/>
            <div
              className={'flex flex-col w-[50%] h-[75%] bg-white p-[40px] rounded-[30px] gap-10 mx-auto shadow-custom-xl overflow-y-scroll'}>
              {contents.map((content, idx) => {
                return (
                  <ContentEditor contents={{text: content.trim(), idx: idx}} onEdit={handleEditContents}
                                 onImageAdd={(image: string) => setImageList(prev => [...prev, image])}
                                 onCheckAdd={handleClickNext}
                                 key={idx}/>
                )
              })}
              <Button label={'모두 완벽해요'} onClick={handleSendData}
                      className={`${checkList.length > 5 ? 'bg-[#9162FF]' : 'bg-[#EDEDED]'} rounded-[30px] text-white min-h-[64px]`}/>
            </div>
          </div>
        )}
    </div>
  );
};