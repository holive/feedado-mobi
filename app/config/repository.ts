import { NError } from "../variables";
import { Config } from "./config";

export interface Repository {
	update: (config: Config) => Promise<NError>
	findAll: () => Promise<Config>
}
