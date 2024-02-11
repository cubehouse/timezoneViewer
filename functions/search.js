// make a geocode request

// https://geocode.maps.co/search?q=${textSearch}&api_key=${apiKey}

// get from Workers env MAPS_CO_APIKEY
async function geocode(textSearch, apiKey) {
    const url = `https://geocode.maps.co/search?q=${textSearch}&api_key=${apiKey}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await res.json();
}

async function search(context) {
    // found fetchtimer, use it to delay/limit requests
    // we can only make one request every 1100ms, so delay if necessary
    if (context.env.FETCHTIMER) {
        let lastFetch = await context.env.FETCHTIMER.get('lastFetch');
        if (!lastFetch) {
            lastFetch = 0;
        }
        const now = new Date().getTime();
        const lastFetchTimeAgoMs = now - lastFetch;
        if (lastFetchTimeAgoMs < 1100) {
            // delay the request
            const delay = 1100 - lastFetchTimeAgoMs;
            await new Promise((resolve) => setTimeout(resolve, delay));

            return search(context);
        }
    }

    const apiKey = context.env.MAPS_CO_APIKEY;
    if (!apiKey) {
        return new Response("API key not provided", { status: 500 });
    }

    const { searchParams } = new URL(context.request.url);
    const textSearch = searchParams.get('textSearch');
    if (!textSearch) {
        return new Response("No search term provided", { status: 400 });
    }

    const data = await geocode(textSearch, apiKey);
    // store the last fetch time
    if (context.env.FETCHTIMER) {
        await context.env.FETCHTIMER.put('lastFetch', new Date().getTime());
    }
    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json',
        },
    });
}

export const onRequest = async (context) => {
    return search(context);
}
