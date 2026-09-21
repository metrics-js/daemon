import { Readable } from 'stream';

interface DaemonOptions {
    port?: number | string;
    address?: string;
}

declare class MetricsDaemon extends Readable {
    constructor(transport?: 'udp', options?: DaemonOptions);
    listen(): Promise<void> | void;
}

export = MetricsDaemon;
