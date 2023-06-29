import { IDescription, ITitle } from "../reference"

export interface IPoint{
    coords:Array<number>,
    adress:string,
    title:ITitle,
    description:IDescription,
}