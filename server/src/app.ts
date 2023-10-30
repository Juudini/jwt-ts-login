import { envs, logger } from "./config";
import { AppRouters } from "./presentation/routes";
import Server from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    try {
        await new Server({ port: envs.PORT, routes: AppRouters.get() }).start();
    } catch (error) {
        logger.error(error);
    }
}
