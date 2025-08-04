import { INodeProperties } from 'n8n-workflow';

export const blacklistOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['blacklist'],
		},
	},
	options: [
		{
			name: 'List Blacklisted Accounts',
			value: 'listBlacklist',
			action: 'List blacklist',
			description: 'List all blacklisted accounts in the workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/blacklist',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
				},
			},
		},
		{
			name: 'Add Profile to Blacklist',
			value: 'addProfileToBlacklist',
			action: 'Add profile to blacklist',
			description: 'Add profile to the blacklist using the profile URN',
			routing: {
				request: {
					method: 'POST',
					url: '=/blacklist/{{$parameter["profileUrn"]}}',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
				},
			},
		},
		{
			name: 'Remove Profile From Blacklist',
			value: 'removeProfileFromBlacklist',
			action: 'Remove profile from blacklist',
			description: 'Remove profile from the blacklist using the profile URN',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/blacklist/{{$parameter["profileUrn"]}}',
					headers: {
						Authorization: '={{"Bearer " + $credentials.aimfoxApi.apiKey}}',
					},
				},
			},
		},
	],
	default: 'listBlacklist',
};
