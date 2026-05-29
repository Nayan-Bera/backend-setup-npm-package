import app from "./app.js";
import { config } from "./config/index.js";

const PORT = config.PORT;

const startServer = async () => {
	try {
		const server = app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT} in ${config.NODE_ENV} mode`);
		});

		/* Graceful Shutdown */
		process.on("SIGINT", () => {
			server.close(() => {
				console.log("Server closed");
				process.exit(0);
			});
		});
	} catch (error) {
		console.error("❌ Failed to start server:", error);
		process.exit(1);
	}
};

startServer();
