export const setCookie = (token: string) => {
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));   // expire cookie after a week
    const expires = "expires=" + date.toUTCString();
    document.cookie = `token=${token};${expires};path=/`;
}

export const getCookie = (key: string): string | undefined => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${key}=`)) {
            return cookie.substring(key.length + 1);
        }
    }
    return undefined;
}