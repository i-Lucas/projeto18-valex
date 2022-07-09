import db from "../config/db.js";

export interface Company {

	id: number;
	name: string;
	apiKey?: string;
}

export async function findById(companyId: number) {

	const company = await db.query(`SELECT * FROM companies WHERE id = ${companyId}`);
	return company[0];
}

export async function findByApiKey(apiKey: string) {
	const result = await db.query<Company, [string]>(`SELECT * FROM companies WHERE "apiKey"=$1`, [apiKey]);
	return result.rows[0];
}

export async function findCompanyCards(companyId: number) {

	const query = `
		select cards.id as "cardId", companies.id as companyId
		from cards 
		join employees on cards."employeeId" = employees.id
		join companies on employees."companyId" = companies.id
		where companies.id = $1
	`;
	const result = await db.query<{ cardId: number, companyId: number }, [number]>(query, [companyId]);
	return result.rows;
};