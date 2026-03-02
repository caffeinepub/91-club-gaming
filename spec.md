# 91 Club Gaming

## Current State
The project exists but the deployed site is not loading ("site cannot be reached" in Chrome). The app needs to be rebuilt cleanly and redeployed.

## Requested Changes (Diff)

### Add
- Hero section with animated background, headline, and "Register Now" CTA button linking to https://www.aajclub.com/#/register?invitationCode=13814651728
- Invite code display section showing "13814651728" with a copy-to-clipboard button
- Features section highlighting the platform benefits
- How-to-join steps section
- Testimonials section
- CTA banner
- Visitor counter in footer

### Modify
- N/A (clean rebuild)

### Remove
- N/A

## Implementation Plan
1. Generate Motoko backend with a simple visitor counter canister
2. Build React frontend with all sections listed above
3. Wire the visitor counter to the backend
4. Deploy the app
