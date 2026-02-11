export const EASTER_EGG_COOKIE = 'ag_hello_unlocked';

function getCookieString() {
	if (typeof document === 'undefined') return '';
	return document.cookie || '';
}

export function setSessionUnlockCookie() {
	if (typeof document === 'undefined') return;
	document.cookie = `${EASTER_EGG_COOKIE}=1; path=/; SameSite=Lax`;
}

export function clearSessionUnlockCookie() {
	if (typeof document === 'undefined') return;
	document.cookie = `${EASTER_EGG_COOKIE}=; path=/; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function hasSessionUnlockCookie() {
	return getCookieString()
		.split(';')
		.map((cookie) => cookie.trim())
		.some((cookie) => cookie.startsWith(`${EASTER_EGG_COOKIE}=`));
}
