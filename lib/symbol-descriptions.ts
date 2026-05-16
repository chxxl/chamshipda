// P&ID 심볼 설명 데이터베이스
export interface SymbolDescription {
  id: string
  nameKo: string
  nameEn: string
  category: string
  description: string
  connectionTypes?: string[]
  imageUrl?: string
}

export const symbolDescriptions: SymbolDescription[] = [
  // === Connection Types 연결 방식 ===
  {
    id: "butt_weld_connection",
    nameKo: "버트 웰드",
    nameEn: "Butt Weld",
    category: "연결 방식",
    description: "배관과 부품 끝단을 서로 맞대어 용접하는 연결방식으로, 강도와 기밀성이 중요한 배관에 사용된다."
  },
  {
    id: "socket_weld_connection",
    nameKo: "소켓 웰드",
    nameEn: "Socket Weld",
    category: "연결 방식",
    description: "배관을 부품의 소켓 안에 끼운 뒤 외부를 용접하는 연결방식으로, 주로 소구경 배관에 사용된다."
  },
  {
    id: "threaded_connection",
    nameKo: "나사 연결",
    nameEn: "Threaded",
    category: "연결 방식",
    description: "배관과 부품을 나사산으로 체결하는 연결방식으로, 분해가 가능하며 소구경·저압 배관에 사용된다."
  },
  {
    id: "flanged_connection",
    nameKo: "플랜지 연결",
    nameEn: "Flanged",
    category: "연결 방식",
    description: "배관과 부품 양끝의 플랜지를 볼트와 가스켓으로 체결하는 연결방식으로, 설치와 정비가 쉽다."
  },

  // === Fittings ===
  {
    id: "elbow_90",
    nameKo: "90도 엘보",
    nameEn: "Elbow 90°",
    category: "Fittings",
    description: "배관 방향을 90도로 꺾어주는 피팅이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow%2090-0dapu9reZSM1DfVsCnFy9LlmVUYjvE.png"
  },
  {
    id: "elbow_45",
    nameKo: "45도 엘보",
    nameEn: "Elbow 45°",
    category: "Fittings",
    description: "배관 방향을 45도로 완만하게 변경할 때 사용하는 피팅이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/elbow%2045-GNpYji8hQ5YZctFpHylTLU062iiPdm.png"
  },
  {
    id: "tee_equal",
    nameKo: "이퀄 티",
    nameEn: "Tee Equal",
    category: "Fittings",
    description: "같은 지름의 배관을 세 방향으로 분기할 때 사용하는 T자형 피팅이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20equal%20-fv0HX1Wj5WY0JkteE5LqdQ5PSKUsDH.png"
  },
  {
    id: "tee_reducing",
    nameKo: "레듀싱 티",
    nameEn: "Tee Reducing",
    category: "Fittings",
    description: "주 배관보다 작은 지름의 배관을 분기할 때 사용하는 T자형 피팅이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tee%20reducing%20-v3cMzzaf45GDO5YeLLzMupddRMkLKR.png"
  },
  {
    id: "cap",
    nameKo: "캡",
    nameEn: "Cap",
    category: "Fittings",
    description: "배관 끝단을 막아 유체 흐름을 차단하는 마감용 피팅이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cap%20-wdgDj6K4CzAaVtbgevGJSAB0yimIKE.png"
  },
  {
    id: "reducer_concentric",
    nameKo: "동심 레듀서",
    nameEn: "Reducer Concentric",
    category: "Fittings",
    description: "중심선이 같은 상태로 큰 배관과 작은 배관을 연결하는 축소 피팅이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reducer%20concentric-ewE3ZauawNQN2GfnIt2imXwIMrLbev.png"
  },
  {
    id: "reducer_eccentric",
    nameKo: "편심 레듀서",
    nameEn: "Reducer Eccentric",
    category: "Fittings",
    description: "중심선이 어긋난 상태로 배관 지름을 줄여 배수나 공기 고임을 방지하는 축소 피팅이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/reducer%20eccentic-Ev5cYQL6CFyB9SgOb4kiyb1uWhAGCC.png"
  },

  // === Flanges ===
  {
    id: "welding_neck_flange",
    nameKo: "웰딩넥 플랜지",
    nameEn: "Welding Neck Flange",
    category: "Flanges",
    description: "긴 목 부분을 배관에 맞대기 용접하여 고압·고온 배관에 사용하는 플랜지이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/welding%20neck%20-eJFdAjIrNOCF9cXQBYHs0x2Pvb6tSf.png"
  },
  {
    id: "socket_weld_flange",
    nameKo: "소켓 웰드 플랜지",
    nameEn: "Socket Weld Flange",
    category: "Flanges",
    description: "배관을 플랜지 소켓에 끼운 뒤 용접하는 소구경용 플랜지이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flanges_socket%20weld%20-aYEfInMV6EFi1vY1ZX7jv6h2Xq5rjM.png"
  },
  {
    id: "threaded_flange",
    nameKo: "나사형 플랜지",
    nameEn: "Threaded Flange",
    category: "Flanges",
    description: "배관과 플랜지를 나사로 체결하는 방식의 플랜지이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flanges_threaded-ueV78CH3GMUyNwNjEI1bqHGa736lKk.png"
  },
  {
    id: "slip_on_flange",
    nameKo: "슬립온 플랜지",
    nameEn: "Slip-on Flange",
    category: "Flanges",
    description: "배관을 플랜지 안으로 끼운 뒤 안팎을 용접하는 시공이 쉬운 플랜지이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flanges_slipon-TEnMCXW3yOMsckjDi6XneeoNrz6kiG.png"
  },
  {
    id: "lap_joint_flange",
    nameKo: "랩 조인트 플랜지",
    nameEn: "Lap-joint Flange",
    category: "Flanges",
    description: "스터브 엔드와 함께 사용하며 방향 조정과 분해 정비가 쉬운 플랜지이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flanges_lapjoint%20-vByGNvCkWVq6sjgTjO1TrU15fH4UUL.png"
  },
  {
    id: "blind_flange",
    nameKo: "블라인드 플랜지",
    nameEn: "Blind Flange",
    category: "Flanges",
    description: "배관이나 장비 노즐 끝을 막는 데 사용하는 막음용 플랜지이다.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flanges_blind%20-XI1GFqwUApxdPKAumqVRYplehgtVzb.png"
  },

  // === Valves ===
  {
    id: "gate_valve",
    nameKo: "게이트 밸브",
    nameEn: "Gate Valve",
    category: "Valves",
    description: "유체 흐름을 완전히 열거나 닫는 개폐용 밸브이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gate%20valve%20-yJv3GhxOZtgwy956SnRf3ePkw7RRnE.png"
  },
  {
    id: "globe_valve",
    nameKo: "글로브 밸브",
    nameEn: "Globe Valve",
    category: "Valves",
    description: "유량을 조절하거나 차단할 때 사용하는 조절 성능이 좋은 밸브이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/globe%20valve%20-MMv8kDLuMIMYtv5TQjDGsrKagwDaYA.png"
  },
  {
    id: "ball_valve",
    nameKo: "볼 밸브",
    nameEn: "Ball Valve",
    category: "Valves",
    description: "구멍이 뚫린 볼을 회전시켜 빠르게 열고 닫는 밸브이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ball%20vavle%20-NrveMuk76drdDzUs63Bcd57zkcNCcL.png"
  },
  {
    id: "plug_valve",
    nameKo: "플러그 밸브",
    nameEn: "Plug Valve",
    category: "Valves",
    description: "플러그 형태의 회전체를 돌려 유체 흐름을 개폐하는 밸브이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/plug%20valve%20-HWeqIBu0C4Ufhvq0sGIiqXrPWUa9er.png"
  },
  {
    id: "butterfly_valve",
    nameKo: "버터플라이 밸브",
    nameEn: "Butterfly Valve",
    category: "Valves",
    description: "원판형 디스크를 회전시켜 유체 흐름을 조절하거나 차단하는 밸브이다.",
    connectionTypes: ["Butt Weld", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/butterfly%20valve-nl6IP6tz9BMEpkmp1wm8ak3iRNGr5l.png"
  },
  {
    id: "needle_valve",
    nameKo: "니들 밸브",
    nameEn: "Needle Valve",
    category: "Valves",
    description: "바늘 모양의 플러그로 작은 유량을 정밀하게 조절하는 밸브이다.",
    connectionTypes: ["Butt Weld", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/needle%20valve%20-Ab1KJlouqz12U8UwmMF208eyuIr8Fa.png"
  },
  {
    id: "diaphragm_valve",
    nameKo: "다이어프램 밸브",
    nameEn: "Diaphragm Valve",
    category: "Valves",
    description: "다이어프램 막을 이용해 유체를 차단하거나 조절하는 밸브이다.",
    connectionTypes: ["Socket Weld", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/diaphragm%20valve%20-yBEzMJeMdFXAQP1fdQRHQ6gw2uBoYP.png"
  },
  {
    id: "y_type_valve",
    nameKo: "Y형 밸브",
    nameEn: "Y-type Valve",
    category: "Valves",
    description: "밸브 몸체가 Y자 형태로 되어 압력 손실을 줄인 밸브이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ytype%20valve%20-0dyK3IbO7EBfvF5uVr8Ct3sCna9UTn.png"
  },
  {
    id: "three_way_valve",
    nameKo: "3방향 밸브",
    nameEn: "Three-way Valve",
    category: "Valves",
    description: "세 방향의 유로를 전환하거나 혼합·분배할 때 사용하는 밸브이다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/three%20way%20valve%20-FVYvJPbfLEybYR5ObLkKw4Mmki0BR5.png"
  },
  {
    id: "check_valve",
    nameKo: "체크 밸브",
    nameEn: "Check Valve",
    category: "Valves",
    description: "유체가 한쪽 방향으로만 흐르게 하고 역류를 방지하는 밸브이다.",
    connectionTypes: ["Butt Weld", "Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/check%20valve%20-XManj77jRHzQWVypPPbEZgDx3OwnxS.png"
  },
  {
    id: "bottom_valve",
    nameKo: "바텀 밸브",
    nameEn: "Bottom Valve",
    category: "Valves",
    description: "탱크나 용기 하부에 설치되어 배출 또는 차단 기능을 하는 밸브이다.",
    connectionTypes: ["Threaded"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bottom%20valve%20-KsWVImKaoCIp06zPOxx0rOnnGudWdX.png"
  },
  {
    id: "relief_valve",
    nameKo: "릴리프 밸브",
    nameEn: "Relief Valve",
    category: "Valves",
    description: "압력이 설정값 이상으로 올라가면 자동으로 압력을 배출하는 안전 밸브이다.",
    connectionTypes: ["Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/relief%20valve%20-gT37RvWoIKP0KkiePF81BYbRju34Uj.png"
  },
  {
    id: "control_valve_straight",
    nameKo: "직선형 컨트롤 밸브",
    nameEn: "Control Valve Straight",
    category: "Valves",
    description: "직선 배관 구간에서 신호에 따라 유량·압력·수위를 자동 제어하는 밸브이다.",
    connectionTypes: ["Flanged"],
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/control%20straight%20-6nmkXGHlcD9JCzfH7ok4GiX7UnfcQ3.png"
  },
  {
    id: "control_valve_angle",
    nameKo: "앵글형 컨트롤 밸브",
    nameEn: "Control Valve Angle",
    category: "Valves",
    description: "90도 방향 전환이 필요한 배관에서 자동 제어 기능을 수행하는 앵글형 컨트롤 밸브이다.",
    connectionTypes: ["Flanged"]
  },

  // === Miscellaneous ===
  {
    id: "branch_outlet_weldolet",
    nameKo: "웰도렛",
    nameEn: "Branch Outlet Weldolet",
    category: "Miscellaneous",
    description: "큰 배관에서 작은 배관을 용접으로 빼는 부품",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/branch%20outlet%20weldolet%20-UOKmA95L1odWiJ0i9BbjmyvetPvuth.png"
  },
  {
    id: "branch_outlet_nipolet",
    nameKo: "니포렛",
    nameEn: "Branch Outlet Nipolet",
    category: "Miscellaneous",
    description: "작은 분기관을 짧게 연결하는 부품",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/branch%20outlet%20nipolet%20-ORz3n5FdJeR8uaJvm9nmBKceR78ufY.png"
  },
  {
    id: "flanged_branch_outlet",
    nameKo: "플랜지 분기 아울렛",
    nameEn: "Flanged Branch Outlet (Flangolet)",
    category: "Miscellaneous",
    description: "플랜지 연결로 분기하는 아울렛",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flanged%20branch%20outlet%20flagolet%20-2siVQXcGoqX81iGy0ruDkLoBP0cGYW.png"
  },
  {
    id: "spade",
    nameKo: "스페이드",
    nameEn: "Spade",
    category: "Miscellaneous",
    description: "배관 사이에 넣어 흐름을 완전히 막는 판",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spade%20-DsrwI7AKJvOHPYEQrKQBfcFQJJctVq.png"
  },
  {
    id: "spectacle_blind",
    nameKo: "스펙터클 블라인드",
    nameEn: "Spectacle Blind",
    category: "Miscellaneous",
    description: "열린 쪽과 막힌 쪽이 같이 있는 안경 모양 블라인드",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spectacle%20blind%20-FBUw4UfSCULeuoZeW0XeNoCJS73pCQ.png"
  },
  {
    id: "hammer_blind",
    nameKo: "해머 블라인드",
    nameEn: "Hammer Blind",
    category: "Miscellaneous",
    description: "쉽게 열고 닫을 수 있는 블라인드 장치",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hammer%20blind%20-qrEVDl1CgxKIABlIigRcxovCcqLrQM.png"
  },
  {
    id: "spacer",
    nameKo: "스페이서",
    nameEn: "Spacer",
    category: "Miscellaneous",
    description: "배관 사이 간격을 맞추는 부품",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spacer%20-4q2M8TC9Pnd1vLDo8kv28KkkiMGelL.png"
  },
  {
    id: "restriction_orifice",
    nameKo: "제한 오리피스",
    nameEn: "Restriction Orifice",
    category: "Miscellaneous",
    description: "유량을 줄이거나 압력을 낮추는 구멍판",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/restriction%20orifice%20-8WXdK8eossmdZmvvNAUzkkrD9gOOnZ.png"
  },
  {
    id: "field_weld",
    nameKo: "현장 용접",
    nameEn: "Field Weld",
    category: "Miscellaneous",
    description: "현장에서 직접 하는 용접 표시"
  },
  {
    id: "butt_weld_symbol",
    nameKo: "맞대기 용접",
    nameEn: "Butt Weld",
    category: "Miscellaneous",
    description: "배관 끝을 맞대어 하는 용접 표시"
  },
  {
    id: "pipe_to_pipe",
    nameKo: "파이프 대 파이프",
    nameEn: "Pipe to Pipe",
    category: "Miscellaneous",
    description: "배관과 배관이 직접 연결된 표시",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pipe%20to%20pipe%20-J5S08WUKuAQftlmim9Cp0BtHul6SOY.png"
  },
  {
    id: "pipe_bend",
    nameKo: "파이프 벤드",
    nameEn: "Pipe Bend",
    category: "Miscellaneous",
    description: "배관이 특정 반경으로 휘어진 부분"
  },
  {
    id: "direction_of_hand_wheel",
    nameKo: "핸드휠 방향",
    nameEn: "Direction of Hand Wheel",
    category: "Miscellaneous",
    description: "손잡이를 어느 방향으로 조작하는지 표시",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hand%20wheel%20-pxOlXzLXqxSrxXWXdbMN3BcGu2i4VO.png"
  },
  {
    id: "y_type_strainer",
    nameKo: "Y형 스트레이너",
    nameEn: "Y-type Strainer",
    category: "Miscellaneous",
    description: "이물질을 걸러주는 Y자형 ���터",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ytype%20strainer%20-hGNfJdqc5iPzKHXKj4GI2kU2rQU8hb.png"
  },
  {
    id: "conical_strainer",
    nameKo: "원뿔형 스트레이너",
    nameEn: "Conical Strainer",
    category: "Miscellaneous",
    description: "이물질을 걸러주는 원뿔형 필터"
  },
  {
    id: "conical_strainer_built_in",
    nameKo: "내장형 원뿔 스트레이너",
    nameEn: "Conical Strainer Built-in",
    category: "Miscellaneous",
    description: "배관 안에 들어간 원뿔형 필터"
  },
  {
    id: "orifice_assembly",
    nameKo: "오리피스 어셈블리",
    nameEn: "Orifice Assembly",
    category: "Miscellaneous",
    description: "유량 측정을 위한 오리피스 장치",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orifice%20assembly%20-rgz2puvqGkV5dK09KGlwVgZiv5GFAd.png"
  },
  {
    id: "meter_run",
    nameKo: "미터 런",
    nameEn: "Meter Run",
    category: "Miscellaneous",
    description: "유량 측정을 위해 만든 직선 배관 구간",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/meter%20run%20-lhof5N7l2MeFhAp99SlRDySLyPqmCp.png"
  }
]

// 심볼 이름으로 설명 찾기 (유사도 기반)
export function findSymbolDescription(symbolName: string): SymbolDescription | null {
  const normalizedName = symbolName.toLowerCase().replace(/[^a-z0-9가-힣]/g, '')
  
  // 정확한 매칭 먼저 시도
  for (const desc of symbolDescriptions) {
    const normalizedEn = desc.nameEn.toLowerCase().replace(/[^a-z0-9]/g, '')
    const normalizedKo = desc.nameKo.replace(/[^가-힣]/g, '')
    
    if (normalizedName.includes(normalizedEn) || normalizedName.includes(normalizedKo)) {
      return desc
    }
    if (normalizedEn.includes(normalizedName) || normalizedKo.includes(normalizedName)) {
      return desc
    }
  }
  
  // 키워드 기반 매칭
  const keywords: Record<string, string[]> = {
    'elbow_90': ['elbow', '90', '엘보', '90도'],
    'elbow_45': ['elbow', '45', '엘보', '45도'],
    'tee_equal': ['tee', 'equal', '티', '이퀄'],
    'tee_reducing': ['tee', 'reducing', '티', '레듀싱'],
    'cap': ['cap', '캡', '막음'],
    'reducer_concentric': ['reducer', 'concentric', '레듀서', '동심'],
    'reducer_eccentric': ['reducer', 'eccentric', '레듀서', '편심'],
    'welding_neck_flange': ['welding', 'neck', 'flange', '웰딩넥', '플랜지'],
    'socket_weld_flange': ['socket', 'weld', 'flange', '소켓', '플랜지'],
    'threaded_flange': ['threaded', 'flange', '나사', '플랜지'],
    'slip_on_flange': ['slip', 'on', 'flange', '슬립온', '플랜지'],
    'lap_joint_flange': ['lap', 'joint', 'flange', '랩조인트', '플랜지'],
    'blind_flange': ['blind', 'flange', '블라인드', '플랜지'],
    'gate_valve': ['gate', 'valve', '게이트', '밸브'],
    'globe_valve': ['globe', 'valve', '글로��', '밸브'],
    'ball_valve': ['ball', 'valve', '볼', '밸브'],
    'plug_valve': ['plug', 'valve', '플러그', '밸브'],
    'butterfly_valve': ['butterfly', 'valve', '버터플라이', '밸브'],
    'needle_valve': ['needle', 'valve', '니들', '밸브'],
    'diaphragm_valve': ['diaphragm', 'valve', '다이어프램', '밸브'],
    'y_type_valve': ['y-type', 'y type', 'valve', 'y형', '밸브'],
    'three_way_valve': ['three', 'way', '3way', 'valve', '3방향', '밸브'],
    'check_valve': ['check', 'valve', '체크', '밸브'],
    'bottom_valve': ['bottom', 'valve', '바텀', '밸브'],
    'relief_valve': ['relief', 'valve', '릴리프', '밸브'],
    'control_valve_straight': ['control', 'straight', 'valve', '컨트롤', '직선'],
    'control_valve_angle': ['control', 'angle', 'valve', '컨트롤', '앵글'],
    'branch_outlet_weldolet': ['weldolet', '웰도렛', 'branch', 'outlet'],
    'branch_outlet_nipolet': ['nipolet', '니포렛'],
    'flanged_branch_outlet': ['flangolet', '플랜고렛', 'flanged', 'branch'],
    'spade': ['spade', '스페이드'],
    'spectacle_blind': ['spectacle', 'blind', '스펙터클'],
    'hammer_blind': ['hammer', 'blind', '해머'],
    'spacer': ['spacer', '스페이서'],
    'restriction_orifice': ['restriction', 'orifice', '제한', '오리피스', 'ro'],
    'field_weld': ['field', 'weld', '현장', '용접', 'fw'],
    'butt_weld_symbol': ['butt', 'weld', '맞대기'],
    'pipe_to_pipe': ['pipe to pipe', '파이프'],
    'pipe_bend': ['bend', '벤드', '휘어진'],
    'direction_of_hand_wheel': ['hand', 'wheel', '핸드휠', '방향'],
    'y_type_strainer': ['y', 'strainer', 'y형', '스트레이너'],
    'conical_strainer': ['conical', 'strainer', '원뿔', '스트레이너'],
    'conical_strainer_built_in': ['conical', 'built', 'in', '내장', '스트레이너'],
    'orifice_assembly': ['orifice', 'assembly', '오리피스', '어셈블리'],
    'meter_run': ['meter', 'run', '미터', '런']
  }
  
  for (const [id, words] of Object.entries(keywords)) {
    const matchCount = words.filter(word => 
      normalizedName.includes(word.toLowerCase())
    ).length
    
    if (matchCount >= 2) {
      return symbolDescriptions.find(d => d.id === id) || null
    }
  }
  
  return null
}

// ID로 직접 찾기
export function getSymbolDescriptionById(id: string): SymbolDescription | null {
  return symbolDescriptions.find(d => d.id === id) || null
}
