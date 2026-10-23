import { INodeProperties } from 'n8n-workflow';

export const workflowTemplateOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['workflowTemplate'],
		},
	},
	options: [
		{
			name: 'Create Workflow Template',
			value: 'createWorkflowTemplate',
			action: 'Create a workflow template',
			description: 'Save a flow definition as a reusable workflow template',
			routing: {
				request: {
					method: 'POST',
					url: '/workflow-templates',
					headers: {},
					body: {
						name: '={{$parameter["workflowTemplateName"]}}',
						definition:
							'={{typeof $parameter["workflowTemplateDefinition"] === "string" ? JSON.parse($parameter["workflowTemplateDefinition"]) : $parameter["workflowTemplateDefinition"]}}',
					},
				},
			},
		},
		{
			name: 'Delete Workflow Template',
			value: 'deleteWorkflowTemplate',
			action: 'Delete a workflow template',
			description: "Delete a workflow template. System templates can't be deleted.",
			routing: {
				request: {
					method: 'DELETE',
					url: '=/workflow-templates/{{$parameter["workflowTemplateId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Get Workflow Template',
			value: 'getWorkflowTemplate',
			action: 'Get a workflow template',
			description: 'Get a workflow template with its flow definition',
			routing: {
				request: {
					method: 'GET',
					url: '=/workflow-templates/{{$parameter["workflowTemplateId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'List Workflow Templates',
			value: 'listWorkflowTemplates',
			action: 'List workflow templates',
			description:
				"List reusable flow definitions: built-in system templates and the workspace's own. Use one with Flow → Save Flow.",
			routing: {
				request: {
					method: 'GET',
					url: '/workflow-templates',
					headers: {},
				},
			},
		},
		{
			name: 'Update Workflow Template',
			value: 'updateWorkflowTemplate',
			action: 'Update a workflow template',
			description: "Rename a workflow template or replace its definition. System templates can't be changed.",
			routing: {
				request: {
					method: 'PATCH',
					url: '=/workflow-templates/{{$parameter["workflowTemplateId"]}}',
					headers: {},
				},
			},
		},
	],
	default: 'listWorkflowTemplates',
};
