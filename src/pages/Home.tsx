import {FunctionComponent, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../components/Button.tsx';
import character1 from '../assets/images/charac1.svg';
import character2 from '../assets/images/charac2.svg';
import goSpaceButton from '../assets/images/goSpace.svg';

const introduceMentions = [
  <>
    <p>
      안녕? 나는 <span className="text-[#7744ED]">인공지능 비서 하르야~!</span>
    </p>
    <p>너희가 멋진 발표를 할 수 있도록</p>
    <p>내가 옆에서 도와줄게!</p>
    <br/>
    <p>우주를 탐험할 멋진 아이디어를</p>
    <p>세상에 보여주자!</p>
  </>,
  <>
    <p>내 역할은 아주 간단해!</p>
    <p>너희가 만든 제품의 중요한 키워드를 모아서,</p>
    <p>깔끔한 보고서로 만들어줄게.</p>
    <br/>
    <p className="text-[#7744ED]">자 이제 발표 준비를 해보자!</p>
  </>
];

const Home: FunctionComponent = () => {
  const [introduceText, setIntroduction] = useState(introduceMentions[0]);
  const [isNext, setIsNext] = useState(true);
  
  const handleNext = () => {
    setIsNext(false)
    setIntroduction(introduceMentions[1])
  }
  
  return (
    <div className="flex justify-center h-[86%] relative overflow-hidden mt-[5.65%]">
      {/* 캐릭터 이미지 */}
      {isNext
        ? (
          <img
            src={character1}
            alt="character"
            className="absolute top-[45%] left-[27%] z-10 animate-floating"
          />
        ) : (
          <img
            src={character2}
            alt="character"
            className="absolute top-[45%] right-[27%] z-10 animate-floating"
          />
        )
      }
      
      
      {/* 텍스트 박스 */}
      <div
        className="flex items-center justify-center w-[960px] h-[540px] bg-gradient-to-b from-[#FFFFFF] to-[#DCCDFF] text-black rounded-[43px] border-[10px] border-[#AD83FF] shadow-custom-xl p-8">
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
        {isNext ? (
          // isNext가 true인 경우
          <Button
            label="시작해볼까?"
            className="w-[296px] h-[86px] bg-gradient-to-br from-[#FFFB72] to-[#D3B600] text-black font-bold text-2xl rounded-[43px] shadow-lg hover:shadow-2xl"
            onClick={handleNext}
          />
        ) : (
          // isNext가 false인 경우
          <Link to="/chatbot">
            <Button
              label="하르와 PPT 만들기"
              className="w-[296px] h-[86px] bg-gradient-to-br from-[#FFFB72] to-[#D3B600] text-black font-bold text-2xl rounded-[43px] shadow-lg hover:shadow-2xl"
              onClick={() => setIsNext(false)}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;