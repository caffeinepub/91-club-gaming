import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SiteConfig {
    baseUrl: string;
    inviteCode: string;
    registrationLink: string;
}
export interface backendInterface {
    getConfig(): Promise<SiteConfig>;
    getVisitorCount(): Promise<bigint>;
    incrementVisitorCount(): Promise<void>;
    setConfig(baseUrl: string, inviteCode: string, registrationLink: string): Promise<void>;
}
