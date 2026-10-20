import {
	INodeType,
	INodeTypeBaseDescription,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { aimfoxNodeProperties } from './properties';
import { AIMFOX_DEFAULT_BASE_URL } from '../../../credentials/AimfoxApi.credentials';

// Public API v4 (flow builder). The credential's base URL still names v2 for
// most users, so the version at the end of it is swapped for v4.
export class AimfoxV2 implements INodeType {
	description: INodeTypeDescription;

	constructor(baseDescription: INodeTypeBaseDescription) {
		this.description = {
			...baseDescription,
			version: 2,
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
				baseURL: `={{($credentials.baseUrl || "${AIMFOX_DEFAULT_BASE_URL}").replace(/\\/api\\/v\\d+\\/?$/, "/api/v4")}}`,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
			properties: aimfoxNodeProperties,
		};
	}
}
