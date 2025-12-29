import { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	default: 'listCampaigns',
	displayOptions: {
		show: {
			resource: ['campaign'],
		},
	},
	options: [
		{
			name: 'Add Profile to Campaign',
			value: 'addProfileToCampaign',
			action: 'Add profile to campaign',
			description: 'Add profile to the selected campaign',
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["campaignId"]}}/audience',
					headers: {},
					body: {
						profile_url: '={{$parameter["profileUrl"]}}',
					},
				},
			},
		},
		{
			name: 'Add Profile to Campaign with Custom Variables',
			value: 'addProfileToCampaignWithCustomVariables',
			action: 'Add profile to campaign with custom variables',
			description: 'Add profile to the selected campaign with custom variables',
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["campaignId"]}}/audience/multiple',
					headers: {},
					body: {
						type: 'profile_url',
						profiles: [
							{
								profile_url: '={{$parameter["profileUrl"]}}',
								custom_variables: '={{JSON.parse($parameter["customVariables"])}}',
							},
						],
					},
				},
			},
		},
		{
			name: 'Create Campaign',
			value: 'createCampaign',
			action: 'Create a campaign',
			description: 'Create a new Aimfox campaign',
			routing: {
				request: {
					method: 'POST',
					url: '/campaigns',
					headers: {},
					body: {
						name: '={{$parameter["campaignName"]}}',
						type: '={{$parameter["campaignType"]}}',
						outreach_type: '={{$parameter["outreachType"]}}',
						audience_size: '={{$parameter["audienceSize"]}}',
						account_ids: '={{$parameter["accountIds"].split(",").map(id => id.trim())}}',
					},
				},
			},
		},
		{
			name: 'Get Campaign',
			value: 'getCampaign',
			action: 'Get a campaign',
			description: 'Get a specific campaign by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/campaigns/{{$parameter["campaignId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'List Campaigns',
			value: 'listCampaigns',
			action: 'List campaigns',
			description: 'List all campaigns in the workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/campaigns',
					headers: {},
				},
			},
		},
		{
			name: 'Pause',
			value: 'pauseCampaign',
			action: 'Pause a campaign',
			description: 'Pause a running campaign',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/campaigns/{{$parameter["campaignId"]}}',
					headers: {},
					body: {
						state: 'PAUSED',
					},
				},
			},
		},
		{
			name: 'Remove Profile From Campaign',
			value: 'removeProfileFromCampaign',
			action: 'Remove profile from campaign',
			description: 'Remove a profile from the selected campaign using URN or public identifier',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/campaigns/{{$parameter["campaignId"]}}/audience/{{$parameter["profileUrnOrIdentifier"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Resume',
			value: 'resumeCampaign',
			action: 'Resume a campaign',
			description: 'Resume a paused campaign',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/campaigns/{{$parameter["campaignId"]}}',
					headers: {},
					body: {
						state: 'ACTIVE',
					},
				},
			},
		},
	],
};
