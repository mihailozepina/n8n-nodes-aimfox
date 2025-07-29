import { INodeProperties } from 'n8n-workflow';
import { accountOperations } from './account/operations';
import { blacklistFields } from './blacklist/fields';
import { blacklistOperations } from './blacklist/operations';
import { campaignFields } from './campaign/fields';
import { campaignOperations } from './campaign/operations';
import { conversationFields } from './conversation/fields';
import { conversationOperations } from './conversation/operations';
import { labelFields } from './label/fields';
import { labelOperations } from './label/operations';
import { leadFields } from './lead/fields';
import { leadOperations } from './lead/operations';
import { noteFields } from './note/fields';
import { templateFields } from './template/fields';
import { templateOperations } from './template/operations';

const resourceOptions: INodeProperties = {
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
};

export const aimfoxNodeProperties = [
	resourceOptions,
	accountOperations,
	blacklistOperations,
	conversationOperations,
	campaignOperations,
	labelOperations,
	leadOperations,
	templateOperations,
	...blacklistFields,
	...campaignFields,
	...conversationFields,
	...labelFields,
	...leadFields,
	...noteFields,
	...templateFields,
];
