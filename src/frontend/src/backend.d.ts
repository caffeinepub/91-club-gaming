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
    inviteCode: string;
    registrationLink: string;
}
export interface backendInterface {
    getConfig(): Promise<SiteConfig>;
    incrementVisitorCount(): Promise<bigint>;
}
