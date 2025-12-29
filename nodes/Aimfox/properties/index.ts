import { INodeProperties } from 'n8n-workflow';
import { accountFields } from './account/fields';
import { accountOperations } from './account/operations';
import { blacklistFields } from './blacklist/fields';
import { blacklistOperations } from './blacklist/operations';
import { campaignFields } from './campaign/fields';
import { campaignOperations } from './campaign/operations';
import { conversationFields } from './conversation/fields';
import { conversationOperations } from './conversation/operations';
import { customVariableFields } from './customVariable/fields';
import { customVariableOperations } from './customVariable/operations';
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
			name: 'Custom Variable',
			value: 'customVariable',
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
	customVariableOperations,
	labelOperations,
	leadOperations,
	templateOperations,
	...accountFields,
	...blacklistFields,
	...campaignFields,
	...conversationFields,
	...customVariableFields,
	...labelFields,
	...leadFields,
	...noteFields,
	...templateFields,
];
