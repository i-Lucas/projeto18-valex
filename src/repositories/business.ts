import db from "../config/db.js";
import { TransactionTypes } from "./card.js";

export interface Business {

	id: number;
	name: string;
	type: TransactionTypes;
}

export async function findById(id: number) {

	const result = await db.query<Business, [number]>("SELECT * FROM businesses WHERE id=$1", [id]);
	return result.rows[0];
}