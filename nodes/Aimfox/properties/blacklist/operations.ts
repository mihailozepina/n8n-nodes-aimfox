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
			name: 'Add Companies to Blacklist',
			value: 'addCompaniesToBlacklist',
			action: 'Add companies to blacklist',
			description: 'Add multiple LinkedIn companies to the blacklist',
			routing: {
				request: {
					method: 'POST',
					url: '/blacklist-companies',
					headers: {},
					body: {
						companies: '={{$parameter["companyUrls"].split(",").map(url => url.trim())}}',
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
					headers: {},
				},
			},
		},
		{
			name: 'List Blacklisted Companies',
			value: 'listBlacklistedCompanies',
			action: 'List blacklisted companies',
			description: 'List all blacklisted LinkedIn companies in the workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/blacklist-companies',
					headers: {},
				},
			},
		},
		{
			name: 'List Blacklisted Profiles',
			value: 'listBlacklist',
			action: 'List blacklisted profiles',
			description: 'List all blacklisted profiles in the workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/blacklist',
					headers: {},
				},
			},
		},
		{
			name: 'Remove Company From Blacklist',
			value: 'removeCompanyFromBlacklist',
			action: 'Remove company from blacklist',
			description: 'Remove a LinkedIn company from the blacklist using the company URN',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/blacklist-companies/{{$parameter["companyUrn"]}}',
					headers: {},
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
					headers: {},
				},
			},
		},
	],
	default: 'listBlacklist',
};
