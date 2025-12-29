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
					'removeProfileFromCampaign',
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
	{
		displayName: 'Campaign Name',
		name: 'campaignName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		default: '',
		placeholder: 'My Campaign',
		description: 'The name of the campaign',
		required: true,
	},
	{
		displayName: 'Campaign Type',
		name: 'campaignType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		options: [
			{
				name: 'List',
				value: 'list',
				description: 'Custom list campaign',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search-based campaign',
			},
		],
		default: 'list',
		description: 'The type of campaign to create',
		required: true,
	},
	{
		displayName: 'Outreach Type',
		name: 'outreachType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		options: [
			{
				name: 'Connect',
				value: 'connect',
				description: 'Send connection requests',
			},
			{
				name: 'Inbound',
				value: 'inbound',
				description: 'Inbound outreach',
			},
		],
		default: 'connect',
		description: 'The outreach type for the campaign',
		required: true,
	},
	{
		displayName: 'Audience Size',
		name: 'audienceSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		default: 10000,
		description: 'The maximum audience size for the campaign',
		required: true,
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Account IDs',
		name: 'accountIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['createCampaign'],
			},
		},
		default: '',
		placeholder: '885983605, 123456789',
		description: 'Comma-separated list of account IDs to assign to the campaign',
		required: true,
	},
	{
		displayName: 'Profile URN or Public Identifier',
		name: 'profileUrnOrIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['removeProfileFromCampaign'],
			},
		},
		default: '',
		placeholder: 'john-doe-bb1869208 or ACoAAAK-hCcB6RvA71OCuRk-JHYpV6FFKIjbxpY',
		description:
			'The LinkedIn URN or public identifier of the profile to remove (e.g., from URL linkedin.com/in/john-doe → john-doe)',
		required: true,
	},
];
