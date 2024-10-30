export function load({ locals }) {
    return {
        isAuthenticated: !!locals.session?.data?.accessToken
    };
}
