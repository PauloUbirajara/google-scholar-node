const releasesUrl = 'https://api.github.com/repos/PauloUbirajara/google-scholar-node/releases'

type ReleaseType = {
	url: string
	id: number
	name: string
	browser_download_url: string
}

export class UpdateService {
	public static async getReleases(): Promise<ReleaseType[]> {
		const response = await fetch(releasesUrl)
		if (!response.ok) throw new Error('Could not fetch updates')
		const jsonResponse = await response.json()
		const releases: ReleaseType[] = jsonResponse['assets']
		return releases
	}
}