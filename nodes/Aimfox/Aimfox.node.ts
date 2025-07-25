import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { blacklistFields } from './properties/blacklist/fields';
import { conversationFields } from './properties/conversation/fields';
import { labelFields } from './properties/label/fields';
import { leadFields } from './properties/lead/fields';
import { noteFields } from './properties/note/fields';
import { templateFields } from './properties/template/fields';
import { campaignFields } from './properties/campaign/fields';
import { workspaceFields } from './properties/workspace/fields';

import { accountOperations } from './properties/account/operations';
import { blacklistOperations } from './properties/blacklist/operations';
import { conversationOperations } from './properties/conversation/operations';
import { campaignOperations } from './properties/campaign/operations';
import { labelOperations } from './properties/label/operations';
import { leadOperations } from './properties/lead/operations';
import { templateOperations } from './properties/template/operations';

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
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'aimfoxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://673b415297f2.ngrok-free.app/api/v1', // change to api.aimfox.com
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Blacklist',
						value: 'blacklist',
					},
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Conversation',
						value: 'conversation',
					},
					{
						name: 'Label',
						value: 'label',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Template',
						value: 'template',
					},
				],
				default: 'account',
			},

			accountOperations,
			blacklistOperations,
			conversationOperations,
			campaignOperations,
			labelOperations,
			leadOperations,
			templateOperations,
			...workspaceFields,
			...blacklistFields,
			...campaignFields,
			...conversationFields,
			...labelFields,
			...leadFields,
			...noteFields,
			...templateFields,
		],
	};
}
