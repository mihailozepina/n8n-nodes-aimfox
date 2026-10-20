import { INodeProperties } from 'n8n-workflow';

export const leadFields: INodeProperties[] = [
	{
		displayName: 'Lead ID',
		name: 'leadId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getLead', 'addLabelToLead', 'removeLabelFromLead', 'addNoteToLead'],
			},
		},
		default: '',
		placeholder: '1113575872',
		description: 'The LinkedIn ID of the lead to retrieve',
		required: true,
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getLeadCustomVariables'],
			},
		},
		default: '',
		placeholder: '885983605',
		description: 'The ID of the account that owns the lead',
		required: true,
	},
	{
		displayName: 'Lead URN',
		name: 'leadUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getLeadCustomVariables'],
			},
		},
		default: '',
		placeholder: 'ACoAAALFnSUBDfSrz2kO3C8PelRi1DHIPNWuOlo',
		description: 'The LinkedIn URN of the lead',
		required: true,
	},
	{
		displayName: 'Start',
		name: 'start',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['searchLeads'],
			},
		},
		default: 0,
		description: 'The starting index for pagination',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['searchLeads'],
			},
		},
		default: 20,
		description: 'The number of results to return',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
	},
	{
		displayName: 'Keywords',
		name: 'keywords',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['searchLeads'],
			},
		},
		default: '',
		placeholder: 'software engineer',
		description: 'Keywords to search for in leads',
	},
	{
		displayName: 'Optimize',
		name: 'optimize',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['searchLeads'],
			},
		},
		default: false,
		description: 'Whether to optimize the search results',
	},
	{
		displayName: 'Additional Filters',
		name: 'additionalFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['searchLeads'],
			},
		},
		options: [
			{
				displayName: 'Current Companies',
				name: 'currentCompanies',
				type: 'string',
				default: '',
				placeholder: 'Google, Microsoft',
				description: 'Comma-separated list of current company names to filter by',
			},
			{
				displayName: 'Education',
				name: 'education',
				type: 'string',
				default: '',
				placeholder: 'Harvard, MIT',
				description: 'Comma-separated list of education institutions to filter by',
			},
			{
				displayName: 'Interests',
				name: 'interests',
				type: 'string',
				default: '',
				placeholder: 'AI, Machine Learning',
				description: 'Comma-separated list of interests to filter by',
			},
			{
				displayName: 'Labels',
				name: 'filterLabels',
				type: 'string',
				default: '',
				placeholder: 'label-ID-1, label-ID-2',
				description: 'Comma-separated list of label IDs to filter by',
			},
			{
				displayName: 'Languages',
				name: 'languages',
				type: 'string',
				default: '',
				placeholder: 'English, Spanish',
				description: 'Comma-separated list of languages to filter by',
			},
			{
				displayName: 'Lead Of',
				name: 'leadOf',
				type: 'string',
				default: '',
				placeholder: '1033744867, 1173158106',
				description: 'Comma-separated list of account IDs to filter leads by ownership',
			},
			{
				displayName: 'Locations',
				name: 'locations',
				type: 'string',
				default: '',
				placeholder: 'New York, London',
				description: 'Comma-separated list of locations to filter by',
			},
			{
				displayName: 'Origins',
				name: 'origins',
				type: 'string',
				default: '',
				placeholder: 'campaign-ID-1, campaign-ID-2',
				description: 'Comma-separated list of origin campaign IDs to filter by',
			},
			{
				displayName: 'Past Companies',
				name: 'pastCompanies',
				type: 'string',
				default: '',
				placeholder: 'Amazon, Meta',
				description: 'Comma-separated list of past company names to filter by',
			},
			{
				displayName: 'Skills',
				name: 'skills',
				type: 'string',
				default: '',
				placeholder: 'JavaScript, Python',
				description: 'Comma-separated list of skills to filter by',
			},
		],
	},
];
