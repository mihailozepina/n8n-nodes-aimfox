import { INodeProperties } from 'n8n-workflow';
import { accountFields } from './account/fields';
import { assetFields } from './asset/fields';
import { assetOperations } from './asset/operations';
import { accountOperations } from './account/operations';
import { blacklistFields } from './blacklist/fields';
import { blacklistOperations } from './blacklist/operations';
import { campaignFields } from './campaign/fields';
import { campaignOperations } from './campaign/operations';
import { conversationFields } from './conversation/fields';
import { conversationOperations } from './conversation/operations';
import { customVariableFields } from './customVariable/fields';
import { customVariableOperations } from './customVariable/operations';
import { flowFields } from './flow/fields';
import { flowOperations } from './flow/operations';
import { labelFields } from './label/fields';
import { labelOperations } from './label/operations';
import { leadFields } from './lead/fields';
import { leadOperations } from './lead/operations';
import { noteFields } from './note/fields';
import { webhookFields } from './webhook/fields';
import { webhookOperations } from './webhook/operations';
import { workflowTemplateFields } from './workflowTemplate/fields';
import { workflowTemplateOperations } from './workflowTemplate/operations';

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
			name: 'Asset',
			value: 'asset',
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
			name: 'Flow',
			value: 'flow',
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
			name: 'Webhook',
			value: 'webhook',
		},
		{
			name: 'Workflow Template',
			value: 'workflowTemplate',
		},
	],
	default: 'account',
};

export const aimfoxNodeProperties = [
	resourceOptions,
	accountOperations,
	assetOperations,
	blacklistOperations,
	conversationOperations,
	campaignOperations,
	customVariableOperations,
	flowOperations,
	labelOperations,
	leadOperations,
	webhookOperations,
	workflowTemplateOperations,
	...accountFields,
	...assetFields,
	...blacklistFields,
	...campaignFields,
	...conversationFields,
	...customVariableFields,
	...flowFields,
	...labelFields,
	...leadFields,
	...noteFields,
	...webhookFields,
	...workflowTemplateFields,
];
