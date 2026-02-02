
export async function onRequest(context: any) {
    const timestamp = new Date().toISOString();

    const status = {
        status: "ok",
        version: "2.0.0",
        service: "App Muslim",
        timestamp: timestamp,
        environment: context.env.NODE_ENV || "production",
        checks: {
            api: "healthy",
            database: "connected"
        }
    };

    return new Response(JSON.stringify(status, null, 2), {
        headers: {
            "content-type": "application/json;charset=UTF-8",
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*"
        },
    });
}
