/// <reference types="node" />
import { IncomingHttpHeaders } from 'http';
import https from 'https';
interface Response {
    statusCode: number;
    headers: IncomingHttpHeaders;
    body: string;
}
declare const _default: (urlOptions: string | https.RequestOptions, data?: string) => Promise<Response>;
export default _default;
