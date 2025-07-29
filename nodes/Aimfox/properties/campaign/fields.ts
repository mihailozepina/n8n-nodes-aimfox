import { INodeProperties } from 'n8n-workflow';

export const campaignFields: INodeProperties[] = [
	{
		displayName: 'Campaign ID',
		name: 'campaignId',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: [
					'resumeCampaign',
					'pauseCampaign',
					'addProfileToCampaign',
					'getCampaign',
					'addProfileToCampaignWithCustomVariables',
				],
			},
		},
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/campaigns',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'campaigns',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.name}}',
									value: '={{$responseItem.id}}',
								},
							},
						],
					},
				},
			},
		},
		default: '',
		description:
			'Select the Aimfox campaign. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Profile URL',
		name: 'profileUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addProfileToCampaign', 'addProfileToCampaignWithCustomVariables'],
			},
		},
		default: '',
		placeholder: 'https://www.linkedin.com/in/john-doe-bb1869208/',
		description: 'The LinkedIn URL of the profile to add to the campaign',
		required: true,
	},
	{
		displayName: 'Custom Variables (JSON)',
		name: 'customVariables',
		type: 'json',
		required: true,
		default: '',
		description: 'Custom variables to send with the profile, in JSON format',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['addProfileToCampaignWithCustomVariables'],
			},
		},
	},
];
