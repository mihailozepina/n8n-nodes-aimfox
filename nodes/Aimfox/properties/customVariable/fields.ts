import { INodeProperties } from 'n8n-workflow';

export const customVariableFields: INodeProperties[] = [
	{
		displayName: 'Campaign ID',
		name: 'campaignId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customVariable'],
				operation: [
					'getCampaignCustomVariables',
					'getTargetCustomVariables',
					'addCustomVariablesToTarget',
				],
			},
		},
		default: '',
		placeholder: '7918e607-d898-4ca9-814e-a09fe1727459',
		description: 'The ID of the campaign',
		required: true,
	},
	{
		displayName: 'Target URN',
		name: 'targetUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customVariable'],
				operation: ['getTargetCustomVariables', 'addCustomVariablesToTarget'],
			},
		},
		default: '',
		placeholder: 'ACoAAALFnSUBDfSrz2kO3C8PelRi1DHIPNWuOlo',
		description: 'The LinkedIn URN of the target',
		required: true,
	},
	{
		displayName: 'Variables',
		name: 'variables',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customVariable'],
				operation: ['addCustomVariablesToTarget'],
			},
		},
		default: '{}',
		placeholder: '{"CUSTOM_MESSAGE": "Hello there", "FIRST_NAME": "John"}',
		description: 'JSON object containing the custom variables to add',
		required: true,
		typeOptions: {
			rows: 4,
		},
	},
];
