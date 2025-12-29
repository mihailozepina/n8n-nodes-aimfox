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
