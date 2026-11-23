require('dotenv/config');

const { shutdownCoordinator } = require('./src/utils/shutdown.ts');

// Ensure HTTP servers, queue workers, Prisma and Redis connections opened by
// test suites are torn down so Jest can exit without --forceExit.
// closeAllConnections() is idempotent, so per-suite calls are safe.
afterAll(async () => {
  await shutdownCoordinator.closeAllConnections();
});

// Last-resort guard: unref lingering timers that libraries may leave behind so
// they cannot keep the Jest worker alive after all suites have completed.
afterAll(() => {
  shutdownCoordinator.removeSignalListeners();
});
