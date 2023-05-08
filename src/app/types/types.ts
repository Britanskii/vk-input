export type ValueOf<T>  = T[keyof T]

export type TypeKeys<T, R> = {
	[K in keyof T]: T[K] extends R ? K : never
}[keyof T]
