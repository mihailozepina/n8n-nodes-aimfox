import { INodeProperties } from 'n8n-workflow';

export const accountFields: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAccountLimits', 'setAccountLimits'],
			},
		},
		default: '',
		placeholder: '123456789',
		description: 'The ID of the account',
		required: true,
	},
	{
		displayName: 'Connect Limit',
		name: 'connectLimit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setAccountLimits'],
			},
		},
		default: 100,
		description: 'Weekly connection request limit (min: 1, max: 1000, recommended: 50-200)',
		required: true,
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
	},
	{
		displayName: 'Message Request Limit',
		name: 'messageRequestLimit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setAccountLimits'],
			},
		},
		default: 100,
		description: 'Weekly message request limit (min: 1, max: 1000, recommended: 50-200)',
		required: true,
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
	},
	{
		displayName: 'InMail Limit',
		name: 'inmailLimit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setAccountLimits'],
			},
		},
		default: 100,
		description: 'Weekly InMail limit (min: 1, max: 1000, recommended: 50-200)',
		required: true,
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
	},
];
