import { IAuthenticateGeneric, ICredentialType, INodeProperties, ICredentialTestRequest } from 'n8n-workflow';

// Credentials saved before the Base URL field existed don't have it, so every
// use falls back to this.
export const AIMFOX_DEFAULT_BASE_URL = 'https://api.aimfox.com/api/v2';

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
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: AIMFOX_DEFAULT_BASE_URL,
			description: 'The Aimfox API to call. Leave the default unless you were given a different one, e.g. for testing.',
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
			baseURL: `={{$credentials.baseUrl || "${AIMFOX_DEFAULT_BASE_URL}"}}`,
			url: '/accounts',
		},
	};
}
