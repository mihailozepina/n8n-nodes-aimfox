import { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['account'],
		},
	},
	options: [
		{
			name: 'Get Account Limits',
			value: 'getAccountLimits',
			action: 'Get account limits',
			description: 'Get the interaction limits for a specific account',
			routing: {
				request: {
					method: 'GET',
					url: '=/accounts/{{$parameter["accountId"]}}/limits',
					headers: {},
				},
			},
		},
		{
			name: 'List Accounts',
			value: 'listAccounts',
			action: 'List accounts',
			description: 'List all accounts in the workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/accounts',
					headers: {},
				},
			},
		},
		{
			name: 'Set Account Limits',
			value: 'setAccountLimits',
			action: 'Set account limits',
			description: 'Update the weekly interaction limits for an account',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/accounts/{{$parameter["accountId"]}}/limits',
					headers: {},
					body: {
						connect: '={{$parameter["connectLimit"]}}',
						message_request: '={{$parameter["messageRequestLimit"]}}',
						inmail: '={{$parameter["inmailLimit"]}}',
					},
				},
			},
		},
	],
	default: 'listAccounts',
};
