import { INodeProperties } from 'n8n-workflow';

export const customVariableOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['customVariable'],
		},
	},
	options: [
		{
			name: 'Add Custom Variables to Target',
			value: 'addCustomVariablesToTarget',
			action: 'Add custom variables to target',
			description: 'Add custom variables to a specific target in a campaign',
			routing: {
				request: {
					method: 'POST',
					url: '=/campaigns/{{$parameter["campaignId"]}}/custom-variables',
					headers: {},
					body: {
						custom_variables:
							'={{[{ target_urn: $parameter["targetUrn"], variables: JSON.parse($parameter["variables"]) }]}}',
					},
				},
			},
		},
		{
			name: 'Get Campaign Custom Variables',
			value: 'getCampaignCustomVariables',
			action: 'Get campaign custom variables',
			description: 'Get all custom variables for a specific campaign',
			routing: {
				request: {
					method: 'GET',
					url: '=/campaigns/{{$parameter["campaignId"]}}/custom-variables',
					headers: {},
				},
			},
		},
		{
			name: 'Get Target Custom Variables',
			value: 'getTargetCustomVariables',
			action: 'Get target custom variables',
			description: 'Get custom variables for a specific target in a campaign',
			routing: {
				request: {
					method: 'GET',
					url: '=/campaigns/{{$parameter["campaignId"]}}/custom-variables/{{$parameter["targetUrn"]}}',
					headers: {},
				},
			},
		},
	],
	default: 'getCampaignCustomVariables',
};
