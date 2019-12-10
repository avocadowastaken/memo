import { runSizedCacheTests } from '../../__testutils__/runCacheTests';
import { LRUMap } from '../LRUMap';

runSizedCacheTests(maxSize => new LRUMap({ maxSize }));
