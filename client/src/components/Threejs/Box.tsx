import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

//ThreeElements["mesh"]는 @react-three/fiber 라이브러리에서 가져오는 타입으로, Three.js(3D 라이브러리)에 근거한 멤버 변수를 가지고 있습니다
const Box = (props: ThreeElements["mesh"]) => {
  //useState and useRef hooks are used to manage the component's state and manage a reference to the box mesh
  //useFrame hook is used to rotate the mesh on each frame update along the X-axis.
  //This hook allows you to execute code on every rendered frame
  //state과 clock delta를 받게 된다.
  //mesh의 상태를 update를 한다? =>frame render전에 callback function activates!
  //component가 unmounts되면 render-loop에서 unsubscrieds된다.
  //useFrame 내부에 setStates를 하면 안 된다.
  //왜 useFrame만 사용하면 오류가 발생하나? => 무조건 Canvas를 선언한 컴포넌트의 하위 컴포넌트에 선언을 해야 한다.
  //component 분리를 해야 한다.

  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  useFrame((state, delta) => (meshRef.current.rotation.y += delta));

  return (
    // Translates to <mesh scale={[1, 1, 1]} /> => mesh scale={1}과 동일하다 3개의 축에 동일한 scale을 적용하는 것!
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default Box;
