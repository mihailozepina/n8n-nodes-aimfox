import { INodeProperties } from 'n8n-workflow';

export const blacklistFields: INodeProperties[] = [
	{
		displayName: 'Profile URN',
		name: 'profileUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['blacklist'],
				operation: ['addProfileToBlacklist', 'removeProfileFromBlacklist'],
			},
		},
		default: '',
		placeholder: 'ACoAAAK-hCcB6RvA71OCuRk-JHYpV6FFKIjbxpY',
		description: 'The LinkedIn URN of the profile',
		required: true,
	},
	{
		displayName: 'Company URLs',
		name: 'companyUrls',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['blacklist'],
				operation: ['addCompaniesToBlacklist'],
			},
		},
		default: '',
		placeholder:
			'https://www.linkedin.com/company/aimfox/, https://www.linkedin.com/company/google/',
		description: 'Comma-separated list of LinkedIn company URLs to add to the blacklist',
		required: true,
	},
	{
		displayName: 'Company URN',
		name: 'companyUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['blacklist'],
				operation: ['removeCompanyFromBlacklist'],
			},
		},
		default: '',
		placeholder: '2568197',
		description: 'The LinkedIn URN of the company to remove from the blacklist',
		required: true,
	},
];
