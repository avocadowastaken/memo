import { runBaseCacheTests } from '../../__testutils__/runCacheTests';
import { OrderedMap } from '../OrderedMap';

runBaseCacheTests(() => new OrderedMap());
