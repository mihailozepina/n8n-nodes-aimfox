import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class AimfoxApi implements ICredentialType {
	name = 'aimfoxApi';
	displayName = 'Aimfox API';
	documentationUrl =
		'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				appid: '={{$credentials.apiKey}}',
			},
		},
	};
}
