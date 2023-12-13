import { envs, logger } from "./config";
import { AppRoutes } from "./presentation/routes";
import Server from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    try {
        await new Server({ port: envs.PORT, routes: AppRoutes.routes }).start();
    } catch (err) {
        logger.error(err);
    }
}
