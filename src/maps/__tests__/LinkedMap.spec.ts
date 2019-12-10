import { runBaseCacheTests } from '../../__testutils__/runCacheTests';
import { LinkedMap } from '../LinkedMap';

runBaseCacheTests(() => new LinkedMap());
