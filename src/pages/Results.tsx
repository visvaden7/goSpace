import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {createMd} from "../api/ChatbotApi.ts";
// import {Button} from "../components/Button.tsx";
// import mockUpImage from '/src/assets/images/astranaut_profile1.png'
import {ContentEditor} from "../components/ContentEditor.tsx";
import {Button} from "../components/Button.tsx";

const Results: React.FC = () => {
  const location = useLocation();
  const response = location.state?.response || ''
  const [contents, setContents] = useState<string[]>([]);
  useEffect(() => {
    if(response) {
      createMd(response).then(res => {
        if(res){
          let result = ''
          result += res
          const slides = result.split('---')
          setContents(slides)
          console.log('1',contents)
        } else {
          console.log('데이터가 없습니다.')
        }
      })
      // const mockUp = '# 우주여행에서의 식량 --- ## 표지 **제목**: 우주여행에서의 식량 **팀명**: 이왈도 **팀원**: 왈도, 이삼, 사오 **요약**: 우주여행 시 효율적으로 식량을 제공하기 위한 방안으로, 가루 형태의 식재료와 3D 프린터를 이용한 조리 기술을 탐구하고, 해당 기술의 장점과 향후 가능성을 모색합니다. --- ## 1장: 주제 선택 배경 - **우주여행의 현실적 문제**: 장기간 여행 시 식량의 제한적 공급 이슈 - **효율적 식량 공급의 필요성**: 긴 여행에는 효율적인 식량이 필수 - **미래 지향적 솔루션 탐색**: 지속 가능한 식량 시스템 탐구 --- ## 2장: 특장점 - **적재 효율성**: 가루 형태로 저장 및 운반 용이 - **다양한 음식 생산**: 3D 프린터로 여러 가지 음식 조리가 가능 - **자원 절감**: 식량 손실 및 낭비 최소화 --- ## 3장: 시제품 사진 - **시제품 특징**: - 효율적 저장 및 운반 가능성 - 다양한 형태의 음식 생산 가능 - **이미지 추가 예정**: - 실제 이미지 및 다이어그램 추가 예정. --- ## 4장: 팀 소개 - **팀명**: 이왈도 - **팀원 및 역할**: - 왈도: 프로젝트 총괄 - 이삼: 기술 개발 - 사오: 연구 및 분석 - **팀 목표**: - 혁신적인 우주 식량 솔루션 개발 및 실용화 --- ## 5장: 결론 및 향후 전망 - **결론**: - 효율적인 식량 공급과 다양한 음식을 생산할 수 있는 기술은 우주여행에 큰 기여를 할 수 있습니다. - **향후 전망**: - 기술의 발전으로 맛과 냄새의 개선 기대 - 우주여행 외 다양한 분야에서의 활용 가능성 - **최종 메시지**: - 우리는 지속 가능한 미래 우주 여행을 위한 식량 솔루션을 현실화하고자 합니다.'
      // const testData = mockUp.split('---')
    }
  },[response])
  //TODO: API: 이미지를 불러내는 API
  //TODO: 파일 다운로드 기능 -> text, png, pdf
    return (
        <div>
            <h1>결과 페이지</h1>
          <p className={'text-white'}>결과 내용 : {response}</p>
          <p className={'text-white'}>123{contents}</p>
            <div className={'flex flex-col gap-10'}>
              {contents.map((content,idx) => {
                console.log(idx)
              return (
                <ContentEditor contents={{text: content}} onEdit={() => console.log('edit')} onImageAdd={() => console.log('add')} />
              )
            })}
              <Button label={'모두 완벽해요'} onClick={() => {}}/>
            </div>
        </div>
    );
};

export default Results;