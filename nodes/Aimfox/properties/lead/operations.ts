import { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['lead'],
		},
	},
	options: [
		{
			name: 'Add Label To Lead',
			value: 'addLabelToLead',
			action: 'Add label to lead',
			description: 'Add a new label to the selected lead',
			routing: {
				request: {
					method: 'POST',
					url: '=/leads/{{$parameter["leadId"]}}/labels/{{$parameter["labelId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Add Note To Lead',
			value: 'addNoteToLead',
			action: 'Add note to lead',
			description: 'Add a new note to the selected lead',
			routing: {
				request: {
					method: 'POST',
					url: '=/leads/{{$parameter["leadId"]}}/notes',
					headers: {},
					body: {
						text: '={{$parameter["noteText"]}}',
					},
				},
			},
		},
		{
			name: 'Delete Note From Lead',
			value: 'deleteNoteFromLead',
			action: 'Delete note from lead',
			description: 'Delete a note from the selected lead',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/leads/{{$parameter["leadId"]}}/notes/{{$parameter["noteId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Get Lead',
			value: 'getLead',
			action: 'Get lead',
			description: 'Get a specific lead by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/leads/{{$parameter["leadId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Get Lead Custom Variables',
			value: 'getLeadCustomVariables',
			action: 'Get lead custom variables',
			description: 'Get custom variables for a specific lead',
			routing: {
				request: {
					method: 'GET',
					url: '=/accounts/{{$parameter["accountId"]}}/leads/{{$parameter["leadUrn"]}}/custom-variables',
					headers: {},
				},
			},
		},
		{
			name: 'List Lead Notes',
			value: 'listLeadNotes',
			action: 'List lead notes',
			description: 'List all notes for the selected lead',
			routing: {
				request: {
					method: 'GET',
					url: '=/leads/{{$parameter["leadId"]}}/notes',
					headers: {},
				},
			},
		},
		{
			name: 'List Recent Leads',
			value: 'listRecentLeads',
			action: 'List recent leads',
			description: 'List recent leads for the selected workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/analytics/recent-leads',
					headers: {},
				},
			},
		},
		{
			name: 'Remove Label From Lead',
			value: 'removeLabelFromLead',
			action: 'Remove label from lead',
			description: 'Remove a label from the selected lead',
			routing: {
				request: {
					method: 'DELETE',
					url: '=/leads/{{$parameter["leadId"]}}/labels/{{$parameter["labelId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Search Leads',
			value: 'searchLeads',
			action: 'Search leads',
			description: 'Search through all leads in the workspace',
			routing: {
				request: {
					method: 'POST',
					url: '/leads:search',
					headers: {},
					qs: {
						start: '={{$parameter["start"]}}',
						count: '={{$parameter["count"]}}',
					},
					body: {
						keywords: '={{$parameter["keywords"] || ""}}',
						current_companies:
							'={{$parameter["additionalFilters"]?.currentCompanies ? $parameter["additionalFilters"].currentCompanies.split(",").map(c => c.trim()) : []}}',
						past_companies:
							'={{$parameter["additionalFilters"]?.pastCompanies ? $parameter["additionalFilters"].pastCompanies.split(",").map(c => c.trim()) : []}}',
						education:
							'={{$parameter["additionalFilters"]?.education ? $parameter["additionalFilters"].education.split(",").map(e => e.trim()) : []}}',
						interests:
							'={{$parameter["additionalFilters"]?.interests ? $parameter["additionalFilters"].interests.split(",").map(i => i.trim()) : []}}',
						labels:
							'={{$parameter["additionalFilters"]?.filterLabels ? $parameter["additionalFilters"].filterLabels.split(",").map(l => l.trim()) : []}}',
						languages:
							'={{$parameter["additionalFilters"]?.languages ? $parameter["additionalFilters"].languages.split(",").map(l => l.trim()) : []}}',
						locations:
							'={{$parameter["additionalFilters"]?.locations ? $parameter["additionalFilters"].locations.split(",").map(l => l.trim()) : []}}',
						origins:
							'={{$parameter["additionalFilters"]?.origins ? $parameter["additionalFilters"].origins.split(",").map(o => o.trim()) : []}}',
						skills:
							'={{$parameter["additionalFilters"]?.skills ? $parameter["additionalFilters"].skills.split(",").map(s => s.trim()) : []}}',
						lead_of:
							'={{$parameter["additionalFilters"]?.leadOf ? $parameter["additionalFilters"].leadOf.split(",").map(l => l.trim()) : []}}',
						optimize: '={{$parameter["optimize"]}}',
					},
				},
			},
		},
		{
			name: 'Update Note',
			value: 'updateNote',
			action: 'Update note',
			description: 'Update a note for the selected lead',
			routing: {
				request: {
					method: 'PATCH',
					url: '=/leads/{{$parameter["leadId"]}}/notes/{{$parameter["noteId"]}}',
					headers: {},
					body: {
						text: '={{$parameter["noteText"]}}',
					},
				},
			},
		},
	],
	default: 'listRecentLeads',
};
