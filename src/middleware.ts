import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (pathname.includes('/proxy/')) {
        const url = pathname.replace('/proxy/', '');

        const res = await fetch(url.replace('://', '://'));
        const body = await res.body;  // Get the response body as a stream

        const response = new NextResponse(body);

        const contentType = res.headers.get('content-type');

        if (contentType?.includes('vnd.apple.mpegurl') || contentType?.includes('x-mpegURL')) {
            response.headers.set('content-type', 'application/vnd.apple.mpegurl');
        } else if (contentType?.includes('MP2T')) {
            res.headers.forEach((value, key) => {
                if (value !== null) {
                    response.headers.set(key, value);
                }
            });
        } else {
            response.headers.set('content-type', contentType ?? 'application/octet-stream');
        }

        // Set CORS headers
        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Headers', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET,POST,HEAD');
        response.headers.set('Access-Control-Max-Age', '86400');

        // Include additional headers from the direct response
        const contentLength = res.headers.get('Content-Length');
        if (contentLength) {
            response.headers.set('Content-Length', contentLength);
        }
        const etag = res.headers.get('Etag');
        if (etag) {
            response.headers.set('Etag', etag);
        }
        const lastModified = res.headers.get('Last-Modified');
        if (lastModified) {
            response.headers.set('Last-Modified', lastModified);
        }

        // Ensure Transfer-Encoding is handled correctly
        const transferEncoding = res.headers.get('Transfer-Encoding');
        if (transferEncoding) {
            response.headers.set('Transfer-Encoding', transferEncoding);
        }

        return response;
    }

    return NextResponse.next();
}
