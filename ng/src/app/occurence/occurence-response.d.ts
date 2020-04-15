import { Occurence } from './occurence';

export interface OccurenceResponse {
    offset: number;
    limit: number;
    endOfRecords: boolean;
    count: number;
    results: Occurence[];
}

