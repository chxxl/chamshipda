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
    description: "배관과 부품의 끝단을 서로 맞대고 용접하는 방식이다. 강도가 높고 누설 위험이 적어 고압, 고온 배관에 많이 사용된다. 도면에서는 배관과 부품이 직접 이어지고, 용접 표시가 함께 나타나는 경우가 많다."
  },
  {
    id: "socket_weld_connection",
    nameKo: "소켓 웰드",
    nameEn: "Socket Weld",
    category: "연결 방식",
    description: "배관을 부품의 소켓 안으로 끼운 뒤 바깥쪽을 용접하는 방식이다. 주로 작은 구경의 고압 배관에 사용된다. 배관이 부품 안으로 들어가는 구조이므로 Butt Weld보다 연결부가 두껍게 보일 수 있다."
  },
  {
    id: "threaded_connection",
    nameKo: "나사 연결",
    nameEn: "Threaded",
    category: "연결 방식",
    description: "배관과 부품에 나사산을 만들어 돌려 끼우는 방식이다. 용접이 필요 없어 설치와 분해가 쉽지만, 고압이나 진동이 큰 곳에서는 주의가 필요하다. 주로 소구경 배관이나 계장 라인에서 사용된다."
  },
  {
    id: "flanged_connection",
    nameKo: "플랜지 연결",
    nameEn: "Flanged",
    category: "연결 방식",
    description: "배관 끝에 플랜지를 붙이고 볼트와 너트로 체결하는 방식이다. 분해와 정비가 쉬워 밸브, 펌프, 장비 연결부에 많이 사용된다. 도면에서는 두 개의 플랜지가 마주 보고 있는 형태로 표시된다."
  },

  // === Fittings ===
  {
    id: "elbow_90",
    nameKo: "90도 엘보",
    nameEn: "Elbow 90°",
    category: "Fittings",
    description: "배관의 방향을 90도 꺾을 때 사용하는 부품이다. 가장 흔히 사용되는 방향 전환 피팅이며, 배관이 직각으로 꺾이는 부분에 표시된다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "/symbols/elbow_90.png"
  },
  {
    id: "elbow_45",
    nameKo: "45도 엘보",
    nameEn: "Elbow 45°",
    category: "Fittings",
    description: "배관의 방향을 45도 바꿀 때 사용하는 부품이다. 90도 엘보보다 방향 변화가 완만하여 압력 손실을 줄이고 싶을 때 사용된다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "/symbols/elbow_45.png"
  },
  {
    id: "tee_equal",
    nameKo: "이퀄 티",
    nameEn: "Tee Equal",
    category: "Fittings",
    description: "T자 형태로 배관을 세 방향으로 나누는 부품이다. 세 방향의 배관 크기가 모두 같은 경우 Equal Tee라고 한다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "/symbols/tee_equal.png"
  },
  {
    id: "tee_reducing",
    nameKo: "레듀싱 티",
    nameEn: "Tee Reducing",
    category: "Fittings",
    description: "T자 형태로 배관을 분기하지만, 분기되는 배관의 크기가 주 배관보다 작은 경우 사용된다. 주 배관에서 작은 배관으로 유체를 나눠 보낼 때 사용된다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "/symbols/tee_reducing.png"
  },
  {
    id: "cap",
    nameKo: "캡",
    nameEn: "Cap",
    category: "Fittings",
    description: "배관의 끝을 막는 부품이다. 더 이상 배관이 이어지지 않는 끝단이나, 추후 확장을 위해 막아두는 부분에 사용된다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded"],
    imageUrl: "/symbols/cap.png"
  },
  {
    id: "reducer_concentric",
    nameKo: "동심 레듀서",
    nameEn: "Reducer Concentric",
    category: "Fittings",
    description: "큰 배관과 작은 배관을 연결할 때 사용하는 부품이다. 중심선이 일치하는 형태이므로 원형 단면의 중심이 같은 선상에 있다. 수직 배관이나 펌프 토출 측 등에 많이 사용된다.",
    imageUrl: "/symbols/reducer_concentric.png"
  },
  {
    id: "reducer_eccentric",
    nameKo: "편심 레듀서",
    nameEn: "Reducer Eccentric",
    category: "Fittings",
    description: "큰 배관과 작은 배관을 연결하지만 중심선이 어긋난 형태이다. 배관의 윗면 또는 아랫면을 평평하게 맞출 수 있어 공기 고임이나 액체 고임을 방지할 때 사용된다. 특히 펌프 흡입 배관에서 자주 사용된다.",
    imageUrl: "/symbols/reducer_eccentric.png"
  },

  // === Flanges ===
  {
    id: "welding_neck_flange",
    nameKo: "웰딩넥 플랜지",
    nameEn: "Welding Neck Flange",
    category: "Flanges",
    description: "목이 길게 돌출된 형태의 플랜지이다. 배관과 맞대기 용접으로 연결되며 강도가 높다. 고압, 고온, 중요 배관에 많이 사용된다.",
    imageUrl: "/symbols/welding_neck.png"
  },
  {
    id: "socket_weld_flange",
    nameKo: "소켓 웰드 플랜지",
    nameEn: "Socket Weld Flange",
    category: "Flanges",
    description: "배관을 플랜지의 소켓 안에 끼운 뒤 용접하는 방식이다. 주로 작은 구경의 고압 배관에 사용된다.",
    imageUrl: "/symbols/flanges_socket_weld.png"
  },
  {
    id: "threaded_flange",
    nameKo: "나사형 플랜지",
    nameEn: "Threaded Flange",
    category: "Flanges",
    description: "나사산을 이용해 배관과 연결하는 플랜지이다. 용접이 필요 없어 설치가 쉽지만, 고온·고압 배관에는 제한적으로 사용된다.",
    imageUrl: "/symbols/flanges_threaded.png"
  },
  {
    id: "slip_on_flange",
    nameKo: "슬립온 플랜지",
    nameEn: "Slip-on Flange",
    category: "Flanges",
    description: "배관을 플랜지 안쪽으로 끼운 뒤 안쪽과 바깥쪽을 용접하는 방식이다. 제작과 설치가 비교적 간단하여 일반 배관에 많이 사용된다.",
    imageUrl: "/symbols/flanges_slipon.png"
  },
  {
    id: "lap_joint_flange",
    nameKo: "랩 조인트 플랜지",
    nameEn: "Lap-joint Flange",
    category: "Flanges",
    description: "스텁엔드와 함께 사용되는 플랜지이다. 플랜지 자체가 자유롭게 회전할 수 있어 볼트 구멍 맞춤이 쉽다. 자주 분해하거나 정렬이 필요한 배관에 사용된다.",
    imageUrl: "/symbols/flanges_lapjoint.png"
  },
  {
    id: "blind_flange",
    nameKo: "블라인드 플랜지",
    nameEn: "Blind Flange",
    category: "Flanges",
    description: "배관이나 장비의 끝을 막는 플랜지이다. 점검구, 예비 연결부, 배관 말단을 막을 때 사용된다.",
    imageUrl: "/symbols/flanges_blind.png"
  },

  // === Valves ===
  {
    id: "gate_valve",
    nameKo: "게이트 밸브",
    nameEn: "Gate Valve",
    category: "Valves",
    description: "내부의 판이 위아래로 움직이며 유체 흐름을 열고 닫는 밸브이다. 완전 개방 또는 완전 차단용으로 사용되며, 유량 조절용으로는 적합하지 않다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded", "Flanged"],
    imageUrl: "/symbols/gate_valve.png"
  },
  {
    id: "globe_valve",
    nameKo: "글로브 밸브",
    nameEn: "Globe Valve",
    category: "Valves",
    description: "유체가 밸브 내부에서 방향을 바꾸며 흐르는 구조이다. 유량 조절 성능이 좋아 조절용 밸브로 많이 사용되지만, 압력 손실은 비교적 크다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded", "Flanged"],
    imageUrl: "/symbols/globe_valve.png"
  },
  {
    id: "ball_valve",
    nameKo: "볼 밸브",
    nameEn: "Ball Valve",
    category: "Valves",
    description: "구멍이 뚫린 공 모양의 회전체를 돌려 유체를 열고 닫는 밸브이다. 90도 회전만으로 빠르게 개폐할 수 있어 조작이 간단하다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Threaded", "Flanged"],
    imageUrl: "/symbols/ball_valve.png"
  },
  {
    id: "plug_valve",
    nameKo: "플러그 밸브",
    nameEn: "Plug Valve",
    category: "Valves",
    description: "플러그 형태의 회전체를 돌려 유체 흐름을 제어하는 밸브이다. Ball Valve와 비슷하게 빠른 개폐가 가능하다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Flanged"],
    imageUrl: "/symbols/plug_valve.png"
  },
  {
    id: "butterfly_valve",
    nameKo: "버터플라이 밸브",
    nameEn: "Butterfly Valve",
    category: "Valves",
    description: "원판 형태의 디스크를 회전시켜 유체를 제어하는 밸브이다. 구조가 간단하고 가벼워 대구경 배관에 많이 사용된다.",
    connectionTypes: ["Butt Weld", "Flanged"],
    imageUrl: "/symbols/butterfly_valve.png"
  },
  {
    id: "needle_valve",
    nameKo: "니들 밸브",
    nameEn: "Needle Valve",
    category: "Valves",
    description: "바늘 모양의 스템을 이용해 아주 작은 유량을 정밀하게 조절하는 밸브이다. 계장 배관이나 소유량 조절 라인에 사용된다.",
    connectionTypes: ["Butt Weld", "Flanged"],
    imageUrl: "/symbols/needle_valve.png"
  },
  {
    id: "diaphragm_valve",
    nameKo: "다이어프램 밸브",
    nameEn: "Diaphragm Valve",
    category: "Valves",
    description: "고무나 특수 재질의 막을 눌러 유체를 차단하는 밸브이다. 부식성 유체나 오염을 피해야 하는 배관에 사용된다.",
    connectionTypes: ["Socket Weld", "Flanged"],
    imageUrl: "/symbols/diaphragm_valve.png"
  },
  {
    id: "y_type_valve",
    nameKo: "Y형 밸브",
    nameEn: "Y-type Valve",
    category: "Valves",
    description: "밸브 몸체가 Y자 형태로 기울어진 구조이다. 일반 Globe Valve보다 유체 흐름이 부드러워 압력 손실을 줄일 수 있다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Flanged"],
    imageUrl: "/symbols/ytype_valve.png"
  },
  {
    id: "three_way_valve",
    nameKo: "3방향 밸브",
    nameEn: "Three-way Valve",
    category: "Valves",
    description: "세 방향의 포트를 가진 밸브이다. 유체를 두 방향 중 하나로 보내거나, 두 흐름을 하나로 합칠 때 사용된다.",
    connectionTypes: ["Butt Weld", "Socket Weld", "Flanged"],
    imageUrl: "/symbols/three_way_valve.png"
  },
  {
    id: "check_valve",
    nameKo: "체크 밸브",
    nameEn: "Check Valve",
    category: "Valves",
    description: "유체가 한 방향으로만 흐르게 하고 역류를 방지하는 밸브이다. 펌프 토출 측이나 역류 방지가 필요한 배관에 사용된다.",
    connectionTypes: ["Butt Weld", "Flanged"],
    imageUrl: "/symbols/check_valve.png"
  },
  {
    id: "bottom_valve",
    nameKo: "바텀 밸브",
    nameEn: "Bottom Valve",
    category: "Valves",
    description: "탱크나 배관의 하부에 설치되어 배출이나 차단에 사용되는 밸브이다. 주로 탱크 바닥 배출 라인에서 사용된다.",
    connectionTypes: ["Threaded"],
    imageUrl: "/symbols/bottom_valve.png"
  },
  {
    id: "relief_valve",
    nameKo: "릴리프 밸브",
    nameEn: "Relief Valve",
    category: "Valves",
    description: "배관이나 장비 내부 압력이 설정값 이상으로 올라가면 자동으로 열려 압력을 낮추는 안전 밸브이다. 과압으로 인한 장비 손상을 방지한다.",
    connectionTypes: ["Flanged"],
    imageUrl: "/symbols/relief_valve.png"
  },
  {
    id: "control_valve_straight",
    nameKo: "직선형 컨트롤 밸브",
    nameEn: "Control Valve Straight",
    category: "Valves",
    description: "직선형 배관에 설치되는 제어 밸브이다. 유량, 압력, 온도 등을 자동으로 조절하는 데 사용된다.",
    connectionTypes: ["Flanged"],
    imageUrl: "/symbols/control_straight.png"
  },
  {
    id: "control_valve_angle",
    nameKo: "앵글형 컨트롤 밸브",
    nameEn: "Control Valve Angle",
    category: "Valves",
    description: "유체 흐름이 밸브 내부에서 90도 방향으로 바뀌는 제어 밸브이다. 배관 방향 전환과 제어 기능을 동시에 수행할 수 있다.",
    connectionTypes: ["Flanged"]
  },

  // === Miscellaneous ===
  {
    id: "branch_outlet_weldolet",
    nameKo: "웰도렛",
    nameEn: "Branch Outlet Weldolet",
    category: "Miscellaneous",
    description: "주 배관에서 작은 배관을 분기할 때 사용하는 보강 분기관 부품이다. 배관에 직접 구멍을 내고 용접하여 분기 배관을 연결한다.",
    imageUrl: "/symbols/branch_outlet_weldolet.png"
  },
  {
    id: "branch_outlet_nipolet",
    nameKo: "니포렛",
    nameEn: "Branch Outlet Nipolet",
    category: "Miscellaneous",
    description: "니플 형태가 결합된 분기관 부품이다. 주 배관에서 소구경 배관이나 계장 라인을 뽑을 때 사용된다.",
    imageUrl: "/symbols/branch_outlet_nipolet.png"
  },
  {
    id: "flanged_branch_outlet",
    nameKo: "플랜지 분기 아울렛",
    nameEn: "Flanged Branch Outlet (Flangolet)",
    category: "Miscellaneous",
    description: "플랜지 연결로 분기하는 아울렛",
    imageUrl: "/symbols/flanged_branch_outlet.png"
  },
  {
    id: "spade",
    nameKo: "스페이드",
    nameEn: "Spade",
    category: "Miscellaneous",
    description: "배관 사이에 삽입하여 유체 흐름을 완전히 막는 판 형태의 차단 부품이다. 정비나 격리가 필요한 경우 사용된다.",
    imageUrl: "/symbols/spade.png"
  },
  {
    id: "spectacle_blind",
    nameKo: "스펙터클 블라인드",
    nameEn: "Spectacle Blind",
    category: "Miscellaneous",
    description: "막힌 판과 뚫린 판이 안경 모양으로 연결된 차단 장치이다. 배관을 열어둘 때와 막을 때를 물리적으로 전환할 수 있다.",
    imageUrl: "/symbols/spectacle_blind.png"
  },
  {
    id: "hammer_blind",
    nameKo: "해머 블라인드",
    nameEn: "Hammer Blind",
    category: "Miscellaneous",
    description: "빠르게 개폐할 수 있는 블라인드 장치이다. 정비나 배관 격리가 자주 필요한 곳에 사용된다.",
    imageUrl: "/symbols/hammer_blind.png"
  },
  {
    id: "spacer",
    nameKo: "스페이서",
    nameEn: "Spacer",
    category: "Miscellaneous",
    description: "배관 사이에 삽입하여 간격을 맞추거나, Spectacle Blind와 함께 사용되어 유체 흐름을 열어두는 역할을 한다.",
    imageUrl: "/symbols/spacer.png"
  },
  {
    id: "restriction_orifice",
    nameKo: "제한 오리피스",
    nameEn: "Restriction Orifice",
    category: "Miscellaneous",
    description: "배관 내부에 구멍이 뚫린 판을 넣어 유량을 제한하거나 압력을 낮추는 장치이다. 일정한 압력 강하가 필요할 때 사용된다.",
    imageUrl: "/symbols/restriction_orifice.png"
  },
  {
    id: "field_weld",
    nameKo: "현장 용접",
    nameEn: "Field Weld",
    category: "Miscellaneous",
    description: "현장에서 직접 수행하는 용접을 의미한다. 공장에서 미리 제작하지 않고 설치 현장에서 배관을 맞춘 뒤 용접하는 부분이다."
  },
  {
    id: "butt_weld_symbol",
    nameKo: "맞대기 용접",
    nameEn: "Butt Weld",
    category: "Miscellaneous",
    description: "배관과 배관 또는 배관과 부품을 맞대어 용접하는 연결 방식이다. 도면에서는 용접 접합부를 나타내는 중요한 표시이다."
  },
  {
    id: "pipe_to_pipe",
    nameKo: "파이프 대 파이프",
    nameEn: "Pipe to Pipe",
    category: "Miscellaneous",
    description: "배관과 배관이 직접 연결되는 부분을 의미한다. 중간에 밸브나 장비가 없는 단순 배관 연결부이다.",
    imageUrl: "/symbols/pipe_to_pipe.png"
  },
  {
    id: "pipe_bend",
    nameKo: "파이프 벤드",
    nameEn: "Pipe Bend",
    category: "Miscellaneous",
    description: "배관 자체를 곡선 형태로 굽힌 부분이다. Elbow와 달리 별도의 피팅을 사용하는 것이 아니라 배관을 직접 굽혀 방향을 바꾼다."
  },
  {
    id: "direction_of_hand_wheel",
    nameKo: "핸드휠 방향",
    nameEn: "Direction of Hand Wheel",
    category: "Miscellaneous",
    description: "밸브 핸들의 방향을 표시한 것이다. 작업자가 어느 방향에서 밸브를 조작해야 하는지 확인할 수 있다.",
    imageUrl: "/symbols/hand_wheel.png"
  },
  {
    id: "y_type_strainer",
    nameKo: "Y형 스트레이너",
    nameEn: "Y-type Strainer",
    category: "Miscellaneous",
    description: "Y자 형태의 필터 장치이다. 배관 내부의 이물질을 걸러 펌프, 밸브, 계기 등을 보호한다.",
    imageUrl: "/symbols/ytype_strainer.png"
  },
  {
    id: "conical_strainer",
    nameKo: "원뿔형 스트레이너",
    nameEn: "Conical Strainer",
    category: "Miscellaneous",
    description: "원뿔 형태의 임시 또는 영구 스트레이너이다. 배관 내부 이물질을 걸러내며, 시운전이나 장비 보호용으로 사용된다."
  },
  {
    id: "conical_strainer_built_in",
    nameKo: "내장형 원뿔 스트레이너",
    nameEn: "Conical Strainer Built-in",
    category: "Miscellaneous",
    description: "원뿔형 스트레이너가 배관이나 장비 내부에 내장된 형태이다. 외부에서 별도 장치처럼 보이지 않을 수 있으므로 도면 표시를 확인해야 한다."
  },
  {
    id: "orifice_assembly",
    nameKo: "오리피스 어셈블리",
    nameEn: "Orifice Assembly",
    category: "Miscellaneous",
    description: "유량 측정을 위해 배관에 설치되는 장치이다. Taps는 압력을 측정하는 구멍 위치를 의미하며, 오리피스 전후의 압력 차이를 이용해 유량을 계산한다.",
    imageUrl: "/symbols/orifice_assembly.png"
  },
  {
    id: "meter_run",
    nameKo: "미터 런",
    nameEn: "Meter Run",
    category: "Miscellaneous",
    description: "정확한 유량 측정을 위해 유량계 앞뒤에 확보하는 직관부이다. 유동이 안정된 상태에서 측정되도록 하기 위해 필요하다.",
    imageUrl: "/symbols/meter_run.png"
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
