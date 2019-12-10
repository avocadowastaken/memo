import { runSizedCacheTests } from '../../../__testutils__/runCacheTests';
import { LRUCache } from '../LRUCache';

runSizedCacheTests(maxSize => new LRUCache({ maxSize }));
