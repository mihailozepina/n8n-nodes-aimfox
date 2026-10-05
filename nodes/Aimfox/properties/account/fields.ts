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
	{
		displayName: 'Warm-Up',
		name: 'warmup',
		type: 'collection',
		placeholder: 'Add Warm-Up Setting',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['setAccountLimits'],
			},
		},
		default: {},
		description: 'Ramp the limits up gradually. While enabled, the limits start at the starting values and rise towards the limits above by 100 every 4 weeks (Low), 2 weeks (Medium) or week (High). Sending any warm-up setting restarts the ramp.',
		options: [
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						type: 'body',
						property: 'warmup.enabled',
					},
				},
			},
			{
				displayName: 'Starting Connect Limit',
				name: 'connect',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
				routing: {
					send: {
						type: 'body',
						property: 'warmup.connect',
					},
				},
			},
			{
				displayName: 'Starting InMail Limit',
				name: 'inmail',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
				routing: {
					send: {
						type: 'body',
						property: 'warmup.inmail',
					},
				},
			},
			{
				displayName: 'Speed',
				name: 'speed',
				type: 'options',
				options: [
					{ name: 'Low', value: 'LOW' },
					{ name: 'Medium', value: 'MEDIUM' },
					{ name: 'High', value: 'HIGH' },
				],
				default: 'MEDIUM',
				routing: {
					send: {
						type: 'body',
						property: 'warmup.speed',
					},
				},
			},
		],
	},
];
