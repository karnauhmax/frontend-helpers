interface ICssCategory {
 id: number,
 title: string,
 propertiesNames: string[],
 cssProperties: ICssProperty[],
}

interface ICssProperty {
 id: number,
 title: string,
 value: string,
 items: ICssPropertyItem[];
}

interface ICssPropertyItem {
 id: number,
 title: string,
 value: string,
}

export type { ICssCategory, ICssProperty, ICssPropertyItem };