import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';
import { aimfoxNodeProperties } from './properties';

export class Aimfox implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aimfox',
		name: 'aimfox',
		icon: 'file:aimfox.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Aimfox application',
		defaults: {
			name: 'Aimfox',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'aimfoxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.aimfox.com/api/v2',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: aimfoxNodeProperties,
	};
}
