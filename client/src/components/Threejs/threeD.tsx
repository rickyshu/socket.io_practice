import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Box from "./Box";
function threeD() {
  return (
    <div>
      <Canvas className="border-red-100 bg-slate-300">
        {/* pointLight 단순히 물체에만 적용이 되고 배경에는 상관이 없는듯(아마 추가 설정으로 할 수 있을 것이다.) */}
        {/* light를 두 개로 하니까 조금 더 밝아 진다. */}
        <pointLight position={[1, 1, 1]} />
        <ambientLight />
        {/* 아래 Box mesh는 보통 따로 component로 빼는듯 하다.*/}
        {/* 좌표값을 다르게 해야 다른 위치로 보이는 데 공식문서는 왜 그럼? */}
        <Box position={[-1.2, 1, 1]} />
        <Box position={[-1.2, 0, 3]} />
        {/* x,y,z 축을 표시해준다. 조금 더 쉽게 작업할 수 있도록 해준다 */}
        {/* args는 one units으로서 axes의 길이를 지정할 수 있다. */}
        <OrbitControls />
        <gridHelper />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
}

export default threeD;
