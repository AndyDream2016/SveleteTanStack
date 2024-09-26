import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function twclsx(...inputs) {
	return twMerge(clsx(...inputs));
}

export function prefix(value, prefix, delimiter = '-') {
	return `${prefix}${delimiter}${value}`;
}

export function postfix(value, postfix, delimiter = '-') {
	return `${value}${delimiter}${postfix}`;
}
