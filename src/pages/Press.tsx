import {FunctionComponent, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {createPress} from "../api/ChatbotApi.ts";
import {Button} from "../components/Button.tsx";
import character4 from '../assets/images/charac4.png'

// import {createPress} from "../api/ChatbotApi.ts";

interface PressType {
  '기사제목': string,
  '기사개요': string,
  '기사본문': string,
}

export const Press: FunctionComponent = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const text = location.state.response.contents;
  const imageList = location.state.response.imageList;
  const [press, setPress] = useState<PressType>({'기사제목': '', '기사개요': '', '기사본문': ''})
  // const [data, setData] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serializedText = text.join("&&&");
        const serializedImageList = imageList.join("&&&");
        const response = await axios.post(
          'https://gn50m.aixstudio.kr/api/space_chal/api_space_chal_save.php',
          {text: serializedText, imageList: serializedImageList}
        );
        console.log('서버 응답:', response);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    const checkPress = async () => {
      try {
        console.log(text[0])
        const response = await createPress(text[0])
        console.log(response)
        if (response) setPress(JSON.parse(response)[0])
        // setPress({'기사제목':r['기사제목'], '기사개요':text[0]['기사개요'], '기사내용':text[0]['기사내용']})
      } catch (err) {
        console.log(err)
      }
    }
    fetchData().then(res => console.log(res));
    checkPress().then(res => console.log(res));
  }, [text, imageList]);
  
  const handleNext = () => {
    // navigate('/press',{state: {response: {contents: contents, imageList: imageList}}})
  }
  
  return (
    <div>
      <p className={'text-[32px] font-nanumSquare font-bold text-white text-center mb-[32px]'}>너희가 너무 자랑스러워! 2040년엔 아마도 이런 뉴스가 나올거야!</p>
      <div className={'flex w-[960px] h-[836px] relative bg-white rounded-[30px] p-[40px] mx-auto justify-between'}>
        <div className={'flex flex-col w-[512px] relative text-black leading-[30px]'}>
          {/*{JSON.stringify(press)}*/}
          <strong><p className={'h-[43px] text-[36px] mb-[30px]'}>{press['기사제목'] || '기사제목'}</p></strong>
          <div className={'w-full h-[2px] bg-[#EDEDED]'}></div>
          <strong><p className={'text-[20px] my-[30px]'}>{press['기사개요']}</p></strong>
          <p>{press['기사본문']}</p>
        </div>
        <div>
          <img src={imageList[0]} alt="" className={'w-[300px] aspect-square ml-[52px]'}/>
        </div>
        <div>
          <img src={character4} alt={'character1'} className={'absolute bottom-10 right-[100px] w-[132px] z-10'}/>
          <div className={'absolute bottom-[60px] right-5'}>
            <Button label={'>>'} onClick={handleNext}
                    className={'w-[134px] h-[86px] bg-gradient-to-br from-[#FFFB72] to-[#D3B600] rounded-tl-none rounded-tr-[43px] rounded-br-[43px] rounded-bl-none" z-10'}/>
          </div>
        </div>
      </div>
    </div>
  );
};