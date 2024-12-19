import {FunctionComponent, useEffect, useState} from 'react';
import { Button } from '../components/Button.tsx';
import character1 from '../assets/images/charac1.png';
import goSpaceButton from '../assets/images/goSpace.png';
import {useLocation} from "react-router-dom";
import {downloadFilesAsZip} from "../utils/fileDownload.ts";



const introduceMentions = [
  <>
    그럼 <span className="text-[#7744ED]">멋진제품 기대할게</span> <br/>
    내일 발표 잘 할거라고 생각해 <br/>
    <br/>
    언제든지 보고서 도우미가 필요하면 <br/>
    AI하루를 불러줘!<br/>
  </>
];

export const Download: FunctionComponent = () => {
  const location = useLocation()
  const text = location.state.response.contents
  const imageList = location.state.response.imageList
  
  const [introduceText] = useState(introduceMentions[0]);
  
  useEffect(() => {
    console.log("test",location)
    console.log(text)
    console.log(imageList)
  }, []);
  
  const handleDownload = () => {
    console.log("test",location)
    console.log(text)
    console.log(imageList)
    downloadFilesAsZip(typeof(text) === 'string' ? text : text.join(), imageList).then(res => console.log(res) )
    // setIntroduction(introduceMentions[1])
  }
  
  return (
    <div className="flex justify-center h-[800px] relative overflow-hidden mt-[120px]">
      {/* 캐릭터 이미지 */}
          <img
            src={character1}
            alt="character"
            className="absolute top-[44%] left-[27%] z-10"
          />
      {/*<p className={'text-white'}>{text}</p>*/}
      {/*<p className={'text-white'}>{imageList}</p>*/}
        {/* 텍스트 박스 */}
        <div
        className="flex items-center justify-center w-[960px] h-[540px] bg-gradient-to-b from-[#FFFFFF] to-[#DCCDFF] text-black rounded-[43px] border-[10px] border-[#AD83FF] shadow-2xl p-8">
        <div className="whitespace-pre-line font-nanumSquareRound font-extrabold text-[40px] leading-[60px] text-center">
          {introduceText}
        </div>
      </div>
      
      {/* 버튼 및 이미지 */}
      <div className="absolute bottom-[10%] flex flex-col items-center">
        <img
          src={goSpaceButton}
          alt="goSpaceButton"
          className="w-[100px] mb-[-6%] z-10"
        />
          <Button
            label="다운로드"
            className="w-[296px] h-[86px] bg-gradient-to-br from-[#FFFB72] to-[#D3B600] text-black font-bold text-2xl rounded-[43px] shadow-lg hover:shadow-2xl"
            onClick={handleDownload}
          />
      </div>
    </div>
  );
};
