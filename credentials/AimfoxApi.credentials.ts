import { IAuthenticateGeneric, ICredentialType, INodeProperties, ICredentialTestRequest } from 'n8n-workflow';

export class AimfoxApi implements ICredentialType {
	name = 'aimfoxApi';
	displayName = 'Aimfox API';
	documentationUrl =
		'https://docs.aimfox.com';
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
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}'
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.aimfox.com/api/v2',
			url: 'accounts',
		},
	};
}
