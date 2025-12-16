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
	],
	default: 'listAccounts',
};
