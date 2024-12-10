import {FunctionComponent, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Button} from "../components/Button.tsx";

const introduceMentions = [
  "안녕? 나는 인공지능 비서 라봉이야~!",
  "너희가 멋진 발표를 할 수 있도록 내가 옆에서 도와줄게!",
  "우주를 탐험할 멋진 아이디어를 세상에 보여주자!"
];

const Home: FunctionComponent = () => {
  const [introduceText, setIntroduceText] = useState<string>(introduceMentions[0]); // 초기 멘트 설정
  const [currentMentionIndex, setCurrentMentionIndex] = useState<number>(0); // 인덱스 상태

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentMentionIndex + 1) % introduceMentions.length; // 다음 인덱스 계산
      setIntroduceText(introduceMentions[nextIndex]); // 다음 멘트 설정
      setCurrentMentionIndex(nextIndex); // 인덱스 업데이트
    }, 2000); // 2초 간격으로 변경

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [currentMentionIndex]); // currentMentionIndex가 변경될 때마다 실행

  return (
    <div className="flex items-center justify-center h-screen"> {/* Flexbox로 중앙 정렬 */}
      <div className='w-10 bg-red-100 text-center p-4'> {/* 텍스트 중앙 정렬 및 패딩 추가 */}
        <h1>메인 페이지</h1>
        <div>{introduceText}</div> {/* 문자열을 JSX로 렌더링 */}
        <Link to='/chatbot'> {/* Link 컴포넌트 사용 */}
          <Button label='시작' onClick={() => {}} /> {/* onClick은 필요 없지만, 유지 */}
        </Link>
      </div>
    </div>
  );
};

export default Home;