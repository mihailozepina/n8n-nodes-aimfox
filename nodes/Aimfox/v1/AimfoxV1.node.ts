import {
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { aimfoxNodeProperties } from './properties';
import { AIMFOX_DEFAULT_BASE_URL } from '../../../credentials/AimfoxApi.credentials';

// The original node, on public API v2. Kept as-is so existing workflows keep
// working; new nodes get v2 (public API v4).
export class AimfoxV1 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			version: 1,
			subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
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
				baseURL: `={{$credentials.baseUrl || "${AIMFOX_DEFAULT_BASE_URL}"}}`,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
			properties: aimfoxNodeProperties,
		};
	}
}
