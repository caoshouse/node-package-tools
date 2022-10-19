export declare function getAllIds(): string[];
export declare function getLicenses(): ({
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre?: undefined;
} | {
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre: boolean;
})[];
export declare function getApprovedLicenses(): ({
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre?: undefined;
} | {
    reference: string;
    isDeprecatedLicenseId: boolean;
    detailsUrl: string;
    referenceNumber: number;
    name: string;
    licenseId: string;
    seeAlso: string[];
    isOsiApproved: boolean;
    isFsfLibre: boolean;
})[];
