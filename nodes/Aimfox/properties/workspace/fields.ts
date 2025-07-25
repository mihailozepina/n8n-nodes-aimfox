import { INodeProperties } from 'n8n-workflow';

export const workspaceFields: INodeProperties[] = [
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'options',
		required: true,
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/workspaces',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'workspaces',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.name}}',
									value: '={{$responseItem.id}}',
								},
							},
						],
					},
				},
			},
		},
		default: '',
		description:
			'Select the Aimfox workspace. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
