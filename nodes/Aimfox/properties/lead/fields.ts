import { INodeProperties } from 'n8n-workflow';

export const leadFields: INodeProperties[] = [
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getLead', 'addLabelToLead', 'removeLabelFromLead', 'addNoteToLead'],
			},
		},
		default: '',
		placeholder: '1113575872',
		description: 'The LinkedIn ID of the lead to retrieve',
		required: true,
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getLeadCustomVariables'],
			},
		},
		default: '',
		placeholder: '885983605',
		description: 'The ID of the account that owns the lead',
		required: true,
	},
	{
		displayName: 'Lead URN',
		name: 'leadUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getLeadCustomVariables'],
			},
		},
		default: '',
		placeholder: 'ACoAAALFnSUBDfSrz2kO3C8PelRi1DHIPNWuOlo',
		description: 'The LinkedIn URN of the lead',
		required: true,
	},
];
