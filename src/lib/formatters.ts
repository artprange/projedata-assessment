export function formatBRL(value: number): string {
	return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function toNumber(value: string): number {
	const n = Number(value);
	return Number.isNaN(n) ? 0 : n;
}
