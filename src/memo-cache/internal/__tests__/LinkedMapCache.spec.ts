import { runBaseCacheTests } from "../../../__testutils__/runCacheTests";
import { LinkedMapCache } from "../LinkedMapCache";

runBaseCacheTests(() => new LinkedMapCache());
