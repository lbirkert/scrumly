export function actionsToObject(json: any) {
    const data = JSON.parse(json.data);

    const _parse = (i: number) => {
        const v = data[i];
        if(v && typeof v === "object") {
            if(Array.isArray(v)) {
                return window[v[0] as keyof typeof window](v[1]);
            }

            const j: Record<any, any> = {};
            for(let k of Object.entries(v)) {
                j[k[0]] = _parse(k[1] as number);
            }
            return j;
        } else return v;
    };

    return _parse(0);
}
