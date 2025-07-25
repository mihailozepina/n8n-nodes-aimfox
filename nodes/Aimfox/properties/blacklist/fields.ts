import { INodeProperties } from 'n8n-workflow';

export const blacklistFields: INodeProperties[] = [
	{
		displayName: 'Profile URN',
		name: 'profileUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['blacklist'],
				operation: ['addProfileToBlacklist'],
			},
		},
		default: '',
		placeholder: 'ACoAAAK-hCcB6RvA71OCuRk-JHYpV6FFKIjbxpY',
		description: 'The LinkedIn URN of the profile to add to the blacklist',
		required: true,
	},
];
