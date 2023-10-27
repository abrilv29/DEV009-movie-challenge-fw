export interface Video {
    id:      number;
    results: VideoResult[];
}

export interface VideoResult {
    type:         string;
    name:         string;
    key:          string;
    site:         Site;
    size:         number;
    id:           string;
}

export enum Site {
    YouTube = "YouTube",
}

