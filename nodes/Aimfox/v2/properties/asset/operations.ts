import { INodeProperties } from 'n8n-workflow';

export const assetOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['asset'],
		},
	},
	options: [
		{
			name: 'Create Asset',
			value: 'createAsset',
			action: 'Create an asset',
			description: 'Create a message, connection note, InMail, voice note or file asset',
			routing: {
				request: {
					method: 'POST',
					url: '/assets',
					headers: {},
					body: {
						type: '={{$parameter["assetType"]}}',
						name: '={{$parameter["assetName"]}}',
					},
				},
			},
		},
		{
			name: 'Delete Asset',
			value: 'deleteAsset',
			action: 'Delete an asset',
			description: "Delete an asset. Flows that already used it aren't affected.",
			routing: {
				request: {
					method: 'DELETE',
					url: '=/assets/{{$parameter["assetId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'Get Asset',
			value: 'getAsset',
			action: 'Get an asset',
			description: 'Get a specific asset by ID',
			routing: {
				request: {
					method: 'GET',
					url: '=/assets/{{$parameter["assetId"]}}',
					headers: {},
				},
			},
		},
		{
			name: 'List Assets',
			value: 'listAssets',
			action: 'List assets',
			description: 'List all assets in the workspace',
			routing: {
				request: {
					method: 'GET',
					url: '/assets',
					headers: {},
				},
			},
		},
		{
			name: 'Update Asset',
			value: 'updateAsset',
			action: 'Update an asset',
			description: "Update an asset. Flows keep their own copy, so this doesn't change flows that already used it.",
			routing: {
				request: {
					method: 'PATCH',
					url: '=/assets/{{$parameter["assetId"]}}',
					headers: {},
				},
			},
		},
	],
	default: 'listAssets',
};
