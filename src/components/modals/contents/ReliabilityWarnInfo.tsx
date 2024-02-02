export default function ReliabilityWarnInfo() {
  return (
    <div className="leading-6 text-[#c2c2c5]">
      <div className="mb-3">
        메이플랜드 옥션의 시세 시스템은
        <br />
        <b className="text-[#2D7CEB]">아이템의 거래량</b>에 따라 시세의 신뢰성을
        판단해요.
      </div>
      <div className="mb-2 text-[15px] font-semibold text-[#e2e2e5] pt-3">
        # 신뢰성 문제
      </div>
      <div className="mb-3">
        디스코드 거래 게시판의 시세 메시지는{" "}
        <b className="text-[#2D7CEB]">
          의도적으로 아이템의 가격을 낮추거나 높게 설정하는 경우
        </b>
        가 있기에, 이런 시세들이 반영된다면 큰 시세의 변동을 초래할 수 있어요.
      </div>

      <div className="mb-2 text-[15px] font-semibold text-[#e2e2e5] pt-3">
        # 시세의 측정
      </div>
      <div className="mb-3">
        저희는 아래와 같은{" "}
        <b>
          <i>가정</i>
        </b>
        을 통하여
        <br />
        시세의 신뢰성에 대한 기준을 세웠어요.
      </div>

      <div className="bg-[#00000033] py-2 px-2 italic text-[#b2b2b6] rounded-md mb-3">
        대부분의 사람들은 기존 거래 가격에 맞추어 거래를 진행하려고 한다.
      </div>

      <div className="mb-3">
        즉, 기존의 거래 가격에 대한 평균치를 구하고, 그 가격을 기준으로 통계적인
        방법들을 사용하여 특이값들을 제거하는 방법으로 시세를 구하고 있어요.
      </div>
      <div className="mb-2 text-[15px] font-semibold text-[#e2e2e5] pt-3">
        # 신뢰성이 낮은 경우
      </div>
      <div className="mb-3">
        하지만 <b className="text-[#2D7CEB]">아이템의 거래량이 적은 경우</b>,
        시세의 밀집도가 낮아질 가능성이 높기 때문에 특이값을 제거하기
        어려워져요.
      </div>

      <div className="mb-3">
        이렇게{" "}
        <b className="text-[#2D7CEB]">
          거래량이 적은 아이템들에 대해 신뢰성이 낮다고 경고
        </b>
        하고 있어요.
      </div>

      <div className="mb-3">
        시세 측정에 대한 보조적인 지표를 원한다면, 아이템 시세 페이지 하단의
        거래 메시지들을 참고해주세요.
      </div>
    </div>
  );
}
