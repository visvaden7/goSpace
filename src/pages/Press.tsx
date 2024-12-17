import {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {createPress} from "../api/ChatbotApi.ts";
import {Button} from "../components/Button.tsx";
import character4 from '../assets/images/charac4.png'
import {captureElementToBlobUrl} from "../utils/capturePage.ts";
import {LOADING_IMAGE, SERVER_URL} from "../const/const.ts";

interface PressType {
  '기사제목': string,
  '기사개요': string,
  '기자이름': string,
  '기사일자': string,
  '기사본문': string,
}

export const Press: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const text = location.state.response.contents;
  const imageList = location.state.response.imageList;
  const [press, setPress] = useState<PressType>({'기사제목': '', '기사개요': '', '기자이름': '', '기사일자': '', '기사본문': ''})
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<{ text: string, imageList: string[], w_data: string }>({
    text: '',
    imageList: [],
    w_data: ''
  })
  const captureDiv = useRef<HTMLDivElement>(null)
  // const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [modifiedImage, setModifiedImage] = useState('')
  const fetchData = async () => {
    try {
      const serializedText = text.join("&&&");
      const serializedImageList = imageList.join("&&&");
      const response = await axios.post(
        'https://gn50m.aixstudio.kr/api/space_chal/api_space_chal_save.php',
        {text: serializedText, imageList: serializedImageList}
      );
      console.log('서버 응답:', response);
      return response.data.data
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  const checkPress = async () => {
    try {
      const response = await createPress(text[0])
      if (response) return (JSON.parse(response)[0])
    } catch (err) {
      console.log(err)
    }
  }
  
  const capturePress = async () => {
    if (captureDiv.current) {
      try {
        // setCapturedImage(res);
        return await captureElementToBlobUrl(captureDiv.current)
      } catch (err) {
        console.log('캡처 실패:', err);
      }
    }
  };
  
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const [fetchedData, pressData] = await Promise.all([
          fetchData(),
          checkPress()
        ])
        if (fetchedData) {
          setData({
            text: fetchedData.text || '',
            imageList: Array.isArray(fetchedData.imageUrls) ? fetchedData.imageUrls : [],
            w_data: fetchedData.w_data || ''
          });
          setModifiedImage(fetchedData.imageUrls[0].replace(SERVER_URL, ''))
        }
        if (pressData) {
          setPress(pressData);
        }
      } catch (err) {
        console.error('데이터 로딩 실패 : ', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadData();
  }, []);
  
  const handleNext = async () => {
    const blobUrl = await capturePress();
    const updatedImageList = blobUrl ? [...data.imageList, blobUrl] : data.imageList;
    
    navigate('/download', {
      state: {
        response: {
          contents: data.text || text,
          imageList: updatedImageList || imageList,
        }
      }
    });
  };
  
  return (
    <div ref={captureDiv}>
      <p className={'text-[32px] font-nanumSquareRound font-extrabold text-white text-center mb-[32px]'}>너희가 너무 자랑스러워!
        2040년엔 아마도 이런 뉴스가 나올거야!</p>
      <div
        className={`flex w-[960px] h-[836px] relative ${isLoading ? 'bg-cover bg-black items-center justify-center' : 'bg-white'} rounded-[30px] mx-auto justify-between overflow-hidden`}>
        {isLoading ? (
          <div className={'w-full'}>
            <img src={LOADING_IMAGE} alt={'loading'} className={'w-full h-full'}/>
          </div>
        ) : (
          <div className={'p-[40px]'}>
            <div className={'flex flex-col w-[620px] relative text-black leading-[30px] border-l-black'}>
              <div className="absolute right-[-40px] top-0 h-[95%] w-[4px] bg-[#EDEDED] z-10]"></div>
              <strong><p className={'font-pretendard  h-[43px] text-[36px] mb-[30px]'}>{press['기사제목'] || '기사제목'}</p>
              </strong>
              <p className={'font-pretendard'}>{press['기자이름']}</p>
              <p className={'font-pretendard'}>{`입력: ${press['기사일자']}`}</p>
              <div className={'w-[100%] h-[1%] bg-[#EDEDED] mt-[10px]'}>{''}</div>
              <div className={'flex items-center'}>
                <div className={'w-[8px] h-[20px] bg-[#EDEDED] mr-[20px]'}></div>
                <strong><p className={'font-pretendard  text-[20px] my-[30px]'}>{press['기사개요'] || '기사개요'}</p></strong>
              </div>
              <div className={'flex justify-center'}>
                <img crossOrigin={'anonymous'} src={`https://aichal.aixstudio.kr/api/${modifiedImage}`} alt=""
                     className={'w-[300px] aspect-square'}/>
              </div>
              <p className={'font-pretendard break-keep mt-[10px]'}>{press['기사본문'] || '기사본문'}</p>
            </div>
            <div>
              <img src={character4} alt={'character1'} className={'absolute bottom-10 right-[100px] w-[132px] z-10'}/>
              <div className={'absolute bottom-[60px] right-5'}>
                <Button label={'>>'} onClick={handleNext}
                        className={'w-[134px] h-[86px] bg-gradient-to-br from-[#FFFB72] to-[#D3B600] rounded-tl-none rounded-tr-[43px] rounded-br-[43px] rounded-bl-none" z-10'}/>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};