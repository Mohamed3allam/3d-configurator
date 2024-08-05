import React from "react";

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[0, 1, 0]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
        </>
    );
};

export default Lights;
