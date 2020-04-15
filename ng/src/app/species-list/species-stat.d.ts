import { Occurence } from '../occurence/occurence';

export interface SpeciesStat {
    danishName: string;
    numberOfSites: number;
    totalOfIndividuals: number;
    records: Occurence[];
}

