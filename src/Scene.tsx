import {getVideoMetadata, VideoMetadata} from '@remotion/media-utils';
import {ThreeCanvas} from '@remotion/three';
import React, {useEffect, useRef, useState} from 'react';
import {AbsoluteFill, useVideoConfig, Video} from 'remotion';
import {Phone} from './Phone';

const container: React.CSSProperties = {
	backgroundColor: 'white'
};

const videoStyle: React.CSSProperties = {
	position: 'absolute',
	opacity: 0
};

export const Scene: React.FC<{
	videoSrc: string;
}> = ({videoSrc}) => {
	return (
		<ThreeCanvas
			width={2000} height={2000}
			gl={{
						alpha: false,
						antialias: false,
						stencil: false,
						depth: false
			}}
		>
			<ambientLight intensity={1.5} color={0xffffff} />
			<pointLight position={[10, 10, 0]} />
			<Phone />
		</ThreeCanvas>
	);
};
