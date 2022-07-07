import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useFrame } from "@react-three/fiber";
import { proxy, useSnapshot } from "valtio";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { BsChatRightDotsFill } from "react-icons/bs";
import ChatBox from "./components/ChatBox/ChatBox";

const state = proxy({
  current: null,
  items: {
    shirtColor: "Brown",
    Logo: "/",
  },
});

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/panda.gltf");
  const snap = useSnapshot(state);
  const { playAnimation } = props;

  useEffect(() => {
    // console.log(
    //   "materials: ",
    //   materials,
    //   "animations: ",
    //   animations,
    //   "nodes: ",
    //   nodes
    // );
    if (materials) {
      // materials["Logo"].map = new THREE.TextureLoader().load("USKTLogo.png");
    }
  }, [materials]);

  const { actions } = useAnimations(animations, group);
  // animate the model with the animations
  useEffect(() => {
    const action = actions[Object.keys(actions)[0]];
    if (playAnimation) {
      action.play();
    }
  }, [actions, playAnimation]);

  // const [hovered, set] = useState(null);
  // useEffect(() => {
  // const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
  // const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
  //   if (hovered) {
  //     document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
  //       cursor
  //     )}'), auto`;
  //     return () =>
  //       (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
  //         auto
  //       )}'), auto`);
  //   }
  // }, [hovered]);
  // const [stateColor, setStateColor] = useState(state);
  return (
    <group
      ref={group}
      // change the texture of material named "Logo"
      // onClick={() => {
      //   const material = materials.find((m) => m.name === "Logo");
      //   material.color = new THREE.Color(stateColor);
      //   setStateColor(stateColor);
      // }}

      {...props}
      dispose={null}
      onPointerDown={(e) => {
        e.stopPropagation();
        state.current = e.object.material.name;
        if (e.object.material.name === "Logo") {
          // change the logo
          // e.object.material.map = new THREE.TextureLoader().load("logo192.png");
        }
      }}
      onPointerMissed={(e) => {
        state.current = null;
      }}
    >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="body">
            <skinnedMesh
              receiveShadow
              castShadow
              name="Mesh"
              geometry={nodes.Mesh.geometry}
              material={materials.pasted__Body_n_Gloves}
              material-color={snap.items.shirtColor}
              skeleton={nodes.Mesh.skeleton}
            />
            <skinnedMesh
              name="Mesh_1"
              receiveShadow
              castShadow
              geometry={nodes.Mesh_1.geometry}
              material={materials.pasted__Shoes}
              skeleton={nodes.Mesh_1.skeleton}
            />
          </group>
          <group name="panda_faceBottom_2">
            <skinnedMesh
              receiveShadow
              castShadow
              name="Mesh002"
              geometry={nodes.Mesh002.geometry}
              material={materials["panda_face:lambert2"]}
              skeleton={nodes.Mesh002.skeleton}
            />
            <skinnedMesh
              receiveShadow
              castShadow
              name="Mesh002_1"
              geometry={nodes.Mesh002_1.geometry}
              material={materials["panda_face:phong1"]}
              skeleton={nodes.Mesh002_1.skeleton}
            />
          </group>
          <group name="panda_facepolySurface16">
            <skinnedMesh
              receiveShadow
              castShadow
              name="Mesh003"
              geometry={nodes.Mesh003.geometry}
              material={materials["panda_face:phong1"]}
              skeleton={nodes.Mesh003.skeleton}
            />
            <skinnedMesh
              receiveShadow
              castShadow
              name="Mesh003_1"
              geometry={nodes.Mesh003_1.geometry}
              material={materials["panda_face:lambert2"]}
              skeleton={nodes.Mesh003_1.skeleton}
            />
          </group>
          <skinnedMesh
            receiveShadow
            castShadow
            name="panda_facepolySurface337"
            geometry={nodes.panda_facepolySurface337.geometry}
            material={materials["panda_face:Face"]}
            skeleton={nodes.panda_facepolySurface337.skeleton}
          />
          <skinnedMesh
            receiveShadow
            castShadow
            name="panda_facepolySurface338"
            geometry={nodes.panda_facepolySurface338.geometry}
            material={materials["panda_face:Face"]}
            skeleton={nodes.panda_facepolySurface338.skeleton}
          />
          <group name="panda_facepolySurface339">
            <skinnedMesh
              receiveShadow
              castShadow
              name="Mesh005"
              geometry={nodes.Mesh005.geometry}
              material={materials["panda_face:Face"]}
              skeleton={nodes.Mesh005.skeleton}
            />
            <skinnedMesh
              receiveShadow
              castShadow
              name="Mesh005_1"
              geometry={nodes.Mesh005_1.geometry}
              material={materials.blinn10}
              skeleton={nodes.Mesh005_1.skeleton}
            />
          </group>
          <skinnedMesh
            receiveShadow
            castShadow
            name="panda_facepolySurface340"
            geometry={nodes.panda_facepolySurface340.geometry}
            material={materials["panda_face:Face"]}
            skeleton={nodes.panda_facepolySurface340.skeleton}
          />
          <skinnedMesh
            receiveShadow
            castShadow
            name="panda_facetongue"
            geometry={nodes.panda_facetongue.geometry}
            material={materials["panda_face:blinn10"]}
            skeleton={nodes.panda_facetongue.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

function ColorPicker() {
  const snap = useSnapshot(state);
  // const [stateColor, setStateColor] = useState(state);
  return (
    <div>
      <HexColorPicker
        color={snap.items[snap.current]}
        onChange={(color) => (state.items[Object.keys(state.items)[0]] = color)}
      />
      <h1>{snap.current}</h1>
    </div>
  );
}
useGLTF.preload("/models/panda.gltf");
export default function App() {
  const [playAnimation, setPlayAnimation] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* make a chatbox */}
      {showChat && (
        <ChatBox
          closeChat={() => setShowChat(false)}
          setPlayAnimation={() => setPlayAnimation(!playAnimation)}
        />
      )}{" "}
      {!showChat && (
        <BsChatRightDotsFill
          style={{
            position: "absolute",
            right: "300px",
            bottom: "100px",
            fontSize: "50px",
            cursor: "pointer",
          }}
          onClick={() => setShowChat(true)}
        />
      )}
      <Canvas
        style={{
          width: "300px",
          height: "300px",
          background: "transparent",
          position: "absolute",
          bottom: "-90px",
          right: "30px",
        }}
      >
        {/* <gridHelper argrs={[100, 100]} /> */}
        <hemisphereLight intensity={0.5} />
        <ambientLight intensity={1} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />

        <Suspense fallback={null}>
          <Model playAnimation={playAnimation} />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
      {/* <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <ColorPicker />
      </div> */}
    </div>
  );
}
