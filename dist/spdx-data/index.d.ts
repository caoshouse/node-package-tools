declare let data: {
    licenses: any[];
    releaseDate: string;
    licenseListVersion: string;
};
export declare function getAllIds(): any[];
export declare function getLicenses(): any[];
export declare function getApprovedLicenses(): any[];
export declare function getFreeLicenses(): any[];
export declare function getReleaseDate(): string;
export declare function getVersion(): string;
export declare function update(): Promise<typeof data>;
export {};
