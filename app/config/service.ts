import { Repository } from "./repository"
import { NError } from "../variables"
import { Config } from "./config"

export default class ConfigService {
	private repo: Repository
	
	constructor(repository: Repository) {
		this.repo = repository
	}
	
	public update = async (config: Config): Promise<NError> => {
		return this.repo.update(config)
	}
	
	public get = async (): Promise<Config> => {
		return this.repo.findAll()
	}
}
