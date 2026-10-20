import { INodeTypeBaseDescription, IVersionedNodeType, VersionedNodeType } from 'n8n-workflow';
import { AimfoxV1 } from './v1/AimfoxV1.node';
import { AimfoxV2 } from './v2/AimfoxV2.node';

export class Aimfox extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Aimfox',
			name: 'aimfox',
			icon: 'file:aimfox.svg',
			group: ['transform'],
			description: 'Interact with Aimfox application',
			defaultVersion: 2,
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new AimfoxV1(baseDescription),
			2: new AimfoxV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
