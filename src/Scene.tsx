import {getVideoMetadata, VideoMetadata} from '@remotion/media-utils';
import {ThreeCanvas, useVideoTexture} from '@remotion/three';
import React, {useEffect, useRef, useState} from 'react';
import {AbsoluteFill, useVideoConfig, Video} from 'remotion';
import {Phone} from './Phone';
import {
	EffectComposer,
	DepthOfField,
	Bloom,
	Noise,
	Vignette,
	HueSaturation
} from '@react-three/postprocessing';

const container: React.CSSProperties = {
	backgroundColor: 'white'
};

const videoStyle: React.CSSProperties = {
	position: 'absolute',
	opacity: 0
};

export const Scene: React.FC<{
	videoSrc: string;
	baseScale: number;
}> = ({baseScale, videoSrc}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const {width, height} = useVideoConfig();
	const [videoData, setVideoData] = useState<VideoMetadata | null>(null);

	useEffect(() => {
		getVideoMetadata(videoSrc)
			.then((data) => setVideoData(data))
			.catch((err) => console.log(err));
	}, [videoSrc]);

	const texture = useVideoTexture(videoRef);
	return (
		<AbsoluteFill style={container}>
			<Video ref={videoRef} src={videoSrc} style={videoStyle} />
			{videoData ? (
				<ThreeCanvas
					width={width} height={height}
					gl={{
											 alpha: false,
											 antialias: false,
											 stencil: false,
											 depth: false
					}}
				>
					<ambientLight intensity={1.5} color={0xffffff} />
					<pointLight position={[10, 10, 0]} />
					<Phone
						baseScale={baseScale}
						videoTexture={texture}
						aspectRatio={videoData.aspectRatio}
					/>
					<EffectComposer disableNormalPass>
						<HueSaturation saturation={0.2} />
						<DepthOfField
							focusDistance={10}
							focalLength={0}
							bokehScale={20}
							height={1000}
						/>
						<Bloom
							luminanceThreshold={0}
							luminanceSmoothing={1.3}
							height={300}
							opacity={1}
						/>
						<Noise opacity={0.025} />
						<Vignette eskil={false} offset={0.1} darkness={1.1} />
					</EffectComposer>
				</ThreeCanvas>
			) : null}
		</AbsoluteFill>
	);
};
